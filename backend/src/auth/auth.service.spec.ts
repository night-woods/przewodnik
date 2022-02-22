import { createTestingModule } from '../test-utils/create-testing-module'
import { AuthService } from './auth.service'
import { hash } from 'bcrypt'

let userService
let jwtService
let sut

beforeAll(async () => {
  ;({ userService, jwtService } = await createTestingModule())

  sut = new AuthService(userService as any, jwtService as any)
})

describe('AuthService', () => {
  const user = {
    id: 1,
    name: 'test',
    surname: 'test',
    email: 'test@mail.com',
  }

  const login = {
    email: 'test@mail.com',
    password: 'test',
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('validateUser', () => {
    it('should call findByEmail once', async () => {
      userService.findByEmail.mockResolvedValueOnce({
        data: {
          ...user,
          password: 'test',
        },
      })

      await sut.validateUser(login.email, login.password)

      expect(userService.findByEmail).toBeCalledTimes(1)
      expect(userService.findByEmail).toBeCalledWith(login.email)
    })

    it('should return user when founded', async () => {
      const hashedPass = await hash(login.password, 10)
      userService.findByEmail.mockResolvedValueOnce({
        data: {
          ...user,
          password: hashedPass,
        },
      })

      const result = await sut.validateUser(login.email, login.password)

      expect(result).toEqual(user)
    })

    it('should return null when user not found', async () => {
      userService.findByEmail.mockResolvedValueOnce(null)

      const result = await sut.validateUser(login.email, login.password)

      expect(userService.findByEmail).toBeCalledTimes(1)
      expect(result).toBeNull()
    })

    it('should return null when wrong password provided', async () => {
      const hashedPass = await hash(login.password, 10)

      userService.findByEmail.mockResolvedValueOnce({
        data: {
          ...user,
          password: hashedPass,
        },
      })

      const result = await sut.validateUser(login.email, 'test1')

      expect(userService.findByEmail).toBeCalledTimes(1)
      expect(result).toBeNull()
    })
  })

  describe('login', () => {
    it('should call sign()', async () => {
      jwtService.sign.mockResolvedValueOnce('token')

      await sut.login(user)

      expect(jwtService.sign).toBeCalledTimes(1)
    })

    it('should return token', async () => {
      jwtService.sign.mockResolvedValueOnce('token')

      const payload = { email: user.email, sub: user.id }
      const result = await sut.login(user)

      expect(jwtService.sign).toBeCalledWith(payload)
      expect(result).toEqual({ access_token: 'token' })
    })
  })
})
