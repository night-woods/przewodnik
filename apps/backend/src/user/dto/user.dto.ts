import { PartialType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  surname: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
