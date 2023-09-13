<script setup lang="ts">
const { locale } = useI18n()
const currentLanguage = useLocalStorage('locale', 'en')
onMounted(() => {
  locale.value = currentLanguage.value
})
</script>

<template>
  <div class="dark:bg-dim-900 mx-auto">
    <slot />
  </div>
</template>
