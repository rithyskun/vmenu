<script setup lang="ts">
import { useCategoriesStore } from '~~/stores/categories'
import { useProductStore } from '~~/stores/products'

const product = useProductStore()

const products = computed(() => {
  return product.products
})

const category = useCategoriesStore()

const categories = computed(() => {
  return category.categories
})

const search = ref<string>('')

const filterProducts = computed(() => {
  return products.value?.filter(
    (item: any) =>
      String(item.productName.toLowerCase()).includes(search.value.toLowerCase())
      || String(item.categoryName).toLowerCase().includes(search.value.toLowerCase()),
  )
})

const fetchProduct = async () => {
  useLoading(true)
  try {
    await product.getAvailableProduct()
  }
  catch (error) {
    console.error(error)
  }
  finally {
    useLoading(false)
  }
}

onMounted(() => {
  category.getCategories()
  fetchProduct()
})
</script>

<template>
  <NuxtLayout name="default">
    <LayoutNavbarHome v-model="search" />
    <div class="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-dim-800">
      <div class="grid grid-rows-3 md:grid-rows-1 grid-flow-col">
        <PageBody :categories="categories" :products="filterProducts" />
      </div>
    </div>
  </NuxtLayout>
</template>
