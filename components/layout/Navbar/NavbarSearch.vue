<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center p-3">
    <label for="search" class="sr-only">Search</label>
    <div class="relative w-full">
      <Icon name="search" class="absolute mt-3.5 ml-3 text-gray-500" size="16" />
      <input id="search" :value="modelValue" type="search" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="t('search')" required @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </div>
  </div>
</template>
