import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(searchQuery) {
    return searchQuery.id
      ? await this.prisma.user.findUnique({
          where: {
            id: searchQuery.id,
          },
        })
      : await this.prisma.user.findUnique({
          where: { email: searchQuery.email },
        })
  }

  async create(data) {
    return await this.prisma.user.create({ data })
  }

  async update(data: UpdateUserDto, id: number) {
    return await this.prisma.user.update({ data, where: { id } })
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } })
  }
}
