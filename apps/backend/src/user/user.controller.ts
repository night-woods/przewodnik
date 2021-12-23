import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ description: 'Gets details of all users' })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll()
  }

  @ApiOperation({ description: 'Gets detail of one specific user' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.service.findOne({ id })
  }

  @ApiOperation({ description: 'Creates new user' })
  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.service.create(user)
  }

  @ApiOperation({ description: 'Updated one specific user' })
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User | null> {
    return await this.service.update(user, { id })
  }

  @ApiOperation({ description: 'Delete specific user' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.service.delete({ id })
  }
}
