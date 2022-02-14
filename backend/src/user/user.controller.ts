import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { HasRoles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RequestUser } from '../auth/user.decorator'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { UserService } from './user.service'
import { Public } from '../auth/public.decorator'

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.service.findAll()
  }

  @HasRoles(Role.ADMIN, Role.LOCATION_ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @RequestUser() user) {
    return this.service.findById(id, user)
  }

  @Public()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('/me')
  async getProfile(@RequestUser() user) {
    return user
  }

  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.LOCATION_ADMIN)
  @Post()
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() data: CreateUserDto, @RequestUser() user) {
    return this.service.create(data, user)
  }

  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.LOCATION_ADMIN)
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
    @RequestUser() user,
  ) {
    return this.service.update(data, id, user)
  }

  @UseGuards(RolesGuard)
  @HasRoles(Role.ADMIN, Role.LOCATION_ADMIN)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @RequestUser() user) {
    return this.service.delete(id, user)
  }
}
