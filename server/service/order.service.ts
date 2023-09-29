import { type CreateOrderModel, orderValidation } from '../schema/order.schema'
import type { ICart } from '~/types'
import prisma from '~~/prisma/db'

export const createOrder = async (payload: CreateOrderModel['body']) => {
  const { phone, address, qrcode, carts } = orderValidation.parse(payload)

  const total = carts.reduce<number>((total, item) => {
    return total + (item.quantity * item.salePrice)
  }, 0)

  const order = await prisma.order.create({
    data: {
      phone,
      address,
      qrcode,
      total,
    },
  })

  const detail = await Promise.all(
    carts.map(async (cart: ICart) => {
      const { salePrice, quantity } = cart
      return await prisma.ordersDetail.create({
        data: {
          productId: cart.id,
          quantity,
          salePrice,
          orderId: order.id,
        },
      })
    }),
  )
  return order
}

export const getOrderDetail = async (id: string) => {
  return await prisma.ordersDetail.findMany({
    where: {
      orderId: id,
    },
    include: {
      product: true,
    },
  })
}
