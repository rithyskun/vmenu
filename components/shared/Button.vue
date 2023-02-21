<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <button
    type="submit"
    class="py-2.5 px-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-md text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75 disabled:cursor-not-allowed"
  >
    {{ label }}
  </button>
</template>
