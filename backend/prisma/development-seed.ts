import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const l1 = await prisma.location.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {},
  })
  const l2 = await prisma.location.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {},
  })
  const l3 = await prisma.location.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {},
  })

  // eslint-disable-next-line no-console
  console.log({ l1, l2, l3 })

  const hashedPass = await hash('test', 10)

  const u1 = await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      firstName: 'Nikodem',
      lastName: 'Piotrowski',
      email: 'nikodem.piotrowski@mail.com',
      password: hashedPass,
      role: 'LOCATION_ADMIN',
      locationId: l1.id,
    },
  })

  const u2 = await prisma.user.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      firstName: 'Benedykt',
      lastName: 'Kowalski',
      email: 'benedykt.kowalski@mail.com',
      password: hashedPass,
      role: 'ADMIN',
    },
  })
  const u3 = await prisma.user.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      firstName: 'Jagoda',
      lastName: 'Dudek',
      email: 'jagoda.dudek@mail.com',
      password: hashedPass,
      role: 'LOCATION_USER',
      locationId: l3.id,
    },
  })

  const u4 = await prisma.user.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      firstName: 'Bogumila',
      lastName: 'Kaminska',
      email: 'bogumila.kaminska@mail.com',
      password: hashedPass,
      role: 'LOCATION_ADMIN',
      locationId: l2.id,
    },
  })

  // eslint-disable-next-line no-console
  console.log({ u1, u2, u3, u4 })
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
