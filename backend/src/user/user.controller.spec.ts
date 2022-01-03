import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import {
  createTestingModule,
  TestingModuleUtil,
} from '../test-utils/create-testing-module'

let app: INestApplication
let userService: TestingModuleUtil<'userService'>

beforeAll(async () => {
  ;({ app, userService } = await createTestingModule())
  await app.init()
})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('GET /users', () => {
  const users = {
    data: [
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
    ],
  }

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

describe('GET /users/:id', () => {
  const user = {
    data: {
      id: 1,
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'test',
    },
  }

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

    expect(userService.delete).toHaveBeenCalledTimes(1)
    expect(userService.delete).toHaveBeenCalledWith(1)
  })

  it('returns 400 if ID is not a number', async () => {
    await request(app.getHttpServer()).delete('/users/thirteen').expect(400)
  })
})

describe('POST /users', () => {
  const reqUser = {
    name: 'test',
    surname: 'test',
    email: 'test@gmail.com',
    password: 'test',
  }
  const resUser = {
    data: {
      id: 1,
      name: 'test',
      surname: 'test',
      email: 'test@gmail.com',
      password: 'test',
    },
  }

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
})

describe('PATCH /users/:id', () => {
  const reqUser = { email: 'email@email.com' }
  const resUser = {
    data: {
      id: 1,
      name: 'test',
      surname: 'test',
      email: 'email@email.com',
      password: 'test',
    },
  }

  it('returns 200', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .send(reqUser)
      .expect(200)
  })

  it('returns updated user', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    const response = await request(app.getHttpServer())
      .patch('/users/1')
      .send(reqUser)

    expect(response.body).toEqual(resUser)
  })

  it('calls UserService', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer()).patch('/users/1').send(reqUser)

    expect(userService.update).toHaveBeenCalledTimes(1)
    expect(userService.update).toHaveBeenCalledWith(reqUser, 1)
  })

  it('returns 400 if ID is not a number', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/thirteen')
      .send(reqUser)
      .expect(400)
  })

  it('returns 400 if request body is not correct', async () => {
    const badReqUser = { email: 'email.com' }
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .send(badReqUser)
      .expect(400)
  })
})
