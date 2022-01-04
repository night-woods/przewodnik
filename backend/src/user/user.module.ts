import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { PrismaService } from '../prisma/prisma.service'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from 'src/auth/roles.guard'

@Module({
  exports: [UserModule, UserService],
  providers: [
    UserService,
    UserRepository,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
