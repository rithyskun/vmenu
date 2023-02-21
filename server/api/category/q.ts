import { filterCategory } from '~~/server/service/category.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const categoryName = query?.categoryName
  const categoryImage = query?.categoryImage

  if (categoryName) {
    const searchResult = await filterCategory(categoryName)
      .catch((error: any) => {
        console.error(error)
      })
    return searchResult
  }

  if (categoryImage) {
    const searchResult = await filterCategory(categoryImage)
      .catch((error: any) => {
        console.error(error)
      })
    return searchResult
  }
})
