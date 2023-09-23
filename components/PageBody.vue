<script setup lang="ts">
import type { ICategory, IProduct, ISpecialProductItem } from '~/types'
import { useProductStore } from '~/stores/products'

defineProps({
  categories: {
    type: Array as PropType<ICategory[]>,
    required: true,
  },
  products: {
    type: Array as PropType<IProduct[]>,
    required: true,
  },
})
const { t } = useI18n()
const store = useProductStore()
const selectedTab = ref<string | number>()
const specialProductItems = computed(() => {
  const data: ISpecialProductItem[] = [
    { id: 0, data: { favorite: true }, label: t('favorite') },
    { id: 1, data: { feature: true }, label: t('feature') },
    { id: 2, data: { promotion: true }, label: t('promotion') }]
  return data
})

const getProductSpecial = async (item: ISpecialProductItem) => {
  selectedTab.value = Number(item.id)
  try {
    useLoading(true)
    await store.getProductSpecial(item.data)
  }
  catch (error: any) {
    useSnackbar({
      show: true,
      text: error.statusMessage,
      color: 'error',
    })
  }
  finally {
    useLoading(false)
  }
}

const productSpecial = computed(() => {
  return store.productSpecial
})

onMounted(() => {
  selectedTab.value = 0
  store.getProductSpecial({ favorite: true })
})
</script>

<template>
  <div class="flex flex-col container mx-auto overflow-auto h-full">
    <Carousel />
    <div class="mt-5 md:mt-0">
      <ul id="tabCategory" class="flex flex-wrap dark:text-white -mb-px text-sm font-medium text-center" data-tabs-toggle="#tabCategory" role="tablist">
        <li v-for="cat in specialProductItems" :key="cat.id" class="mr-2" role="tab">
          <button id="all-tab" :class="Number(cat.id) === selectedTab ? 'bg-blue-100 dark:bg-gray-600 dark:text-white border-transparent' : ''" class="inline-block p-4 border-transparent border-b-2 rounded-t-lg" data-tabs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="false" @click="getProductSpecial(cat)">
            {{ cat.label }}
          </button>
        </li>
      </ul>

      <Hero :product-special="productSpecial" />
    </div>

    <PageCategory :categories="categories" :products="products" />
  </div>
</template>
