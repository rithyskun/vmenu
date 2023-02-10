<script setup lang="ts">
import type { PropType } from "vue";

type TItem = {
  id?: number;
  name: string;
  value?: number;
  items?: [];
}

defineProps({
  label: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: String,
    default: "Select an item of the list",
    required: false,
  },
  modelValue: {
    type: [String, Number, Object],
    default: "Default",
  },
  items: {
    type: Array as PropType<TItem[]>,
    required: true,
  },
})

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e: Event) => {
  let target = (e.target as HTMLInputElement).value;
  emit("update:modelValue", target);
};
</script>

<template>
  <label
    class="block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white"
    v-if="label"
    >{{ label }}</label
  >
  <select
    class="form-select rounded-full bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: () => {
        updateValue;
      },
    }"
  >
    <option value="" disabled>{{ defaultValue }}</option>
    <option
      v-for="(item, index) in items"
      :key="index"
      :value="item.id"
      :selected="item.id === modelValue"
    >
      <!-- <slot name="item" :item="item" /> -->
      {{ item.name }}
    </option>
  </select>
</template>
