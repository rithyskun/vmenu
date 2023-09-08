import UrlPattern from 'url-pattern'
import { getUserById } from '../service/user.service'
import type { IRefreshToken } from '~/types/types'
export default defineEventHandler(async (event) => {
  const endpoint = [
    '/api/auth/register',
    '/api/auth/user',
    '/api/admin',
    '/api/upload',
    '/api/category/create',
    '/api/category/:id',
    '/api/category/q',
    '/api/product/create',
    '/api/product/:id',
    '/api/product/q',
  ]

  const isHandledByThisMiddleware = endpoint.some((endpoint) => {
    const pattern = new UrlPattern(endpoint)
    return pattern.match(String(event.node.req.url))
  })

  if (!isHandledByThisMiddleware)
    return

  const token = event.node.req.headers.authorization?.split(' ')[1] as string

  const decoded = decodeAccessToken(token) as IRefreshToken

  if (!decoded) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }))
  }

  try {
    const userId = decoded.userId

    const user = await getUserById(userId)

    event.context.auth = { user }
  }
  catch (error) {
    console.error(error)
  }
})
