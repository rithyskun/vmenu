<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  autocomplete: {
    type: String,
    default: 'none',
  },
  validation: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="block">
    <label
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label>
    <input
      :autocomplete="autocomplete"
      :value="modelValue"
      :disabled="disabled"
      :type="type"
      class="bg-white p-2 md:p-2.5 dark:text-white w-full border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      required
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="validation" class="ml-2 text-sm text-red-600 dark:text-red-500">
      {{ validation }}
    </p>
  </div>
</template>
