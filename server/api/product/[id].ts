import type { H3Event } from 'h3'
import { deleteProduct, getOneProduct, updateProduct } from '~~/server/service/product.service'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const params = getRouterParams(event)
  const method = getMethod(event)

  if (method === 'PUT')
    return await updateProduct(params.id, body)

  if (method === 'DELETE')
    return await deleteProduct(params.id)

  if (method === 'GET')
    return await getOneProduct(params.id)
})
