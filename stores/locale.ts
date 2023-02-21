import { acceptHMRUpdate, defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface LanguageInfo {
  lang: string
}

const language = useLocalStorage('locale', 'en' as LanguageInfo['lang'])

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
    changeLocale(locale: LanguageInfo['lang']) {
      this.useLocale = locale
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot))
