<script setup lang="ts">
defineProps({
  id: {
    type: String,
  },
  label: {
    type: [String, Boolean, Object],
    default: 'Default label',
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: [Boolean, Object],
    required: true,
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

const emit = defineEmits<{
  (event: 'update:modelValue', payload: any): void
}>()
</script>

<template>
  <div class="flex items-center w-4 h-4 dark:border-gray-700">
    <input
      :id="id"
      :autocomplete="autocomplete"
      :value="modelValue"
      type="checkbox"
      class="w-4 h-4 form-checkbox text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :placeholder="placeholder"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <label :for="id" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</label>
  </div>
</template>
