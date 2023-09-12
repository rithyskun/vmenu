import type { H3Event } from 'h3'
import { queryProducts } from '../../service/product.service'

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)
  return await queryProducts(query)
})
