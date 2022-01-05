import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { LocationService } from './location.service'

@Module({
  providers: [LocationService, PrismaService],
  exports: [LocationService],
})
export class LocationModule {}
