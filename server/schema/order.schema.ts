import { z } from 'zod'

const params = {
  params: z.object({
    id: z.string({
      required_error: 'Order id is required',
    }),
  }),
}

const payload = {
  body: z.object({
    phone: z.string({
      required_error: 'Order is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }).optional(),
    status: z.boolean({
      required_error: 'Status is required',
    }),
    qrcode: z.string({
      required_error: 'QR Code is required',
    }),
    carts: z.object({}).array(),
  }),
}

export const orderValidation = z.object({
  phone: z.string({
    required_error: 'Phone is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }).optional(),
  status: z.boolean({
    required_error: 'Status is required',
  }),
  qrcode: z.string({
    required_error: 'QR Code is required',
  }),
})

export const deleteOrderSchema = z.object({
  ...params,
})

export const updateOrderSchema = z.object({
  ...params,
  ...payload,
})

export const createOrderSchema = z.object({
  ...payload,
})

export const getOrderSchema = z.object({
  ...params,
  ...payload,
})

export type CreateOrderModel = z.infer <typeof createOrderSchema>

export type DeleteOrderModel = z.infer<typeof deleteOrderSchema>

export type UpdateOrderModel = z.infer<typeof updateOrderSchema>

export type GetOrderModel = z.infer<typeof getOrderSchema>
