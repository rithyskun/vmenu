<script setup lang="ts">
import type { IProduct } from '~/types'
defineProps({
  productSpecial: {
    type: Array as PropType<IProduct[]>,
    required: true,
  },
})

const no_image = '/no-image.png'
</script>

<template>
  <div class="container flex-wrap p-5 gap-5 md:gap-10 flex dark:bg-dim-800 flex-col h-60 overflow-x-auto snap-x bg-white snap snap-mandatory items-center">
    <div v-for="(item, index) in productSpecial" :key="index" class="snap-start brightness-90">
      <NuxtImg
        :src="item.productImage || no_image" class="h-44 w-56 md:w-44"
      />
    </div>
  </div>
</template>
