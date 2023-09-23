import type { H3Event } from 'h3'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import { createOrder } from '../../service/order.service'
import { TelegramService } from '../../utils/telegram'
import { orderValidation } from '~/server/schema/order.schema'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const { phone, address, carts } = body
  const orderId = uuidv4()

  const newBody = {
    phone,
    address,
    status: true,
    qrcode: await QRCode.toDataURL(orderId),
    carts,
  }
  orderValidation.parse(newBody)
  const order = await createOrder(newBody)
  const message = `Order ID: ${order.id}
Phone: ${order.phone}
Address: ${order.address}
QR Code: ${order.qrcode}`

  await TelegramService.sendMessage(message)

  return {
    data: order,
  }
})
