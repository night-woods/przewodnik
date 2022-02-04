import { INestApplication, NotFoundException } from '@nestjs/common'
import request from 'supertest'
import {createTestingModule, TestingModuleUtil, } from '../test-utils/create-testing-module'

let app: INestApplication
let locationService: TestingModuleUtil<'locationService'>

beforeAll(async () => {
  ;({ app, locationService } = await createTestingModule())
  await app.init()
})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('GET /locations', () => {
    const locations = {
        data: [
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
    }

  it('returns 200', async () => {
    locationService.findAll.mockResolvedValueOnce(locations)

    await request(app.getHttpServer()).get('/locations').expect(200)
  })

  it('returns locations from locationService', async () => {
    locationService.findAll.mockResolvedValueOnce(locations)

    const response = await request(app.getHttpServer()).get('/locations')

    expect(response.body).toEqual(locations)
  })

  it('calls locationService', async () => {
    locationService.findAll.mockResolvedValueOnce(locations)

    await request(app.getHttpServer()).get('/locations')

    expect(locationService.findAll).toHaveBeenCalledTimes(1)
  })
})

describe('GET /locations/:id', () => {
  
    const location = {
        data: {
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
        }
    }

  it('returns 200', async () => {
    locationService.findOne.mockResolvedValueOnce(location)

    await request(app.getHttpServer()).get('/locations/1').expect(200)
  })

  it('returns location from locationService', async () => {
    locationService.findOne.mockResolvedValueOnce(location)

    const response = await request(app.getHttpServer()).get('/locations/1')

    expect(response.body).toEqual(location)
  })

  it('calls locationService', async () => {
    locationService.findOne.mockResolvedValueOnce(location)

    await request(app.getHttpServer()).get('/locations/13')

    expect(locationService.findOne).toHaveBeenCalledTimes(1)
    expect(locationService.findOne).toHaveBeenCalledWith(13)
  })

  it('returns 400 if ID is not a number', async () => {
    locationService.findOne.mockResolvedValueOnce(location)

    await request(app.getHttpServer()).get('/locations/thirteen').expect(400)
  })
})

describe('DELETE /locations/:id', () => {
  it('returns 200', async () => {
    await request(app.getHttpServer()).delete('/locations/1').expect(200)
  })

  it('calls locationService', async () => {
    await request(app.getHttpServer()).delete('/locations/1')

    expect(locationService.delete).toHaveBeenCalledTimes(1)
    expect(locationService.delete).toHaveBeenCalledWith(1)
  })

  it('returns 400 if ID is not a number', async () => {
    await request(app.getHttpServer()).delete('/locations/thirteen').expect(400)
  })
})

describe('POST /locations', () => {
  const reqlocation = {
        name: "Some location",
        street: "Some street",
        buildingNumber: 21,
        flatNumber: 37,
        postcode: '21-371',
        city: "Warsaw",
        isActive: true,
        longitude: '50',
        latitude: '68'
  }
  const reslocation = {
    data: {
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
  }

  it('returns 201', async () => {
    locationService.create.mockResolvedValueOnce(reslocation)

    await request(app.getHttpServer()).post('/locations').send(reqlocation).expect(201)
  })

  it('returns created location', async () => {
    locationService.create.mockResolvedValueOnce(reslocation)

    const response = await request(app.getHttpServer())
      .post('/locations')
      .send(reqlocation)

    expect(response.body).toEqual(reslocation)
  })

  it('calls locationService', async () => {
    locationService.create.mockResolvedValueOnce(reslocation)

    await request(app.getHttpServer()).post('/locations').send(reqlocation)

    expect(locationService.create).toHaveBeenCalledTimes(1)
    expect(locationService.create).toHaveBeenCalledWith(reqlocation)
  })

  
})

describe('PATCH /locations/:id', () => {
  const reqlocation = { name: 'some location 2' }
  const reslocation = {
    data: {
        id: 1,
        name: "some location 2",
        street: "Some street",
        buildingNumber: 21,
        flatNumber: 37,
        postcode: '21-371',
        city: "Warsaw",
        isActive: true,
        longitude: '50',
        latitude: '68'
    },
  }

  it('returns 200', async () => {
    locationService.update.mockResolvedValueOnce(reslocation)

    await request(app.getHttpServer())
      .patch('/locations/1')
      .send(reqlocation)
      .expect(200)
  })

  it('returns updated location', async () => {
    locationService.update.mockResolvedValueOnce(reslocation)

    const response = await request(app.getHttpServer())
      .patch('/locations/1')
      .send(reqlocation)

    expect(response.body).toEqual(reslocation)
  })

  it('calls locationService', async () => {
    locationService.update.mockResolvedValueOnce(reslocation)

    await request(app.getHttpServer()).patch('/locations/1').send(reqlocation)

    expect(locationService.update).toHaveBeenCalledTimes(1)
    expect(locationService.update).toHaveBeenCalledWith(reqlocation, 1)
  })

  it('returns 400 if ID is not a number', async () => {
    locationService.update.mockResolvedValueOnce(reslocation)

    await request(app.getHttpServer())
      .patch('/locations/thirteen')
      .send(reqlocation)
      .expect(400)
  })

  
})
