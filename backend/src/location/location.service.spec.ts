import { LocationService } from './location.service'
import { NotFoundException } from '@nestjs/common'
import { createTestingModule } from '../test-utils/create-testing-module'

let locationRepository
let sut: LocationService

beforeAll(async () => {

    ;({ locationRepository }  = await createTestingModule())
    sut = new LocationService(locationRepository as any)
})

describe('LocationSerivce', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    const locations = [
    {
        id: 1,
        name: "Some location",
        street: "Some street",
        buildingNumber: 21,
        flatNumber: 37,
        postcode: '21-371',
        city: "Warsaw",
        isActive: true,
        longitude: '50',
        latitude: '68'
    },

    {
        id: 2,
        name: "Some location 2",
        street: "Some street 2",
        buildingNumber: 14,
        flatNumber: 47,
        postcode: '21-371',
        city: "Warsaw",
        isActive: true,
        longitude: '52',
        latitude: '65'
    },

    {
        id: 3,
        name: "Some location 3",
        street: "Some street 3",
        buildingNumber: 16,
        flatNumber: 46,
        postcode: '21-121',
        city: "Warsaw",
        isActive: false,
        longitude: '12',
        latitude: '115'
    }
    ]
    describe('findAll', () => {
        it('should return locations', async () => {
            locationRepository.findAll.mockResolvedValueOnce(locations)
          const returnedLocations = await sut.findAll()
    
          expect(returnedLocations).toEqual({ data: locations })
        })
    
        it('should call findAll once', async () => {
            locationRepository.findAll.mockResolvedValueOnce(locations)
          await sut.findAll()
    
          expect(locationRepository.findAll).toBeCalledTimes(1)
        })
      })
    
    describe('findOne', () => {
        it('should return location when it exists', async () => {
            locationRepository.findOne.mockResolvedValueOnce(locations[0])
    
          const returnedLocation = await sut.findOne(1)
    
          expect(returnedLocation).toEqual({ data: locations[0] })
        })
    
        it('should throw an error when location not found', async () => {
            locationRepository.findOne.mockResolvedValueOnce(null)
    
          await expect(sut.findOne(1)).rejects.toThrow(NotFoundException)
        })
        it('should call findOne once', async () => {
            locationRepository.findOne.mockResolvedValueOnce(locations[0])
      
            await sut.findOne(1)
      
            expect(locationRepository.findOne).toBeCalledTimes(1)
          })
    })
    describe('update', () => {
        const updatedLocation = {
          id: 1,
          name: 'updatedName',
          street: 'updatedStreet',
          city: 'updatedCity'
        }
    
        it('should update location', async () => {
            locationRepository.findOne.mockResolvedValueOnce(updatedLocation)
            locationRepository.update.mockResolvedValueOnce(updatedLocation)
    
          await sut.update(
            {
                name: 'updatedName',
                street: 'updatedStreet',
                city: 'updatedCity'
            },
            1,
          )
    
          expect(locationRepository.update).toHaveBeenCalledTimes(1)
          expect(locationRepository.update).toHaveBeenCalledWith(
            {
                name: 'updatedName',
                street: 'updatedStreet',
                city: 'updatedCity'
            },
            1,
          )
        })
    

        it('should return updated location', async () => {
            locationRepository.findOne.mockResolvedValueOnce(updatedLocation)
            locationRepository.update.mockResolvedValueOnce(updatedLocation)
    
            const returnedLocation = await sut.update(
            {
                name: 'updatedName',
                street: 'updatedStreet',
                city: 'updatedCity'
            },
            1
            )
    
            expect(returnedLocation).toEqual({ data: updatedLocation })
        })
  
        it('should throw an error when no lo.cation found', async () => {
            locationRepository.findOne.mockResolvedValueOnce(null)
  
            await expect(
            sut.update(
            {
                name: 'updatedName',
                street: 'updatedStreet',
                city: 'updatedCity'
            },
            1
          ),
        ).rejects.toThrow(NotFoundException)
  
        expect(locationRepository.update).toHaveBeenCalledTimes(0)
      })
    })
    describe('create', () => {
        const locationToCreate = {
          name: 'test',
          street: "test",
          buildingNumber: 1,
          flatNumber: 1,
          postcode: "test",
          city: "test",
          isActive: true,
          longitude: "test",
          latitude: "test"
        }
        it('should call create user', async () => {
            locationRepository.create.mockResolvedValueOnce(locations[0])
    
          await sut.create(locationToCreate)
    
          expect(locationRepository.create).toBeCalledTimes(1)
          expect(locationRepository.create).toBeCalledWith(locationToCreate)
        })
    
        it('should return created user', async () => {
            locationRepository.create.mockResolvedValueOnce(locations[0])
    
          const response = await sut.create(locationToCreate)
    
          expect(response).toEqual({ data: locations[0] })
        })
      })
    
      describe('delete', () => {
        it('should call delete user', async () => {
            locationRepository.delete.mockResolvedValueOnce(null)
            locationRepository.findOne.mockResolvedValueOnce(locations[0])
    
          await sut.delete(1)
    
          expect(locationRepository.delete).toBeCalledTimes(1)
          expect(locationRepository.findOne).toBeCalledTimes(1)
        })
      })
})