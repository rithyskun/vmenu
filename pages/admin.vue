<script setup lang="ts">
import { useUserStore } from '~/stores/auth'
const user = useUserStore()
const { locale } = useI18n()

const currentLanguage = useLocalStorage('locale', 'en')

onBeforeMount(() => {
  user.initAuth()
  locale.value = currentLanguage.value
})
</script>

<template>
  <div v-if="user.auth_token">
    <NuxtLayout name="page">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
