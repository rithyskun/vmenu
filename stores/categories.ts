import { acceptHMRUpdate, defineStore } from 'pinia'
import { useSnackbarStore } from './snackbar'
import type { Category } from '~~/types/types'

export const useCategoriesStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async createCategory({ categoryName, categoryImage }: Category) {
      const snackbar = useSnackbarStore()
      try {
        await useFetchApi('/api/category/create', {
          method: 'POST',
          body: {
            categoryName, categoryImage,
          },
        })
        snackbar.showSnackbar({
          text: `The ${categoryName} category has been created`,
          color: 'success',
        })
        this.getCategories()
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
      }
    },

    async updateCategory(id: string, { categoryName, categoryImage }: Category) {
      const snackbar = useSnackbarStore()
      try {
        await useFetchApi(`/api/category/${id}`, {
          method: 'PUT',
          body: {
            categoryName,
            categoryImage,
          },
        })
        snackbar.showSnackbar({
          text: `The ${categoryName} category has been updated`,
          color: 'success',
        })
        this.getCategories()
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async deleteCategory(id: string) {
      const snackbar = useSnackbarStore()
      try {
        await useFetchApi(`/api/category/${id}`, {
          method: 'DELETE',
        })
        snackbar.showSnackbar({
          text: 'Done',
          color: 'success',
        })
        this.getCategories()
      }
      catch (error: any) {
        snackbar.showSnackbar({
          text: error.statusMessage,
          color: 'error',
        })
      }
    },

    async getCategories() {
      const snackbar = useSnackbarStore()
      try {
        const data = await useFetchApi('/api/category') as Category[]
        this.categories = data
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
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
