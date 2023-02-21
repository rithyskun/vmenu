import bcrypt from 'bcrypt'

import type { CreateUserModel } from '../schema/user.schema'
import prisma from '~~/prisma/db'

export const getOneUser = async (email: string) => {
  const oneUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return oneUser
}

export const createUser = async (userData: CreateUserModel['body']) => {
  const finalData = {
    ...userData,
    password: bcrypt.hashSync((userData.password), 10),
  }

  return await prisma.user.create({
    data: finalData,
  })
}

export const getUserByEmail = async (email: string) => {
  const userEmail = await prisma.user.findMany({
    where: {
      email,
      status: true,
    },
    take: 1,
  })
  return userEmail[0]
}

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}
