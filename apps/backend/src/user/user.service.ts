import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.findAll()
  }

  async findOne(id: number) {
    return await this.findOne(id)
  }

  async create(data: CreateUserDto) {
    return await this.userRepository.create(data)
  }

  async update(data: UpdateUserDto, id: number) {
    return await this.userRepository.update(data, id)
  }

  async delete(id: number) {
    return await this.userRepository.delete(id)
  }
}
