import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'


export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  street: string

  @ApiProperty()
  @IsNotEmpty()
  buildingNumber: number

  @ApiProperty()
  @IsNotEmpty()
  flatNumber: number

  @ApiProperty()
  @IsNotEmpty()
  postcode: string

  @ApiProperty()
  @IsNotEmpty()
  city: string

  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean

  @ApiProperty()
  @IsNotEmpty()
  longitude: string

  @ApiProperty()
  @IsNotEmpty()
  latitude: string
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
