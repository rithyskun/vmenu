<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'
const emit = defineEmits(['closeModal'])
const closeModal = () => {
    emit('closeModal')
}

const keys = useMagicKeys()
whenever(keys.escape, () => {
    emit('closeModal')
})
</script>

<template>
    <div id="modal-backdrop" class="fixed inset-0 z-40 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div id="modal"
            class="relative flex mx-2 w-full lg:w-full md:w-5/6 md:h-5/6 h-5/6 lg:h-5/6 flex-col justify-between bg-gray-50 dark:bg-gray-500 dark:text-white">
            <header id="modal-header" class="flex items-center justify-between border-b-2 border-white px-4 py-3">
                <slot name="header">Header</slot>
                <button type="button" class="bg-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-300"
                    @click="closeModal">
                    X
                </button>
            </header>

            <!-- Modal Body -->
            <section id="modal-body" class="overflow-x-auto px-4 py-3">
                <slot name="body"></slot>
            </section>

            <!-- Modal Footer -->
            <footer id="modal-footer" class="border-t-2 border-white px-4 py-3">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>
