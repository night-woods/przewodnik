import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { LocationModule } from './location/location.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './auth/roles.guard'

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
