<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'
const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}

const keys = useMagicKeys()
whenever(keys.escape, () => {
  emit('close')
})
</script>

<template>
  <div id="modal-backdrop" class="fixed inset-0 z-40 flex items-center justify-center bg-gray-700 bg-opacity-40">
    <div
      id="modal"
      class="relative flex w-full mx-2 md:w-3/6 lg:w-2/6 h-3/5 lg:h-4/6 flex-col justify-between rounded-md bg-gray-50 dark:bg-gray-500 dark:text-white"
    >
      <header id="modal-header" class="flex items-center justify-between border-b-2 border-white p-3">
        <div class="font-bold text-lg">
          <slot name="header">
            Header
          </slot>
        </div>
        <button type="button" class="rounded-full h-8 w-8 dark:text-gray-700 bg-gray-200 hover:bg-gray-300" @click="close">
          X
        </button>
      </header>

      <!-- Modal Body -->
      <section id="modal-body" class="overflow-x-auto px-4 py-3">
        <slot name="body" />
      </section>

      <!-- Modal Footer -->
      <footer id="modal-footer" class="border-t-2 border-white px-4 py-3">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
