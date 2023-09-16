import { sendError } from 'h3'
import { getRefreshTokenByToken } from '~~/server/service/refreshToken.service'
import { getUserById } from '~~/server/service/user.service'
import { decodeRefreshToken } from '~~/server/utils/jwt'
import type { IToken, IUser } from '~/types'

export default defineEventHandler(async (event) => {
  const cookie = parseCookies(event)
  const refreshToken = cookie.refresh_token

  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'The session expired!',
    }))
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh session invalid',
    }))
  }
  try {
    const token = decodeRefreshToken(refreshToken) as IToken

    const user = await getUserById(token.userId) as IUser

    const { accessToken } = generateTokens(user)

    return {
      access_token: accessToken,
    }
  }
  catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    }))
  }
})
