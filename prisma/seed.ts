import { PrismaClient } from '@prisma/client'
import {
  ROLE, PLAN
} from './seedingData'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    await seedUnchangeableTables()
    console.log(`Seeding finished.`)
}
main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  async function seedUnchangeableTables() {
    await seedRole()
    await seedPlan()
}

async function seedRole() {
    const data = Object.values(ROLE)
    await prisma.role.deleteMany()
    await prisma.role.createMany({
      data,
    })
  }

  async function seedPlan() {
    const data = Object.values(PLAN)
    await prisma.role.deleteMany()
    await prisma.role.createMany({
      data,
    })
  }