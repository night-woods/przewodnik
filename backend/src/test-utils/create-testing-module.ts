import { ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { UserRepository } from '../user/user.repository'
import { PrismaService } from '../prisma/prisma.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { UserController } from '../user/user.controller'

type PromiseValue<T> = T extends PromiseLike<infer U> ? U : T
export type TestingModuleUtilsPromise = ReturnType<typeof createTestingModule>
export type TestingModuleUtils = PromiseValue<TestingModuleUtilsPromise>
export type TestingModuleUtil<K extends keyof TestingModuleUtils> =
  TestingModuleUtils[K]

export const createTestingModule = async () => {
  const jwtService = {
    sign: jest.fn(),
  }

  const authService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  }
  const userService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  }

  const userRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }

  const prismaService = {
    user: { findUnique: jest.fn() },
  }

  const canActivate = (context) => {
    const request = context.switchToHttp().getRequest()
    request.user = {
      id: 1,
      email: 'email@email.com',
      role: 'ADMIN',
    }
    request.requestId = '1'
    return true
  }

  const module = await Test.createTestingModule({
    imports: [UserModule, UserRepository],
    providers: [UserService],
    controllers: [UserController],
  })
    .overrideProvider(UserService)
    .useValue(userService)
    .overrideProvider(PrismaService)
    .useValue(prismaService)
    .overrideProvider(UserRepository)
    .useValue(userRepository)
    .overrideProvider(JwtService)
    .useValue(jwtService)
    .overrideProvider(AuthService)
    .useValue(authService)
    .compile()

  const app = module.createNestApplication()

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalGuards({ canActivate })

  return {
    app,
    userService,
    userRepository,
    prismaService,
    jwtService,
    authService,
  }
}
