import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateLocationDto } from './dto/location.dto'

@Injectable()
export class LocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.location.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.location.findUnique({ where: { id } })
  }

  async create(data) {
    return await this.prisma.location.create({ data })
  }

  async update(data: UpdateLocationDto, id: number) {
    return await this.prisma.location.update({ data, where: { id } })
  }

  async delete(id: number) {
    return await this.prisma.location.delete({ where: { id } })
  }
}
