import type { H3Event } from 'h3'
import { deleteCategory, getOneCategory, updateCategory } from '~~/server/service/category.service'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const params = getRouterParams(event)
  const method = getMethod(event)

  if (method === 'PUT')
    return await updateCategory(params.id, body)

  if (method === 'DELETE')
    return await deleteCategory(params.id)

  if (method === 'GET')
    return await getOneCategory(params.id)
})
