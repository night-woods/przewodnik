import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    return await this.prisma.location.create({ data: {} })
  }
}
