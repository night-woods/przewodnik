import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { LocationModule } from './location/location.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    LocationModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
