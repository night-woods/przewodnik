import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { UserService } from 'src/user/user.service'
import { LocationService } from '../src/location/location.service'

const create = async () => {
  const app = await NestFactory.create(AppModule)
  const locationService = app.get(LocationService)
  const userService = app.get(UserService)

  const l1 = await locationService.create()
  const l2 = await locationService.create()
  const l3 = await locationService.create()

  //   load users.json

  const users = [
    {
      firstName: 'Nikodem',
      lastName: 'Piotrowski',
      email: 'nikodem.piotrowski@mail.com',
      password: 'test',
      role: 'LOCATION_ADMIN',
      locations: [l1.id, l2.id],
    },
    {
      firstName: 'Benedykt',
      lastName: 'Kowalski',
      email: 'benedykt.kowalski@mail.com',
      password: 'test',
      role: 'ADMIN',
      locations: [],
    },
    {
      firstName: 'Jagoda',
      lastName: 'Dudek',
      email: 'jagoda.dudek@mail.com',
      password: 'test',
      role: 'LOCATION_USER',
      locations: [l3.id],
    },
    {
      firstName: 'Bogumila',
      lastName: 'Kaminska',
      email: 'bogumila.kaminska@mail.com',
      password: 'test',
      role: 'LOCATION_ADMIN',
      locations: [l2.id, l3.id],
    },
  ]

  await userService.create(users[0])
  await userService.create(users[1])
  await userService.create(users[2])
  await userService.create(users[3])

  app.close()

  // eslint-disable-next-line no-console
  console.log('Data loaded!')
}

create()
