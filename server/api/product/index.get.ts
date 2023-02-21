import { getProducts } from './../../service/product.service'

export default defineEventHandler(async () => {
  return await getProducts()
})
