import { NotFoundException } from '@nestjs/common'
import { createTestingModule } from '../test-utils/create-testing-module'
import { UserService } from './user.service'

let userRepository
let sut: UserService

beforeAll(async () => {
  ;({ userRepository } = await createTestingModule())
  sut = new UserService(userRepository as any)
})
describe('UserService', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
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

  describe('findAll', () => {
    it('should return users', async () => {
      userRepository.findAll.mockResolvedValueOnce(users)
      const returnedUsers = await sut.findAll()

      expect(returnedUsers).toEqual({ data: users })
    })

    it('should call findAll once', async () => {
      userRepository.findAll.mockResolvedValueOnce(users)
      await sut.findAll()

      expect(userRepository.findAll).toBeCalledTimes(1)
    })
  })

  describe('findOne', () => {
    it('should return user when they exist', async () => {
      userRepository.findOne.mockResolvedValueOnce(users[0])

      const returnedUser = await sut.findOne(1)

      expect(returnedUser).toEqual({ data: users[0] })
    })

    it('should throw an error when user not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(null)

      await expect(sut.findOne(1)).rejects.toThrow(NotFoundException)
    })

    it('should call findOne once', async () => {
      userRepository.findOne.mockResolvedValueOnce(users[0])

      await sut.findOne(1)

      expect(userRepository.findOne).toBeCalledTimes(1)
    })
  })

  describe('update', () => {
    const updatedUser = {
      id: 1,
      name: 'updatedName',
      surname: 'updatedSurname',
      email: 'updated@email.com',
      password: users[0].password,
    }

    it('should update user', async () => {
      userRepository.findOne.mockResolvedValueOnce(updatedUser)
      userRepository.update.mockResolvedValueOnce(updatedUser)

      await sut.update(
        {
          name: 'updatedName',
          surname: 'updatedSurname',
          email: 'updated@email.com',
          password: users[0].password,
        },
        1,
      )

      expect(userRepository.update).toHaveBeenCalledTimes(1)
      expect(userRepository.update).toHaveBeenCalledWith(
        {
          name: 'updatedName',
          surname: 'updatedSurname',
          email: 'updated@email.com',
          password: users[0].password,
        },
        1,
      )
    })

    it('should return updated user', async () => {
      userRepository.findOne.mockResolvedValueOnce(updatedUser)
      userRepository.update.mockResolvedValueOnce(updatedUser)

      const returnedUser = await sut.update(
        {
          name: 'updatedName',
          surname: 'updatedSurname',
          email: 'updated@email.com',
          password: users[0].password,
        },
        1,
      )

      expect(returnedUser).toEqual({ data: updatedUser })
    })

    it('should throw an error when no user found', async () => {
      userRepository.findOne.mockResolvedValueOnce(null)

      await expect(
        sut.update(
          {
            name: 'updatedName',
            surname: 'updatedSurname',
            email: 'updated@email.com',
            password: users[0].password,
          },
          1,
        ),
      ).rejects.toThrow(NotFoundException)

      expect(userRepository.update).toHaveBeenCalledTimes(0)
    })
  })

  describe('create', () => {
    const userToCreate = {
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'test',
    }
    it('should call create user', async () => {
      userRepository.create.mockResolvedValueOnce(users[0])

      await sut.create(userToCreate)

      expect(userRepository.create).toBeCalledTimes(1)
      expect(userRepository.create).toBeCalledWith(userToCreate)
    })

    it('should return created user', async () => {
      userRepository.create.mockResolvedValueOnce(users[0])

      const response = await sut.create(userToCreate)

      expect(response).toEqual({ data: users[0] })
    })
  })

  describe('delete', () => {
    it('should call delete user', async () => {
      userRepository.delete.mockResolvedValueOnce(null)
      userRepository.findOne.mockResolvedValueOnce(users[0])

      await sut.delete(1)

      expect(userRepository.delete).toBeCalledTimes(1)
      expect(userRepository.findOne).toBeCalledTimes(1)
    })
  })
})
