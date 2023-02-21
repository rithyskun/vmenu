import { acceptHMRUpdate, defineStore } from 'pinia'

interface State {
  text: string
  color: string
}
export const useSnackbarStore = defineStore('snackbar', {
  state: (): State => {
    return {
      text: '',
      color: '',
    }
  },

  actions: {
    showSnackbar(payload: State) {
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
