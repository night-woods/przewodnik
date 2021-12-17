import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      throw new NotFoundException('User with given ID not found')
    }

    return user
  }

  async create(data: CreateUserDto): Promise<User | null> {
    return await this.userRepository.create(data)
  }

  async update(data: UpdateUserDto, id: number) {
    await this.userRepository.update(data, id)

    return await this.findOne(id)
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id)

    await this.userRepository.delete(user.id)
  }
}
