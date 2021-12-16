import { Injectable } from '@nestjs/common'
import { User } from '../../node_modules/.prisma/client'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
