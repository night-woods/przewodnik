import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { LocationModule } from './location/location.module';

@Module({
  imports: [UserModule, PrismaModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
