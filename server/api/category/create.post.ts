import { sendError } from 'h3'
import { categoryValidation } from '~~/server/schema/category.schema'
import { createCategory, getOneCategory } from '~~/server/service/category.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  categoryValidation.parse(body)

  const { categoryName } = body

  if (!categoryName)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'The category is required' }))

  const existCategory = await getOneCategory(categoryName)

  if (existCategory)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'The category already exist' }))

  const category = await createCategory(body)

  return {
    data: category,
  }
})
