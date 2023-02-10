import { IRefreshToken } from '~~/types/types';
import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { sendError } from 'h3'
import { getUserById } from '../service/user.service'

export default defineEventHandler( async(event) => {
    const endpoint = [
        '/api/auth/user',
        '/api/admin',
    ]

    const isHandledByThisMiddleware = endpoint.some(endpoint => {
        const pattern = new UrlPattern(endpoint)
        return pattern.match(String(event.node.req.url))
    })

    if(!isHandledByThisMiddleware) return

    const token = event.node.req.headers['authorization']?.split(' ')[1] as string

    const decoded = decodeAccessToken(token) as IRefreshToken

    if(!decoded) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }

    try {
        const userId = decoded.userId

        const user = await getUserById(userId)

        event.context.auth = { user }
    } catch (error) {
        return
    }
})