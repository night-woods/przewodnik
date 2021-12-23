/*
import { getQueueToken } from '@nestjs/bull'
import { ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ApiConfigService } from '../api-config/api-config.service'
import { AuthService } from '../auth/auth.service'
import { DeviceDataModule } from '../device-data/device-data.module'
import { DeviceDataService } from '../device-data/device-data.service'
import { HashValidator } from '../device-data/hash-validator/hash-validator'
import { DeviceModule } from '../device/device.module'
import { DeviceService } from '../device/device.service'
import { EmailModule } from '../email/email.module'
import { EmailService } from '../email/email.service'
import { HtmlRendererService } from '../email/html-renderer.service'
import { SendgridMailer } from '../email/sendgrid-mailer'
import { AllExceptionsFilter } from '../exception.filter'
import { LocationModule } from '../location/location.module'
import { LocationService } from '../location/location.service'
import { WeatherService } from '../location/weather/weather.service'
import { NotificationModule } from '../notification/notification.module'
import { NotificationService } from '../notification/notification.service'
import { PrismaService } from '../prisma/prisma.service'
import { SupportModule } from '../support/support.module'
import { SupportService } from '../support/support.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'

type PromiseValue<T> = T extends PromiseLike<infer U> ? U : T
export type TestingModuleUtilsPromise = ReturnType<typeof createTestingModule>
export type TestingModuleUtils = PromiseValue<TestingModuleUtilsPromise>
export type TestingModuleUtil<K extends keyof TestingModuleUtils> =
  TestingModuleUtils[K]

export const createTestingModule = async () => {
  const userService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
    updateById: jest.fn(),
    create: jest.fn(),
    confirmEmail: jest.fn(),
    resetPassword: jest.fn(),
    requestPasswordReset: jest.fn(),
    resetPasswordByToken: jest.fn(),
  }

  const deviceDataService = {
    createCurrentData: jest.fn(),
    createErrorData: jest.fn(),
    createHistoryData: jest.fn(),
  }

  const prismaService = {
    user: { findUnique: jest.fn() },
  }

  const authService = {
    encryptPassword: jest.fn(),
    checkPassword: jest.fn(),
    validateUser: jest.fn(),
    login: jest.fn(),
    signResetPasswordToken: jest.fn(),
    verifyResetPasswordToken: jest.fn(),
    verifyConfirmEmailToken: jest.fn(),
    signConfirmEmailToken: jest.fn(),
  }

  const locationService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
    updateById: jest.fn(),
    create: jest.fn(),
  }

  const weatherService = {
    getWeather: jest.fn(),
  }

  const deviceService = {
    findAllByUser: jest.fn(),
    findBySerialNumber: jest.fn(),
    updateBySerialNumber: jest.fn(),
    markAsDeleted: jest.fn(),
    create: jest.fn(),
    findSchedule: jest.fn(),
    createSchedule: jest.fn(),
    updateSchedule: jest.fn(),
    collectHistoricalPowerData: jest.fn(),
  }

  const emailService = {
    sendLostPasswordEmail: jest.fn(),
    sendConfirmationEmail: jest.fn(),
  }

  const sendgridMailer = {
    send: jest.fn(),
  }

  const htmlRendererService = {
    renderConfirmationEmail: jest.fn(),
    renderLostPasswordEmail: jest.fn(),
  }

  const apiConfigService = {
    frontendBaseUrl: 'frontendBaseUrl',
    databaseUrl: 'databaseUrl',
    accessTokenSecret: 'secret',
    accessTokenExpiresIn: '3600s',
    resetPasswordTokenSecret: 'secret',
    resetPasswordTokenExpiresIn: '86400s',
    sendgridApiKey: 'key',
    supportEmailAddress: 'support@email.com',
    sendgridEmailFrom: 'email@email.com',
    deviceSecret: 'deviceSecret',
    deviceValidationDisabled: true,
    confirmEmailTokenSecret: 'secret2',
    confirmEmailTokenExpiresIn: '30000s',
    openweathermapApiKey: 'key',
  }

  const hashValidator = {
    validate: jest.fn(),
  }

  const notificationService = {
    findAllByUser: jest.fn(),
    create: jest.fn(),
    countUnread: jest.fn(),
    markAllAsRead: jest.fn(),
    markOneAsRead: jest.fn(),
  }

  const supportService = {
    createSupportRequest: jest.fn(),
  }

  const canActivate = (context) => {
    const request = context.switchToHttp().getRequest()
    request.user = {
      id: 1,
      email: 'email@email.com',
    }
    request.requestId = '1'
    return true
  }

  const module = await Test.createTestingModule({
    imports: [
      UserModule,
      LocationModule,
      DeviceDataModule,
      DeviceModule,
      EmailModule,
      NotificationModule,
      SupportModule,
    ],
  })
    .overrideProvider(UserService)
    .useValue(userService)
    .overrideProvider(PrismaService)
    .useValue(prismaService)
    .overrideProvider(AuthService)
    .useValue(authService)
    .overrideProvider(LocationService)
    .useValue(locationService)
    .overrideProvider(WeatherService)
    .useValue(weatherService)
    .overrideProvider(DeviceService)
    .useValue(deviceService)
    .overrideProvider(ApiConfigService)
    .useValue(apiConfigService)
    .overrideProvider(DeviceDataService)
    .useValue(deviceDataService)
    .overrideProvider(EmailService)
    .useValue(emailService)
    .overrideProvider(HtmlRendererService)
    .useValue(htmlRendererService)
    .overrideProvider(SendgridMailer)
    .useValue(sendgridMailer)
    .overrideProvider(HashValidator)
    .useValue(hashValidator)
    .overrideProvider(NotificationService)
    .useValue(notificationService)
    .overrideProvider(getQueueToken('device-data'))
    .useValue({ add: jest.fn(), process: jest.fn() })
    .overrideProvider(SupportService)
    .useValue(supportService)
    .compile()

  const app = module.createNestApplication()

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalGuards({ canActivate })

  return {
    app,
    userService,
    deviceDataService,
    deviceService,
    prismaService,
    authService,
    locationService,
    emailService,
    weatherService,
    apiConfigService,
    htmlRendererService,
    sendgridMailer,
    hashValidator,
    notificationService,
    supportService,
  }
}


*/ 