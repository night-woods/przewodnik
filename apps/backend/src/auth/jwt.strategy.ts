import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

interface ValidatePayload {
  email: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_JWT_SECRET,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: ValidatePayload) {
    return payload
  }
}
