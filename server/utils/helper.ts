import { getCookie, setCookie } from 'h3'
import type { H3Event } from 'h3'

export const useCookies = (event: H3Event) => {
  const token = getCookie(event, 'refresh_token') || ''

  setCookie(event, 'refresh_token', token)
  return {
    token,
  }
}

export const escapeRegex = (str: string) => {
  return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}
