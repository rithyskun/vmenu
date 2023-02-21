<script setup lang="ts">
import { useCategoriesStore } from '~~/stores/categories'

const no_image = '/no-image.png'
const category = useCategoriesStore()

const categories = computed(() => {
  return category.categories
})
onMounted(() => {
  category.getCategories()
})
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5 lg:grid-cols-6">
    <div v-for="(item, index) in categories" :key="index" class="group relative border-gray-200 transition-all">
      <div
        class="rouned-md hover:cursor-pointer dark:bg-gray-700 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none"
      >
        <div>
          <img :src="item.categoryImage || no_image" class="h-48 bg-gradient-to-r from-cyan-500 opacity-95 w-96 object-cover object-center" alt="">
        </div>
      </div>
      <div class="mt-2 flex justify-between">
        <div>
          <h3 class="text-sm absolute text-white ml-2 bottom-10 line-clamp-2 w-44 dark:text-gray-200">
            <a href="#">
              <span aria-hidden="true" />
              p-nameasdfdfd adsfa sdfasdfasdfasdfasdfasdfasdf {{ index }}
            </a>
          </h3>
          <p class="text-sm text-gray-500">
            disc {{ index }}
          </p>
        </div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          price {{ index }}
        </p>
      </div>
    </div>
  </div>
</template>
