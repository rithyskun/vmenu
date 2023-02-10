import { H3Event } from "h3"
import { getCookie, setCookie } from "h3"

export const useCookies = (event: H3Event) => {
    let token = getCookie(event, 'refresh_token') || ""

    setCookie(event, 'refresh_token', token)
    return {
        token
    }
}