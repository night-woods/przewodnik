import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserRepository } from './user.repository'

export interface UserQuery {
  id?: number
  email?: string
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async findOne(searchQuery: UserQuery): Promise<User | null> {
    const user = await this.userRepository.findOne(searchQuery)

    if (!user) {
      throw new NotFoundException('User with given ID not found')
    }

    return user
  }

  async create(data: CreateUserDto): Promise<User | null> {
    return await this.userRepository.create(data)
  }

  async update(data: UpdateUserDto, searchQuery: UserQuery) {
    const user = await this.findOne(searchQuery)
    return await this.userRepository.update(data, user.id)
  }

  async delete(searchQuery: UserQuery): Promise<void> {
    const user = await this.findOne(searchQuery)

    await this.userRepository.delete(user.id)
  }
}
