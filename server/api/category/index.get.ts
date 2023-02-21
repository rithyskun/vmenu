import { getCategories } from './../../service/category.service'

export default defineEventHandler(async () => {
  return await getCategories()
})
