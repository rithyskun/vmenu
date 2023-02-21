import { createProduct } from '~/server/service/product.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const product = await createProduct(body)

  return {
    data: product,
  }
})
