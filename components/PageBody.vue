<script setup lang="ts">
import type { ICategory, IProduct } from '~/types/types'

defineProps({
  categories: {
    type: Array as PropType<ICategory[]>,
    required: true,
  },
  products: {
    type: Array as PropType<IProduct[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col">
    <Carousel />
    <PageCategory :categories="categories" :products="products" :loading="loading" />
  </div>
</template>
