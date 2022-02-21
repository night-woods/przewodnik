import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async create(data) {
    return await this.prisma.user.create({ data })
  }

  async update(data, id: number) {
    return await this.prisma.user.update({ data, where: { id } })
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } })
  }
}
