import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    sidebar: false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
  },
  getters: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
