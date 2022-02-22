import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { PrismaService } from '../prisma/prisma.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  exports: [UserModule, UserService],
  providers: [UserService, UserRepository, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
