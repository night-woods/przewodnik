import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  findAll() {
    // TODO change other methods to remove unnecessary await
    return this.service.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.service.findOne(id)
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.service.create(user)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User | null> {
    return await this.service.update(user, id)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.service.delete(id)
  }
}
