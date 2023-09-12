<script setup lang="ts">
defineProps({
  customStyle: {
    type: String,
    required: true,
  },
})
const isShowing = ref<boolean>(false)

const mouseEnter = () => {
  isShowing.value = true
}

const mouseLeave = () => {
  isShowing.value = false
}
</script>

<template>
  <div v-if="$slots.tooltip" class="relative" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <Transition
      v-show="isShowing"
      appear
      as="template"
      enter="transform transition duration-[400ms]"
      enter-from="opacity-0 scale-50"
      enter-to="opacity-100 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leave-from="opacity-100 scale-100"
      leave-to="opacity-0 scale-95"
    >
      <div
        role="tooltip"
        class="tooltip absolute z-10 inline-block rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium text-gray-900 opacity-100 shadow-sm"
        :class="`${customStyle}`"
      >
        <div>
          <slot name="tooltip" />
        </div>
      </div>
    </Transition>
    <span>
      <slot />
    </span>
  </div>
</template>
