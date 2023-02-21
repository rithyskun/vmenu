import { acceptHMRUpdate, defineStore } from 'pinia'
import { useSnackbarStore } from './snackbar'
import type { Product } from '~~/types/types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async getProducts() {
      const snackbar = useSnackbarStore()
      try {
        const data = await useFetchApi('/api/product') as Product[]
        return this.products = data
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },
    async createProduct(product: Product) {
      await useFetchApi('/api/product', {
        method: 'POST',
        body: JSON.stringify(product),
      })
      this.getProducts()
    },
  },
  getters: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
