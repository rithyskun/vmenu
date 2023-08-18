import { acceptHMRUpdate, defineStore } from 'pinia'

export interface ISnackbar {
  text: string
  color: string
}
export const useSnackbarStore = defineStore('snackbar', {
  state: (): ISnackbar => {
    return {
      text: '',
      color: '',
    }
  },

  actions: {
    showSnackbar(payload: ISnackbar) {
      this.text = payload.text
      this.color = payload.color
    },
    resetSnackbar() {
      this.text = ''
      this.color = ''
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))
