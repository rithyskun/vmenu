<script setup lang="ts">
import { useNProgress } from '@vueuse/integrations/useNProgress'
defineProps({
  label: {
    type: String,
    required: false,
  },
})

const { isLoading, progress } = useNProgress()
const showPercentage = (num: any) => {
  return ((num || 0) * 100).toFixed(0)
}
</script>

<template>
  <button
    type="submit"
    class="py-2.5 px-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-md text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75 disabled:cursor-not-allowed"
  >
    {{ label }}
    <b v-if="isLoading" class="ml-2 text-xs dark:text-white">{{ showPercentage(progress) }}%</b>
  </button>
</template>
