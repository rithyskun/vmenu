<script setup lang="ts">
defineProps({
  id: {
    type: String,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: [String, Number, Date, Boolean],
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
    default: "none",
  },
  validation: {
    type: String,
  },
});

const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
}>();

</script>

<template>
  <div class="block">
    <label
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <input
      :autocomplete="autocomplete"
      :value="modelValue"
      :disabled="disabled"
      :type="type"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :id="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      required
    />
    <p class="ml-2 text-sm text-red-600 dark:text-red-500" v-if="validation">
      {{ validation }}
    </p>
  </div>
</template>
