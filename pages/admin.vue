<script setup lang="ts">
import { useUserStore } from '~/stores/auth'

const user = useUserStore()

onBeforeMount(() => {
  user.initAuth()
})
</script>

<template>
  <div v-if="user.auth_token">
    <NuxtLayout name="page">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
