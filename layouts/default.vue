<script setup lang="ts">
const { locale } = useI18n()
const currentLanguage = useLocalStorage('locale', 'en')
onMounted(() => {
  locale.value = currentLanguage.value
})
</script>

<template>
  <div class="dark:bg-dim-800 flex flex-col min-h-screen">
    <div class="container mx-auto max-w-[84.375rem] flex-grow">
      <main>
        <slot />
      </main>
    </div>

    <Snackbar />
  </div>
</template>
