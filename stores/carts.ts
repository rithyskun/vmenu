import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ICart } from './../types'

export const useCartStore = defineStore('carts', {
  state: () => ({
    carts: [] as ICart[],
  }),
  actions: {
    async addProductToCart(payload: ICart) {
      try {
        const { id, productImage, productName, salePrice } = payload

        const item = this.carts.find((item: ICart) => item.id === id)

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
