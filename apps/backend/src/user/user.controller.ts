import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  public async getUsers() {
    return { data: await this.service.findAll() }
  }
}
