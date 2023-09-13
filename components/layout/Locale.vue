<script setup lang="ts">
import { useLocaleStore } from '../../stores/locale'

const { locale, availableLocales, t } = useI18n()
const store = useLocaleStore()

const currentLanguage = useLocalStorage('locale', 'en')

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  currentLanguage.value = locale.value
  store.changeLocale(locale.value)
}

watch(locale, (cv) => {
  store.changeLocale(cv)
})
</script>

<template>
  <button
    type="button"
    class="flex rounded-lg text-sm dark:text-white"
    @click="toggleLocales"
  >
    <Icon name="language" size="18" />
    <span v-show="locale === 'km'"> ខ្មែរ </span>
    <span v-show="locale === 'en'"> en </span>
  </button>
</template>
