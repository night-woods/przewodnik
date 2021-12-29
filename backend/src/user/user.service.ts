import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserRepository } from './user.repository'

export interface UserQuery {
  id?: number
  email?: string
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return { data: await this.userRepository.findAll() }
  }

  async findOne(searchQuery: UserQuery) {
    const user = await this.userRepository.findOne(searchQuery)

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

  async update(data: UpdateUserDto, searchQuery: UserQuery) {
    const user = await this.findOne(searchQuery)
    return { data: await this.userRepository.update(data, user.data.id) }
  }

  async delete(searchQuery: UserQuery) {
    const user = await this.findOne(searchQuery)

    await this.userRepository.delete(user.data.id)
  }
}
