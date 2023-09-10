<script setup lang="ts">
import { useCategoriesStore } from '~~/stores/categories'

const category = useCategoriesStore()

const categories = computed(() => {
  return category.categories
})
onMounted(() => {
  category.getCategories()
})
</script>

<template>
  <div class="flex flex-col">
    <Carousel />
    <PageCategory :categories="categories" />
  </div>
</template>
