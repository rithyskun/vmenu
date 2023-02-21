import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Rithy SKUN',
    email: 'rithy.skun@outlook.com',
    password: '123456789',
    status: true,
    profileImage: 'https://picsum.photos/200/200',
  },
  {
    name: 'user',
    email: 'user@email.com',
    password: '123456789',
    status: true,
    profileImage: 'https://picsum.photos/200/200',
  },
]

async function main() {
  console.error('Start seeding...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.error(`Created user with id: ${user.id}`)
  }
  console.error('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
