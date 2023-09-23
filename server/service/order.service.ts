import type { CreateOrderModel } from '../schema/order.schema'
import prisma from '~~/prisma/db'

export const createOrder = async (payload: CreateOrderModel['body']) => {
  return await prisma.order.create({
    data:
      payload,
  })
}
