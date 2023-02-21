import type { CreateProductModel } from '../schema/product.schema'
import prisma from '~~/prisma/db'

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
  })
}

export const createProduct = async (input: CreateProductModel['body']) => {
  return await prisma.product.create({
    data: {
      productName: input.productName,
      productDescription: input.productDescription,
      categoryId: input.categoryId,
      salePrice: input.salePrice,
      productImage: input.productImage,
      status: input.status,
    },
  })
}
