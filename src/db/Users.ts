import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { User } from '../types'

// Userをすべて参照する
export async function getUsers(): Promise<User[]> {
  return await prisma.users.findMany()
}

// Userのuser_idからUserデータを参照する
export async function getUserById(user_id: any): Promise<any> {
  return await prisma.users.findFirst({
    where: {
      user_id: user_id
    },
    orderBy: {
      id: 'desc'
    }
  })
}

// Userを追加する
export async function addUser(user: Prisma.usersCreateInput): Promise<void> {
  await prisma.users.upsert({
    where: {
      user_id: user.user_id
    },
    update: {
      team_id: user.team_id
    },
    create: {
      user_id: user.user_id,
      team_id: user.team_id
    }
  })
}
