import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { RolesGuard } from './roles.guard'

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
