import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { LocationModule } from './location/location.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
