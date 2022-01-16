import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'



export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  surname: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
