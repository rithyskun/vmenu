import { acceptHMRUpdate, defineStore } from 'pinia'
import { useSnackbarStore } from './snackbar'
import type { IProduct } from '~~/types/types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as IProduct[],
  }),
  actions: {
    async getProducts() {
      const snackbar = useSnackbarStore()
      try {
        const data = await useFetchApi('/api/product') as IProduct[]
        return this.products = data
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },
    async createProduct(product: IProduct) {
      const snackbar = useSnackbarStore()
      try {
        await useFetchApi('/api/product/create', {
          method: 'POST',
          body: JSON.stringify(product),
        })
        snackbar.showSnackbar({
          text: `The ${product.productName} name has been create`,
          color: 'success',
        })
        this.getProducts()
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async updateProduct(id: string, { ...payload }: IProduct) {
      const { productName, salePrice, productDescription, categoryId, promotion, productImage, favorite, feature, status } = payload
      const snackbar = useSnackbarStore()
      try {
        await useFetchApi(`/api/product/${id}`, {
          method: 'PUT',
          body: {
            productName,
            productDescription,
            categoryId,
            salePrice,
            promotion,
            productImage,
            favorite,
            feature,
            status,
          },
        })
        snackbar.showSnackbar({
          text: `The product name: <strong> ${payload.productName}</strong> has been updated`,
          color: 'success',
        })
        this.getProducts()
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async deleteProduct(id: string) {
      const snackbar = useSnackbarStore()
      try {
        await useFetchApi(`/api/product/${id}`, {
          method: 'DELETE',
        })
        snackbar.showSnackbar({
          text: 'Done',
          color: 'success',
        })
        this.getProducts()
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },
  },
  getters: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
