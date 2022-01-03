import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserRepository } from './user.repository'
import { hash } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return { data: await this.userRepository.findAll() }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException('User with given email not found')
    }

    return {
      data: user,
    }
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException('User with given ID not found')
    }

    return {
      data: user,
    }
  }

  async create(data: CreateUserDto) {
    data.password = await hash(data.password, 10)
    return {
      data: await this.userRepository.create(data),
    }
  }

  async update(data: UpdateUserDto, id: number) {
    const user = await this.findById(id)
    return { data: await this.userRepository.update(data, user.data.id) }
  }

  async delete(id: number) {
    const user = await this.findById(id)

    await this.userRepository.delete(user.data.id)
  }
}
