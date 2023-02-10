import { IUser } from '~~/types/types';
import { generateTokens } from './../../utils/jwt';
import bcrypt from 'bcrypt';
import { sendError } from 'h3';
import { getUserByEmail } from '~~/server/service/user.service'
import { createRefreshToken } from '~~/server/service/refreshToken.service'
import { userTransformer } from '~~/server/transformers/user'

export default defineEventHandler( async (event) => {
    
    const body = await readBody(event)

    const { email, password } = body

    if(!email || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const user = await getUserByEmail(email) as IUser
    
    if(!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Email or password is invalid'
        })) 
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Email or password is invalid'
        }))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})