import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserRepository } from './user.repository'
import { hash } from 'bcrypt'
import { Role, User } from '@prisma/client'

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

  async findById(id: number, currentUser: User) {
    const foundUser = await this.userRepository.findById(id)
    const loggedUser = (await this.findByEmail(currentUser.email)).data

    if (!foundUser) {
      throw new NotFoundException('User with given ID not found')
    }
    if (
      loggedUser.role === String(Role.LOCATION_ADMIN) &&
      loggedUser.locationId !== foundUser.locationId
    ) {
      throw new ForbiddenException(
        'User with given ID is not in your location!',
      )
    }

    return {
      data: foundUser,
    }
  }

  async create(data: CreateUserDto, currentUser: User) {
    const hashedPass = await hash(data.password, 10)
    if (
      currentUser.role === String(Role.LOCATION_ADMIN) &&
      data.role !== String(Role.LOCATION_USER)
    ) {
      throw new ForbiddenException('You cannot create other admins')
    }
    if (currentUser.role === Role.LOCATION_ADMIN) {
      data.locationId = currentUser.locationId
    }
    return {
      data: await this.userRepository.create({ ...data, password: hashedPass }),
    }
  }

  async update(data: UpdateUserDto, id: number, currentUser: User) {
    const foundUser = await this.findById(id, currentUser)
    if (
      currentUser.role === Role.LOCATION_ADMIN &&
      foundUser.data.role !== Role.LOCATION_USER
    ) {
      throw new ForbiddenException('You cannot update other admins')
    }

    return { data: await this.userRepository.update(data, foundUser.data.id) }
  }

  async delete(id: number, currentUser: User) {
    const foundUser = await this.findById(id, currentUser)

    if (
      currentUser.role === Role.LOCATION_ADMIN &&
      foundUser.data.role !== Role.LOCATION_USER
    ) {
      throw new ForbiddenException('You cannot delete other admins')
    }

    await this.userRepository.delete(foundUser.data.id)
  }
}
