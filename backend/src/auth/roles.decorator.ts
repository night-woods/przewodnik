import { SetMetadata } from '@nestjs/common'

export const HasRoles = (...HasRoles: string[]) =>
  SetMetadata('roles', HasRoles)
