import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { createTestingModule } from '../test-utils/create-testing-module'
import { UserService } from './user.service'
import { Role } from '@prisma/client'

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
  const locationAdminMock = {
    id: 4,
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@mail.com',
    password: 'password',
    role: Role.LOCATION_ADMIN,
    locationId: 1,
  }
  const users = [
    {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: 'test',
      role: Role.LOCATION_USER,
      locationId: 1,
    },
    {
      id: 2,
      firstName: 'test1',
      lastName: 'test1',
      email: 'test1@gmail.com',
      password: 'test1',
      role: Role.LOCATION_USER,
      locationId: 2,
    },
    {
      id: 3,
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@gmail.com',
      password: 'test2',
      role: Role.LOCATION_USER,
      locationId: 3,
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

  describe('findByEmail', () => {
    it('should call findByEmail method with valid args and return user', async () => {
      userRepository.findByEmail.mockResolvedValueOnce(users[0])

      const returnedUser = await sut.findByEmail(users[0].email)

      expect(userRepository.findByEmail).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledWith(users[0].email)
      expect(returnedUser).toEqual({ data: users[0] })
    })

    it('should throw error when user not found', async () => {
      userRepository.findByEmail.mockResolvedValueOnce(null)

      await expect(sut.findByEmail('some@mail.com')).rejects.toThrowError(
        new NotFoundException('User with given email not found'),
      )
      expect(userRepository.findByEmail).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledWith('some@mail.com')
    })
  })

  describe('findById', () => {
    it('should return user when they exist, user is location admin and locationIds are equal', async () => {
      userRepository.findById.mockResolvedValueOnce(users[0])
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      const returnedUser = await sut.findById(1, locationAdminMock)

      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
      expect(returnedUser).toEqual({ data: users[0] })
    })

    it('should throw error when user not found', async () => {
      userRepository.findById.mockResolvedValueOnce(null)
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(sut.findById(404, locationAdminMock)).rejects.toThrowError(
        new NotFoundException('User with given ID not found'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })

    it('should throw error when logged user role location differ from found user location', async () => {
      userRepository.findById.mockResolvedValueOnce(users[1])
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(sut.findById(2, locationAdminMock)).rejects.toThrowError(
        new ForbiddenException('User with given ID is not in your location!'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })
  })

  describe('create', () => {
    const userToCreate = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: 'test',
      role: Role.LOCATION_USER,
      locationId: 1,
    }
    it('should throw error if logged user is creating not location user', async () => {
      await expect(
        sut.create(
          { ...userToCreate, role: Role.LOCATION_ADMIN },
          locationAdminMock,
        ),
      ).rejects.toThrowError(
        new ForbiddenException('You cannot create other admins'),
      )
    })

    it('should override locationId value if logged user is location admin', async () => {
      userRepository.create.mockResolvedValueOnce(undefined)
      await sut.create({ ...userToCreate, locationId: 515 }, locationAdminMock)

      expect(userRepository.create).toBeCalledTimes(1)
      expect(userRepository.create.mock.calls[0][0].locationId).toEqual(
        locationAdminMock.locationId,
      )
    })

    it('should hash password and create user if valid args are provided', async () => {
      userRepository.create.mockResolvedValueOnce(userToCreate)
      const returnedUser = await sut.create(userToCreate, locationAdminMock)

      expect(userRepository.create).toBeCalledTimes(1)
      expect(
        userRepository.create.mock.calls[0][0].password !==
          userToCreate.password,
      ).toBeTruthy()
      expect(returnedUser).toEqual({ data: userToCreate })
    })
  })

  describe('update', () => {
    const updatedUser = {
      id: 1,
      name: 'updatedName',
      surname: 'updatedSurname',
      email: 'updated@email.com',
      password: 'updatedPassword',
    }
    it('should throw error when logged user is location admin and updates other admins', async () => {
      userRepository.findById.mockResolvedValueOnce({
        ...users[0],
        role: Role.ADMIN,
      })
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(
        sut.update(updatedUser, 1, locationAdminMock),
      ).rejects.toThrow(
        new ForbiddenException('You cannot update other admins'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })

    it('should throw error when logged user locationId differ from updated user locationId', async () => {
      userRepository.findById.mockResolvedValueOnce(users[1])
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(
        sut.update(updatedUser, 1, locationAdminMock),
      ).rejects.toThrow(
        new ForbiddenException('User with given ID is not in your location!'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })

    it('should return updated user when valid args', async () => {
      userRepository.findById.mockResolvedValueOnce(users[0])
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)
      userRepository.update.mockResolvedValueOnce(updatedUser)

      const returnedUser = await sut.update(updatedUser, 1, locationAdminMock)

      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
      expect(returnedUser).toEqual({ data: updatedUser })
    })

    it('should throw error when user not found', async () => {
      userRepository.findById.mockResolvedValueOnce(null)
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(
        sut.update(updatedUser, 1, locationAdminMock),
      ).rejects.toThrowError(
        new NotFoundException('User with given ID not found'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })
  })

  describe('delete', () => {
    it('should throw error when user not found', async () => {
      userRepository.findById.mockResolvedValueOnce(null)
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(sut.delete(1, locationAdminMock)).rejects.toThrowError(
        new NotFoundException('User with given ID not found'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })

    it('should throw error when logged user is trying to delete other admin', async () => {
      userRepository.findById.mockResolvedValueOnce({
        ...users[0],
        role: Role.ADMIN,
      })
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)

      await expect(sut.delete(1, locationAdminMock)).rejects.toThrow(
        new ForbiddenException('You cannot delete other admins'),
      )
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
    })

    it('should call delete method when args are valid', async () => {
      userRepository.findById.mockResolvedValueOnce(users[0])
      userRepository.findByEmail.mockResolvedValueOnce(locationAdminMock)
      userRepository.delete.mockResolvedValueOnce(undefined)

      await sut.delete(1, locationAdminMock)

      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
      expect(userRepository.delete).toBeCalledTimes(1)
      expect(userRepository.delete).toBeCalledWith(1)
    })
  })
})
