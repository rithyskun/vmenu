import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Category, ICategory } from '~/types'

export const useCategoriesStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[],
  }),
  actions: {
    async createCategory({ categoryName, categoryImage }: Category) {
      try {
        await useFetchApi('/api/category/create', {
          method: 'POST',
          body: {
            categoryName, categoryImage,
          },
        })
        useSnackbar({
          show: true,
          text: `The category <b>${categoryName}</b> has been created`,
          color: 'success',
        })
        this.getCategories()
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
      }
    },

    async updateCategory(id: string, { categoryName, categoryImage }: Category) {
      try {
        await useFetchApi(`/api/category/${id}`, {
          method: 'PUT',
          body: {
            categoryName,
            categoryImage,
          },
        })
        useSnackbar({
          show: true,
          text: `The category <b>${categoryName}</b> has been updated`,
          color: 'success',
        })
        this.getCategories()
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async deleteCategory(id: string) {
      try {
        await useFetchApi(`/api/category/${id}`, {
          method: 'DELETE',
        })
        useSnackbar({
          show: true,
          text: 'Done',
          color: 'success',
        })
        this.getCategories()
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async getCategories() {
      try {
        useProgressBar(true)
        const data = await useFetchApi('/api/category') as ICategory[]
        return this.categories = data
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

  },
  getters: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
