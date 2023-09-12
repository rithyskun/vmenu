import type { H3Event } from 'h3'
import { filterCategory } from '~~/server/service/category.service'

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)
  return await filterCategory(query)
})
