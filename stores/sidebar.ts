import { acceptHMRUpdate, defineStore } from 'pinia'
interface IState {
  sidebar: boolean
}
export const useSidebarStore = defineStore('sidebar', {
  state: (): IState => ({
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
