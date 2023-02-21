import { sendError } from 'h3'
import { registerValidation } from './../../schema/user.schema'
import type { IUser } from '~~/types/types'
import { userTransformer } from '~~/server/transformers/user'
import { createUser } from '~~/server/service/user.service'
import type { CreateUserModel } from '~~/server/schema/user.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  registerValidation.parse(body)

  const { name, email, password, status, repeatPassword } = body

  if (!name || !email || !password || !repeatPassword)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))

  if (password !== repeatPassword)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))

  const userData = {
    name,
    email,
    password,
    status,
    profileImage: 'https://picsum.photos/200/200',
  } as CreateUserModel['body']

  const user = await createUser(userData) as IUser

  return {
    data: userTransformer(user),
  }
})
