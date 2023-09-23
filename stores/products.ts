import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IProduct } from '../types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as IProduct[],
    productSpecial: [] as IProduct[],
  }),
  actions: {
    async getProductSpecial(params: Object = {}) {
      try {
        useProgressBar(true)
        const data = await $fetch('/api/product/q', {
          method: 'GET',
          query: params,
        }) as any
        return this.productSpecial = data
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
      finally {
        useProgressBar(false)
      }
    },
    async getProductByCategory(category: string) {
      try {
        useProgressBar(true)
        const data = await $fetch('/api/product/q', {
          method: 'GET',
          query: { categoryId: category },
        }) as any
        return this.products = data
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
      finally {
        useProgressBar(false)
      }
    },
    async getAvailableProduct() {
      try {
        useProgressBar(true)
        const data = await $fetch('/api/product/q', {
          method: 'GET',
          query: { status: true },
        }) as any
        return this.products = data
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
      finally {
        useProgressBar(false)
      }
    },
    async getProducts() {
      try {
        useProgressBar(true)
        const data = await useFetchApi('/api/product') as IProduct[]
        return this.products = data
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
      finally {
        useProgressBar(false)
      }
    },

    async createProduct(product: IProduct) {
      try {
        await useFetchApi('/api/product/create', {
          method: 'POST',
          body: JSON.stringify(product),
        })
        useSnackbar({
          show: true,
          text: `The product <b>${product.productName}</b> name has been created`,
          color: 'success',
        })
        this.getProducts()
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async updateProduct(id: string, { ...payload }: IProduct) {
      const { productName, salePrice, productDescription, categoryId, promotion, productImage, favorite, feature, status } = payload
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
        useSnackbar({
          show: true,
          text: `The product name: <strong> ${payload.productName}</strong> has been updated`,
          color: 'success',
        })
        this.getProducts()
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async deleteProduct(id: string) {
      try {
        await useFetchApi(`/api/product/${id}`, {
          method: 'DELETE',
        })
        useSnackbar({
          show: true,
          text: 'Done',
          color: 'success',
        })
        this.getProducts()
      }
      catch (error: any) {
        useSnackbar({
          show: true,
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
