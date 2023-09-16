import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'
import type { IUser } from '~/types'

const generateAccessToken = (user: IUser) => {
  const config = useRuntimeConfig()

  return jwt.sign({
    userId: user.id,
  }, config.jwtAccessToken, { expiresIn: config.jwtExpiredIn })
}

const generateRefreshToken = (user: IUser) => {
  const config = useRuntimeConfig()

  return jwt.sign({
    userId: user.id,
  }, config.jwtRefreshToken, { expiresIn: config.jwtRefreshExpiredIn })
}

export const decodeRefreshToken = (token: string) => {
  const config = useRuntimeConfig()

  try {
    return jwt.verify(token, config.jwtRefreshToken)
  }
  catch (error) {
    return null
  }
}

export const decodeAccessToken = (token: string) => {
  const config = useRuntimeConfig()

  try {
    return jwt.verify(token, config.jwtAccessToken)
  }
  catch (error) {
    return null
  }
}

export const generateTokens = (user: IUser) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken,
    refreshToken,
  }
}

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true,
  })
}
