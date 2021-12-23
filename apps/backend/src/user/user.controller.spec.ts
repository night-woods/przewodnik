/*
// TODO implement controller tests
import {
  BadRequestException,
  INestApplication,
  NotFoundException,
} from '@nestjs/common'
import request from 'supertest'
import {
  createTestingModule,
  TestingModuleUtil,
} from '../test-utils/create-testing-module'

let app: INestApplication
let userService: TestingModuleUtil<'userService'>
let prismaService: TestingModuleUtil<'prismaService'>
let authService: TestingModuleUtil<'authService'>

beforeAll(async () => {
  ;({ app, userService, prismaService, authService } =
    await createTestingModule())
  await app.init()
})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('POST /users/login', () => {
  it('returns 201', async () => {
    prismaService.user.findUnique.mockResolvedValue({ id: 1, password: 'pass' })
    authService.validateUser.mockResolvedValue({ id: 1 })

    await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'email@email.com', password: 'passW0rd!' })
      .expect(201)
  })

  it('returns 401 if validation fails', async () => {
    prismaService.user.findUnique.mockResolvedValue({ id: 1, password: 'pass' })
    authService.validateUser.mockResolvedValue(null)

    await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'email@email.com', password: 'passW0rd!' })
      .expect(401)
  })

  it('returns 400 if payload is not valid', async () => {
    prismaService.user.findUnique.mockResolvedValue({ id: 1, password: 'pass' })
    authService.validateUser.mockResolvedValue({ id: 1 })

    await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'email', password: 'passW0rd!' })
      .expect(400)
  })
})

describe('GET /users', () => {
  const users = { data: [{ email: 'xyz@email.com', id: 1 }] }

  it('returns 200', async () => {
    userService.findAll.mockResolvedValueOnce(users)

    await request(app.getHttpServer()).get('/users').expect(200)
  })

  it('returns users from UserService', async () => {
    userService.findAll.mockResolvedValueOnce(users)

    const response = await request(app.getHttpServer()).get('/users')

    expect(response.body).toEqual(users)
  })

  it('calls UserService', async () => {
    userService.findAll.mockResolvedValueOnce(users)

    await request(app.getHttpServer()).get('/users')

    expect(userService.findAll).toHaveBeenCalledTimes(1)
  })
})

describe('GET /users/me', () => {
  const user = { data: { email: 'email@email.com', id: 1 } }

  it('returns 200', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer()).get('/users/me').expect(200)
  })

  it('returns user from UserService', async () => {
    userService.findById.mockResolvedValueOnce(user)

    const response = await request(app.getHttpServer()).get('/users/me')

    expect(response.body).toEqual(user)
  })

  it('calls UserService', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer()).get('/users/me')

    expect(userService.findById).toHaveBeenCalledTimes(1)
    expect(userService.findById).toHaveBeenCalledWith(1)
  })

  it('returns 404 if user not found', async () => {
    userService.findById.mockRejectedValueOnce(new NotFoundException())

    await request(app.getHttpServer()).get('/users/me').expect(404)
  })
})

describe('GET /users/:id', () => {
  const user = { data: { email: 'email@email.com', id: 1 } }

  it('returns 200', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer()).get('/users/1').expect(200)
  })

  it('returns user from UserService', async () => {
    userService.findById.mockResolvedValueOnce(user)

    const response = await request(app.getHttpServer()).get('/users/1')

    expect(response.body).toEqual(user)
  })

  it('calls UserService', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer()).get('/users/13')

    expect(userService.findById).toHaveBeenCalledTimes(1)
    expect(userService.findById).toHaveBeenCalledWith(13)
  })

  it('returns 404 if user not found', async () => {
    userService.findById.mockRejectedValueOnce(new NotFoundException())

    await request(app.getHttpServer()).get('/users/1').expect(404)
  })

  it('returns 400 if ID is not a number', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer()).get('/users/thirteen').expect(400)
  })
})

describe('DELETE /users/:id', () => {
  it('returns 200', async () => {
    await request(app.getHttpServer()).delete('/users/1').expect(200)
  })

  it('calls UserService', async () => {
    await request(app.getHttpServer()).delete('/users/1')

    expect(userService.deleteById).toHaveBeenCalledTimes(1)
    expect(userService.deleteById).toHaveBeenCalledWith(1)
  })

  it('returns 404 if user not found', async () => {
    userService.deleteById.mockRejectedValueOnce(new NotFoundException())

    await request(app.getHttpServer()).delete('/users/1').expect(404)
  })

  it('returns 400 if ID is not a number', async () => {
    await request(app.getHttpServer()).delete('/users/thirteen').expect(400)
  })
})

describe('POST /users', () => {
  const reqUser = {
    email: 'email@email.com',
    password: 'notencrypted',
    firstName: 'Firstname',
    lastName: 'Lastname',
  }
  const resUser = { data: { email: 'email@email.com', id: 1 } }

  it('returns 201', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer()).post('/users').send(reqUser).expect(201)
  })

  it('returns created user', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(reqUser)

    expect(response.body).toEqual(resUser)
  })

  it('calls UserService', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer()).post('/users').send(reqUser)

    expect(userService.create).toHaveBeenCalledTimes(1)
    expect(userService.create).toHaveBeenCalledWith(reqUser)
  })

  it('returns 400 if request body is not correct', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .post('/users')
      .send(undefined)
      .expect(400)

    await request(app.getHttpServer())
      .post('/users')
      .send({ ...reqUser, email: 'email.com' })
      .expect(400)
  })

  it('returns 400 if password is not correct', async () => {
    userService.create.mockRejectedValueOnce(new BadRequestException())

    await request(app.getHttpServer()).post('/users').send(reqUser).expect(400)
  })
})

describe('PATCH /users/:id', () => {
  const reqUser = { email: 'email@email.com' }
  const resUser = { data: { email: 'email@email.com', id: 1 } }

  it('returns 200', async () => {
    userService.updateById.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .send(reqUser)
      .expect(200)
  })

  it('returns updated user', async () => {
    userService.updateById.mockResolvedValueOnce(resUser)

    const response = await request(app.getHttpServer())
      .patch('/users/1')
      .send(reqUser)

    expect(response.body).toEqual(resUser)
  })

  it('calls UserService', async () => {
    userService.updateById.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer()).patch('/users/1').send(reqUser)

    expect(userService.updateById).toHaveBeenCalledTimes(1)
    expect(userService.updateById).toHaveBeenCalledWith(1, reqUser)
  })

  it('returns 404 if user not found', async () => {
    userService.updateById.mockRejectedValueOnce(new NotFoundException())

    await request(app.getHttpServer())
      .patch('/users/1')
      .send(reqUser)
      .expect(404)
  })

  it('returns 400 if ID is not a number', async () => {
    userService.updateById.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/thirteen')
      .send(reqUser)
      .expect(400)
  })

  it('returns 400 if request body is not correct', async () => {
    const badReqUser = { email: 'email.com' }
    userService.updateById.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .send(badReqUser)
      .expect(400)
  })
})

describe('POST /confirm-email', () => {
  const res = { data: { userId: 1, isVerified: true } }
  const token = 'VeryGoodToken'

  it('returns 200', async () => {
    userService.confirmEmail.mockResolvedValueOnce(res)

    await request(app.getHttpServer())
      .post(`/users/confirm-email?token=${token}`)
      .expect(200)
  })

  it('calls UserService', async () => {
    userService.confirmEmail.mockResolvedValueOnce(res)

    await request(app.getHttpServer()).post(
      `/users/confirm-email?token=${token}`,
    )

    expect(userService.confirmEmail).toHaveBeenCalledTimes(1)
    expect(userService.confirmEmail).toHaveBeenCalledWith(token)
  })

  it('returns 400 if token is invalid', async () => {
    const badToken = 'VeryBadToken'
    userService.confirmEmail.mockRejectedValueOnce(new BadRequestException())

    await request(app.getHttpServer())
      .post(`/users/confirm-email?token=${badToken}`)
      .expect(400)
  })
})

describe('POST /users/:id/reset-password', () => {
  const password = 'paSSword2@'
  const newPassword = 'PASS!word1'

  const res = {
    data: {
      id: 1,
    },
  }

  it('returns 200', async () => {
    userService.resetPassword.mockResolvedValueOnce(res)

    await request(app.getHttpServer())
      .post(`/users/1/reset-password`)
      .send({ password, newPassword })
      .expect(200)
  })

  it('calls UserService', async () => {
    userService.resetPassword.mockResolvedValueOnce(res)

    await request(app.getHttpServer())
      .post(`/users/1/reset-password`)
      .send({ password, newPassword })

    expect(userService.resetPassword).toHaveBeenCalledTimes(1)
    expect(userService.resetPassword).toHaveBeenCalledWith(1, {
      password,
      newPassword,
    })
  })

  it('returns 400 if new password is the same as the old one', async () => {
    userService.resetPassword.mockRejectedValueOnce(new BadRequestException())

    await request(app.getHttpServer())
      .post('/users/1/reset-password')
      .send({
        password,
        newPassword: password,
      })
      .expect(400)
  })

  it('returns 400 in case of invalid new password', async () => {
    userService.resetPassword.mockRejectedValueOnce(new BadRequestException())

    await request(app.getHttpServer())
      .post('/users/1/reset-password')
      .send({
        password,
        newPassword: 'No5pecialCh4racter',
      })
      .expect(400)
  })

  it('returns 404 if user is not found', async () => {
    userService.resetPassword.mockRejectedValueOnce(new NotFoundException())

    await request(app.getHttpServer())
      .post('/users/1/reset-password')
      .send({
        password,
        newPassword,
      })
      .expect(404)
  })

  it('returns 400 if incorrect password', async () => {
    userService.resetPassword.mockRejectedValueOnce(new BadRequestException())

    await request(app.getHttpServer())
      .post('/users/1/reset-password')
      .send({
        password: 'IncorrectPassword',
        newPassword,
      })
      .expect(400)
  })
})

describe('POST /request-password-reset', () => {
  const req = { email: 'email@email.com' }

  it('returns 200', async () => {
    await request(app.getHttpServer())
      .post('/users/request-password-reset')
      .send(req)
      .expect(200)
  })

  it('calls UserService', async () => {
    await request(app.getHttpServer())
      .post('/users/request-password-reset')
      .send(req)

    expect(userService.requestPasswordReset).toHaveBeenCalledTimes(1)
    expect(userService.requestPasswordReset).toHaveBeenCalledWith(req)
  })

  it('returns 400 if request body is not correct', async () => {
    await request(app.getHttpServer())
      .post('/users/request-password-reset')
      .send(undefined)
      .expect(400)
  })
})

describe('POST /reset-password', () => {
  const req = { token: 'token', password: 'notencrypted' }
  const res = { data: { id: 1, email: 'email@email.com' } }

  it('returns 200', async () => {
    userService.resetPasswordByToken.mockResolvedValueOnce(res)

    await request(app.getHttpServer())
      .post('/users/reset-password')
      .send(req)
      .expect(200)
  })

  it('returns updated user', async () => {
    userService.resetPasswordByToken.mockResolvedValueOnce(res)

    const response = await request(app.getHttpServer())
      .post('/users/reset-password')
      .send(req)

    expect(response.body).toEqual(res)
  })

  it('calls UserService', async () => {
    userService.resetPasswordByToken.mockResolvedValueOnce(res)

    await request(app.getHttpServer()).post('/users/reset-password').send(req)

    expect(userService.resetPasswordByToken).toHaveBeenCalledTimes(1)
    expect(userService.resetPasswordByToken).toHaveBeenCalledWith(req)
  })

  it('returns 400 if request body is not correct', async () => {
    userService.resetPasswordByToken.mockResolvedValueOnce(res)

    await request(app.getHttpServer())
      .post('/users/reset-password')
      .send(undefined)
      .expect(400)
  })
})


*/