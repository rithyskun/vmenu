<script setup lang="ts">
const show = useShow()
const text = useText()
const color = useColor()

const reset = () => {
  show.value = false
  text.value = ''
  color.value = ''
}

const onTimeOut = () => {
  setTimeout(() => {
    reset()
  }, 3000)
}

watch(show, () => {
  onTimeOut()
})
</script>

<template>
  <div class="items-center relative">
    <div
      v-if="show === true && color === 'success'" id="toast-success"
      class="bottom-5 z-40 fixed text-center md:right-5 lg:right-5 mb-4 flex w-full max-w-md items-center justify-center rounded-lg bg-white p-5 text-gray-500 shadow dark:bg-gray-700 dark:text-gray-400"
      role="alert"
    >
      <div
        class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-green-500 dark:bg-green-800 dark:text-green-200"
      >
        <div
          class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
        >
          <Icon name="checkmark" size="20" />
          <span class="sr-only">Check icon</span>
        </div>
      </div>
      <div class="ml-3 text-sm font-normal" v-html="text" />
      <button
        type="button"
        class="ml-auto inline-flex rounded-full text-red-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:text-red-500 bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
        data-collapse-toggle="toast-success" aria-label="Close" @click="show = false"
      >
        <span class="sr-only">Close</span>
        <Icon name="close" size="18" />
      </button>
    </div>

    <div
      v-if="show && color === 'error'" id="toast-danger"
      class="bottom-5 z-40 fixed text-center md:right-5 lg:right-5 mb-4 flex w-full max-w-md items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-700 dark:text-gray-400"
      role="alert"
    >
      <div
        class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200"
      >
        <Icon name="warning" size="20" />
        <span class="sr-only">Warning icon</span>
      </div>
      <div class="ml-3 text-sm font-normal" v-html="text" />
      <button
        type="button"
        class="ml-auto bg-gray-50 dark:bg-gray-600 inline-flex rounded-full text-red-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white"
        data-collapse-toggle="toast-danger" aria-label="Close" @click="show = false"
      >
        <span class="sr-only">Close</span>
        <Icon name="close" size="18" />
      </button>
    </div>
  </div>
</template>
