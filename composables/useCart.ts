interface ICart {
  id: string
  productName: string
  quantity: number
}

export const useCartItem = () => useState<ICart[]>('cart', () => [])

export const addToCart = () => {
  const item = useCartItem()
  return item.quantity++
}
