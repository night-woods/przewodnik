import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UserService } from '../user/user.service'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await (await this.usersService.findByEmail(email))?.data
    if (user) {
      const isMatch = await compare(pass, user.password)
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user
        return result
      }
    }
    return null
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }
    return { access_token: await this.jwtService.sign(payload) }
  }
}
