import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { RequestUser } from './user.decorator'

class LoginProperties {
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ type: LoginProperties })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('profile')
  async getProfile(@RequestUser() user) {
    return user
  }
}
