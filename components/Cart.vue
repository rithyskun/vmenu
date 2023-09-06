<script setup lang="ts">
import { useCategoriesStore } from '~~/stores/categories'
import { useProductStore } from '~~/stores/products'

const no_image = '/no-image.png'
const category = useCategoriesStore()
const product = useProductStore()

const categories = computed(() => {
  return category.categories
})

const products = computed(() => {
  return product.products
})
onMounted(() => {
  category.getCategories()
  product.getProducts()
})
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5 lg:grid-cols-6">
    <div v-for="(item, index) in products" :key="index" class="group relative border-gray-200 transition-all">
      <div
        class="rounded-md hover:cursor-pointer dark:bg-gray-700 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none"
      >
        <div>
          <NuxtImg :src="item.productImage || no_image" class="h-48 brightness-75 bg-gradient-to-r from-cyan-500 opacity-95 w-96 object-cover object-center" alt="" />
        </div>
      </div>
      <div class="mt-2 flex justify-between">
        <div>
          <h3 class="text-sm absolute text-white ml-2 bottom-10 line-clamp-2 w-44 dark:text-gray-200">
            <a href="#">
              <span aria-hidden="true" />
              {{ item.productName }}
            </a>
          </h3>
          <p class="text-sm text-gray-500">
            disc 0
          </p>
        </div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          price {{ item.salePrice }}
        </p>
      </div>
    </div>
  </div>
</template>
