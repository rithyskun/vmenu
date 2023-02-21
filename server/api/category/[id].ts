import { deleteCategory, getOneCategory, updateCategory } from '~~/server/service/category.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = event.context.params.id

  // const { categoryName, categoryImage } = body

  if (event.node.req.method === 'PUT')
    return await updateCategory(id, body)

  if (event.node.req.method === 'DELETE')
    return await deleteCategory(id)

  if (event.node.req.method === 'GET')
    return await getOneCategory(id)
})
