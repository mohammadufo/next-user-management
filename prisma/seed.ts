import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  const hashedAdminPassword = await bcrypt.hash('admin123', 10)
  const hashedOwnerPassword = await bcrypt.hash('owner123', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      username: 'admin',
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
  })

  const owner = await prisma.user.upsert({
    where: { username: 'owner' },
    update: {},
    create: {
      name: 'Owner User',
      email: 'owner@example.com',
      username: 'owner',
      password: hashedOwnerPassword,
      role: Role.OWNER,
    },
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
