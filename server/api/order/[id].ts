import type { H3Event } from 'h3'
import { getOrder } from './../../service/order.service'

export default defineEventHandler(async (event: H3Event) => {
  const body = readBody(event)
  const params = getRouterParams(event)
  const method = getMethod(event)

  // if (method === 'PUT')
  //   return await updateCategory(params.id, body)

  // if (method === 'DELETE')
  //   return await deleteCategory(params.id)

  if (method === 'GET')
    return await getOrder(params.id)
})
