import { IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateUserDto {
  @IsNotEmpty()
  name: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
