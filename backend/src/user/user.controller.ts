import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne({ id })
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() user: CreateUserDto) {
    return this.service.create(user)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.service.update(user, { id })
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete({ id })
  }
}
