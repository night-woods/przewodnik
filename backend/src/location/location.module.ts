import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationRepository, PrismaService],
  exports: [LocationModule]
})
export class LocationModule {}
