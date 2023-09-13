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
  <div class="flex flex-col container mx-auto overflow-auto h-full">
    <!-- <Carousel /> -->
    <Hero />
    <PageCategory :categories="categories" :products="products" :loading="loading" />
  </div>
</template>
