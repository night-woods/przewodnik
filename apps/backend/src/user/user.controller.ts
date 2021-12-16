import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @Get(':id')
  async findOne(id: number) {
    return await this.service.findOne(id)
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.service.create(user)
  }
}
