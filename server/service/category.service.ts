import type { CreateCategoryModel, DeleteCategoryModel, UpdateCategoryModel } from './../schema/category.schema'
import prisma from '~~/prisma/db'

export const getOneCategory = async (categoryName: string) => {
  return await prisma.category.findFirst({
    where: {
      categoryName,
    },
  })
}

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: [
      { createdAt: 'desc' },
    ],
  })
}

export const createCategory = async (input: CreateCategoryModel['body']) => {
  return await prisma.category.create({
    data: {
      categoryName: input.categoryName,
      categoryImage: input.categoryImage,
    },
  })
}

export const updateCategory = async (id: UpdateCategoryModel['params'], input: UpdateCategoryModel['body']) => {
  return await prisma.category.update({
    where: {
      id: String(id),
    },
    data: {
      categoryName: input.categoryName,
      categoryImage: input.categoryImage,
    },
  })
}

export const deleteCategory = async (id: DeleteCategoryModel['params']) => {
  return await prisma.category.delete({
    where: {
      id: String(id),
    },
  })
}

export const filterCategory = async (search: string) => {
  return await prisma.category.findMany({
    where: {
      OR: [
        {
          categoryName: {
            contains: search,
          },
        },
        {
          categoryImage: {
            contains: search,
          },
        },
      ],
    },
  })
}