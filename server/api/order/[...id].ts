import type { H3Event } from 'h3'
import { getOrderDetail } from '../../service/order.service'

export default defineEventHandler(async (event: H3Event) => {
  const body = readBody(event)
  const params = getRouterParams(event)
  const method = getMethod(event)

  try {
    if (method === 'GET')
      return await getOrderDetail(params.id)
  }
  catch (error) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})
