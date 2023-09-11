import { acceptHMRUpdate, defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface Language {
  lang: string
}

const language = useLocalStorage('locale', 'en' as Language['lang'])

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    useLocale: language,
  }),

  getters: {
    setLocale(state) {
      return state.useLocale
    },
  },

  actions: {
    changeLocale(locale: Language['lang']) {
      this.useLocale = locale
      language.value = locale
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot))
