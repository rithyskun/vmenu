import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ICart, ICartItem } from './../types/index'

export const useCartStore = defineStore('carts', {
  state: () => ({
    carts: [] as ICart[],
  }),
  actions: {
    async submitOrder(payload: ICartItem) {
      try {
        const { data } = await $fetch('/api/order/create', {
          method: 'POST',
          body: payload,
        })
        useSnackbar({
          show: true,
          text: `Order no: ${data.id} has been created`,
          color: 'success',
        })
        return data
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error,
          color: 'error',
        })
      }
    },
    async removeItem(payload: ICart) {
      const { id } = payload
      const item = this.carts.find((item: ICart) => item.id === id)

      if (item)
        this.carts.splice(this.carts.indexOf(item), 1)

      return false
    },

    async decreaseItemQty(payload: ICart) {
      const { id } = payload
      const itemFound = this.carts.find((item: ICart) => item.id === id) as ICart

      if (itemFound)
        itemFound.quantity--

      if (itemFound.quantity <= 0)
        this.carts.splice(this.carts.indexOf(itemFound), 1)
      return false
    },
    async increaseItemQty(payload: ICart) {
      const { id } = payload
      const item = this.carts.find((item: ICart) => item.id === id)

      if (item)
        item.quantity += 1

      return false
    },
    async addProductToCart(payload: ICart) {
      try {
        const { id, productImage, productName, salePrice } = payload

        const item = this.carts.find((item: ICart) => item.id === id)

        // TODO: Check the item in stock

        if (!item) {
          this.carts.push({
            id,
            productImage,
            productName,
            salePrice,
            quantity: 1,
          })
          useSnackbar({
            show: true,
            text: `The item <b>${productName}</b> x 1 has been add to cart`,
            color: 'success',
          })
        }
        else {
          item.quantity++
          useSnackbar({
            show: true,
            text: `The item <b>${item.productName}</b> increment ${item.quantity} QTY`,
            color: 'success',
          })
        }
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
      }
    },

  },
  getters: {
    getAvailableItemInCart(state): ICart[] {
      return state.carts
    },
    getGrandTotal: (state) => {
      return state.carts.reduce<number>((total, item) => {
        return total + (item.quantity * item.salePrice)
      }, 0)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
