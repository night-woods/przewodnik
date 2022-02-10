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

  async findById(id: number, user?: User) {
    const foundUser = await this.userRepository.findById(id)
    if (user) user = (await this.findByEmail(user.email)).data
    if (!foundUser) {
      throw new NotFoundException('User with given ID not found')
    } else if (
      user &&
      user.role == Role.LOCATION_ADMIN &&
      user.locationId !== foundUser.locationId
    ) {
      throw new ForbiddenException(
        'User with given ID is not in your location!',
      )
    }

    return {
      data: foundUser,
    }
  }

  async create(data: CreateUserDto, user?: User) {
    data.password = await hash(data.password, 10)
    if (
      user &&
      user.role === String(Role.LOCATION_ADMIN) &&
      data.role !== String(Role.LOCATION_USER)
    ) {
      throw new ForbiddenException('You cannot create other admins')
    } else if (user && user.role == Role.LOCATION_ADMIN) {
      data.locationId = await (
        await this.findByEmail(user.email)
      ).data.locationId
    }
    return {
      data: await this.userRepository.create(data),
    }
  }

  async update(data: UpdateUserDto, id: number, user?: User) {
    const foundedUser = await this.findById(id, user)
    if (
      user &&
      user.role == Role.LOCATION_ADMIN &&
      foundedUser.data.role != Role.LOCATION_USER
    ) {
      throw new ForbiddenException('You cannot update other admins')
    } else if (
      user &&
      user.role == Role.LOCATION_ADMIN &&
      data.locationId &&
      foundedUser.data?.locationId != data.locationId
    ) {
      throw new ForbiddenException('You cannot change locationId of this user!')
    }
    return { data: await this.userRepository.update(data, foundedUser.data.id) }
  }

  async delete(id: number, user?: User) {
    const foundedUser = await this.findById(id, user)

    if (
      user &&
      user.role == Role.LOCATION_ADMIN &&
      foundedUser.data.role != Role.LOCATION_USER
    ) {
      throw new ForbiddenException('You cannot delete other admins')
    }

    await this.userRepository.delete(foundedUser.data.id)
  }
}
