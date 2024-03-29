import { getCookie, setCookie } from 'h3'
import type { H3Event } from 'h3'

export class AppHelper {
  constructor() {}

  static useCookies(event: H3Event) {
    const token = getCookie(event, 'refresh_token') || ''

    setCookie(event, 'refresh_token', token)
    return {
      token,
    }
  }

  static escapeRegex(str: string) {
    return str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  static formatPhoneNumber(phoneNumber: string) {
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    const match = regex.exec(phoneNumber)
    if (match)
      return `(${match[1]}) ${match[2]}-${match[3]}`

    return phoneNumber
  }

  static formatCurrency(value: any, currency?: string, decimals?: number) {
    const digitsRE = '/(\d{3})(?=\d)/g'
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0))
      return ''
    currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 2
    const stringified = Math.abs(value).toFixed(decimals)
    const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
    const i = _int.length % 3
    const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
    const _float = decimals ? stringified.slice(-1 - decimals) : ''
    const sign = value < 0 ? '-' : ''
    return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
  }
}
