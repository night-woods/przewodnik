import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return {
      data: await this.userRepository.findAll(),
    }
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      throw new NotFoundException('User with given ID not found')
    }

    return {
      data: user,
    }
  }

  async create(data: CreateUserDto) {
    return {
      data: await this.userRepository.create(data),
    }
  }

  async update(data: UpdateUserDto, id: number) {
    const user = await this.findOne(id)
    return { data: await this.userRepository.update(data, user.data.id) }
  }

  async delete(id: number) {
    const user = await this.findOne(id)

    await this.userRepository.delete(user.data.id)
  }
}
