import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = (await this.usersService.findOne({ email })).data
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }
    return { access_token: this.jwtService.sign(payload) }
  }
}
