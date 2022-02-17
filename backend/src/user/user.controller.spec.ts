import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import {
  createTestingModule,
  TestingModuleUtil,
} from '../test-utils/create-testing-module'

let app: INestApplication
let userService: TestingModuleUtil<'userService'>
const authUser = {
  id: '1',
  email: 'test@mail.com',
  role: 'ADMIN',
}
const userTokens = {
  locationAdmin: 'location_admin',
  locationUser: 'location_user',
  admin: 'admin',
}

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
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: 'test',
        role: 'LOCATION_USER',
      },
      {
        id: 2,
        firstName: 'test1',
        lastName: 'test1',
        email: 'test1@gmail.com',
        password: 'test1',
        role: 'LOCATION_USER',
      },
      {
        id: 3,
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
        password: 'test2',
        role: 'LOCATION_USER',
      },
    ],
  }

  it('returns 200', async () => {
    userService.findAll.mockResolvedValueOnce(users)

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.admin)
      .expect(200)
  })

  it('returns users from UserService', async () => {
    userService.findAll.mockResolvedValueOnce(users)

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.admin)

    expect(response.body).toEqual(users)
  })

  it('calls UserService', async () => {
    userService.findAll.mockResolvedValueOnce(users)

    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.admin)

    expect(userService.findAll).toHaveBeenCalledTimes(1)
  })

  it('should throw error when location user is logged', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.locationUser)
      .expect(403)
  })

  it('should throw error when location admin is logged', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.locationAdmin)
      .expect(403)
  })
})

describe('GET /users/:id', () => {
  const user = {
    id: 1,
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    password: 'test',
  }

  it('returns 200', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer())
      .get('/users/1')
      .set('Authorization', userTokens.admin)
      .expect(200)
  })

  it('returns user from UserService', async () => {
    userService.findById.mockResolvedValueOnce(user)

    const response = await request(app.getHttpServer())
      .get('/users/1')
      .set('Authorization', userTokens.admin)
    expect(response.body).toEqual(user)
  })

  it('calls UserService', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer())
      .get('/users/13')
      .set('Authorization', userTokens.admin)

    expect(userService.findById).toHaveBeenCalledTimes(1)
    expect(userService.findById).toHaveBeenCalledWith(13, authUser)
  })

  it('returns 400 if ID is not a number', async () => {
    userService.findById.mockResolvedValueOnce(user)

    await request(app.getHttpServer())
      .get('/users/thirteen')
      .set('Authorization', userTokens.admin)
      .expect(400)
  })

  it('should throw error when location user is logged', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.locationUser)
      .expect(403)
  })
})

describe('DELETE /users/:id', () => {
  it('returns 200', async () => {
    await request(app.getHttpServer())
      .delete('/users/1')
      .set('Authorization', userTokens.admin)
      .expect(200)
  })

  it('calls UserService', async () => {
    await request(app.getHttpServer())
      .delete('/users/1')
      .set('Authorization', userTokens.admin)

    expect(userService.delete).toHaveBeenCalledTimes(1)
    expect(userService.delete).toHaveBeenCalledWith(1, authUser)
  })

  it('returns 400 if ID is not a number', async () => {
    await request(app.getHttpServer())
      .delete('/users/thirteen')
      .set('Authorization', userTokens.admin)
      .expect(400)
  })

  it('should throw error when location user is logged', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.locationUser)
      .expect(403)
  })
})

describe('POST /users', () => {
  const reqUser = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    password: 'test',
    role: 'LOCATION_USER',
  }
  const resUser = {
    data: {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: 'test',
      role: 'LOCATION_USER',
    },
  }

  it('returns 201', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', userTokens.admin)
      .send(reqUser)
      .expect(201)
  })

  it('returns created user', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', userTokens.admin)
      .send(reqUser)

    expect(response.body).toEqual(resUser)
  })

  it('calls UserService', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', userTokens.admin)
      .send(reqUser)

    expect(userService.create).toHaveBeenCalledTimes(1)
    expect(userService.create).toHaveBeenCalledWith(reqUser, authUser)
  })

  it('returns 400 if request body is not correct', async () => {
    userService.create.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', userTokens.admin)
      .send(undefined)
      .expect(400)

    await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', userTokens.admin)
      .send({ ...reqUser, email: 'email.com' })
      .expect(400)
  })

  it('should throw error when location user is logged', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.locationUser)
      .expect(403)
  })
})

describe('PATCH /users/:id', () => {
  const resUser = {
    data: {
      id: 1,
      firstName: 'test',
      lastName: 'test',
      email: 'email@email.com',
      password: 'test',
    },
  }

  it('returns 200', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .set('Authorization', userTokens.admin)
      .send(resUser.data)
      .expect(200)
  })

  it('returns updated user', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    const response = await request(app.getHttpServer())
      .patch('/users/1')
      .set('Authorization', userTokens.admin)
      .send(resUser.data)

    expect(response.body).toEqual(resUser)
  })

  it('calls UserService', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .set('Authorization', userTokens.admin)
      .send(resUser.data)

    expect(userService.update).toHaveBeenCalledTimes(1)
    expect(userService.update).toHaveBeenCalledWith(resUser.data, 1, authUser)
  })

  it('returns 400 if ID is not a number', async () => {
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/thirteen')
      .set('Authorization', userTokens.admin)
      .send(resUser.data)
      .expect(400)
  })

  it('returns 400 if request body is not correct', async () => {
    const badReqUser = { email: 'email.com' }
    userService.update.mockResolvedValueOnce(resUser)

    await request(app.getHttpServer())
      .patch('/users/1')
      .set('Authorization', userTokens.admin)
      .send(badReqUser)
      .expect(400)
  })

  it('should throw error when location user is logged', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', userTokens.locationUser)
      .expect(403)
  })
})
