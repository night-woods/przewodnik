import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { RolesGuard } from './auth/roles.guard'
import { LocationModule } from './location/location.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, PrismaModule, AuthModule, LocationModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
