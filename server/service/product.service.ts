import { productValidation } from '../schema/product.schema'
import type { CreateProductModel, UpdateProductModel } from '../schema/product.schema'
import prisma from '~~/prisma/db'

export const getOneProduct = async (productName: string) => {
  return await prisma.product.findFirst({
    where: {
      productName,
    },
  })
}

export const getProducts = async () => {
  return await prisma.product.findMany({
    orderBy: [
      { createdAt: 'desc' },
    ],
    include: {
      category: true,
    },
  })
}

export const createProduct = async (payload: CreateProductModel['body']) => {
  productValidation.parse(payload)
  return await prisma.product.create({
    data: {
      ...payload,
    },
  })
}

export const updateProduct = async (id: string, payload: UpdateProductModel['body']) => {
  return await prisma.product.update({
    where: {
      id: String(id),
    },
    data: {
      ...payload,
    },
  })
}

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: {
      id: String(id),
    },
  })
}

export const filterProduct = async (search: string) => {
  return await prisma.product.findMany({
    where: {
      OR: [
        {
          productName: {
            contains: search,
          },
        },
      ],
    },
  })
}
