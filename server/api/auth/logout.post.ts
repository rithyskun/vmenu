import { sendRefreshToken } from "~~/server/utils/jwt"
import { removeRefreshToken } from "~~/server/service/refreshToken.service"

export default defineEventHandler( async (event) => {
    try {
        const cookie = parseCookies(event)
        const refreshToken = cookie.refresh_token
        await removeRefreshToken(refreshToken)

    } catch (error) {
        console.log(error)
    }

    sendRefreshToken(event, '')
    return {
        message: 'Done'
    }
})