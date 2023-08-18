import { sendError } from 'h3'
import { productValidation } from './../../schema/product.schema'
import { getOneProduct } from '~~/server/service/product.service'
import { createProduct } from '~/server/service/product.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  productValidation.parse(body)

  const { productName } = body

  const existProductName = await getOneProduct(productName)

  if (existProductName)
    return sendError(event, createError({ statusCode: 400, statusMessage: `The product <strong>${productName} </strong> name already exist` }))

  const product = await createProduct(body)
  return {
    data: product,
  }
})
