import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return {
      // TODO use data in all methods
      data: await this.userRepository.findAll(),
    }
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
    const user = await this.findOne(id)
    return await this.userRepository.update(data, user.id)
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id)

    await this.userRepository.delete(user.id)
  }
}
