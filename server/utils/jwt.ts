import jwt from 'jsonwebtoken'
import { IUser } from '~~/types/types'
import { H3Event } from 'h3'

const generateAccessToken = (user: IUser) => {
    const config = useRuntimeConfig()

    return jwt.sign({
        userId: user.id
    }, config.jwtAccessToken, { expiresIn: '10m' })
}

const generateRefreshToken = (user: IUser) => {
    const config = useRuntimeConfig()

    return jwt.sign({
        userId: user.id
    }, config.jwtRefreshToken, { expiresIn: '4h' })
}

export const decodeRefreshToken = (token: string) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.jwtRefreshToken)
    } catch (error) {
        return null
    }
}

export const decodeAccessToken = (token: string) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.jwtAccessToken)
    } catch (error) {
        return null
    }
}

export const generateTokens = (user: IUser) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const sendRefreshToken = (event: H3Event, token: string) => {
    setCookie(event, 'refresh_token', token, {
        httpOnly: true,
        sameSite: true
    })
}