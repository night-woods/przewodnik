import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  public async getUsers() {
    return { data: await this.service.findAll() }
  }

  @Post()
  public async create(@Body() user: CreateUserDto) {
    const newUser = await this.service.createUser(user)

    return { data: newUser }
  }
}
