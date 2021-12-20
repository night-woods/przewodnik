import { NotFoundException } from '@nestjs/common'
import { Any } from 'typeorm'
import { UserService } from './user.service'

describe('UserService', () => {
  const userRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }
  const users = [
    {
      id: 1,
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'test',
    },
    {
      id: 2,
      name: 'test1',
      surname: 'test1',
      email: 'test1@gmail.com',
      password: 'test1',
    },
    {
      id: 3,
      name: 'test2',
      surname: 'test2',
      email: 'test2@gmail.com',
      password: 'test2',
    },
  ]
  /*eslint-disable*/
  const service = new UserService(userRepository as any)
  beforeEach(async () => {
    userRepository.findAll.mockReset()
    userRepository.findOne.mockReset()
    userRepository.update.mockReset()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return users', async () => {
      userRepository.findAll.mockReturnValue(users)
      const returnedUsers = await service.findAll()

      expect(returnedUsers).toBe(users)
    })

    it('should return empty array, when no users provided', async () => {
      userRepository.findAll.mockReturnValue([])
      const returnedUsers = await service.findAll()

      expect(returnedUsers.length).toBe(0)
    })

    it('should call findAll once', async () => {
      userRepository.findAll.mockReturnValue(Any)
      await service.findAll()

      expect(userRepository.findAll).toBeCalledTimes(1)
    })
  })

  describe('findOne', () => {
    it('should return user when he exists', async () => {
      userRepository.findOne.mockReturnValue(users[0])

      const returnedUser = await service.findOne({ id: 1 })

      expect(returnedUser.id).toStrictEqual(users[0].id)
    })

    it('should throw an error when user not found', async () => {
      userRepository.findOne.mockReturnValue(null)
      let returnValue
      try {
        returnValue = await service.findOne({ id: 1 })
      } catch (e) {
        expect(e).toStrictEqual(
          new NotFoundException('User with given ID not found'),
        )
      }
      expect(returnValue).toBeUndefined()
    })

    it('should call findOne once', async () => {
      userRepository.findOne.mockReturnValue(users[0])

      await service.findOne({ id: 1 })

      expect(userRepository.findOne).toBeCalledTimes(1)
    })
  })

  describe('update', () => {
    const spy = jest.spyOn(service, 'findOne')
    beforeEach(() => {
      spy.mockClear()
    })
    it('should find and update existing user', async () => {
      const updatedUser = {
        id: 1,
        name: 'updatedName',
        surname: 'updatedSurname',
        email: 'updated@email.com',
        password: users[0].password,
      }

      userRepository.findOne.mockReturnValue(updatedUser)
      userRepository.update.mockReturnValue(updatedUser)

      const returnedUser = await service.update(
        {
          name: 'updatedName',
          surname: 'updatedSurname',
          email: 'updated@email.com',
          password: users[0].password,
        },
        { id: 1 },
      )

      expect(returnedUser).toStrictEqual(updatedUser)
      expect(spy).toBeCalledTimes(1)
    })

    it('should throw an error when no user found and call findOne', async () => {
      const spy = jest.spyOn(service, 'findOne')
      spy.mockClear()
      const updatedUser = {
        name: 'updatedName',
        surname: 'updatedSurname',
        email: 'updated@email.com',
        password: users[0].password,
      }
      let returnValue
      userRepository.findOne.mockReturnValue(null)

      try {
        returnValue = await service.update(updatedUser, { id: 2 })
      } catch (e) {
        expect(e).toStrictEqual(
          new NotFoundException('User with given ID not found'),
        )
      }
      expect(spy).toHaveBeenCalledTimes(1)
      expect(userRepository.update).toHaveBeenCalledTimes(0)
      expect(returnValue).toBeUndefined()
    })
  })
})
