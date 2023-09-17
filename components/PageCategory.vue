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

const getProductByCategory = async (categoryId: string) => {
  selectedTab.value = categoryId
  try {
    useLoading(true)
    await store.getProductByCategory(categoryId)
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

const specialProductItems = computed(() => {
  const data: ISpecialProductItem[] = [{ id: 0, data: { status: true }, label: t('all') },
    { id: 1, data: { favorite: true }, label: t('favorite') },
    { id: 2, data: { feature: true }, label: t('feature') },
    { id: 3, data: { promotion: true }, label: t('promotion') }]
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

onMounted(() => {
  selectedTab.value = 0
})
</script>

<template>
  <div id="category">
    <div class="mb-3 mt-3 dark:text-white border-b border-gray-200 dark:border-gray-700">
      <ul id="tabCategory" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#tabCategory" role="tablist">
        <li v-for="cat in specialProductItems" :key="cat.id" class="mr-2" role="tab">
          <button id="all-tab" :class="Number(cat.id) === selectedTab ? 'bg-blue-100 dark:bg-gray-600 dark:text-white border-transparent' : ''" class="inline-block p-4 border-transparent border-b-2 rounded-t-lg" data-tabs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="false" @click="getProductSpecial(cat)">
            {{ cat.label }}
          </button>
        </li>

        <li v-for="(category, index) in categories" :key="index" role="tab">
          <button id="category-tab" :class="String(category.id) === selectedTab ? 'bg-blue-100 dark:bg-gray-600 dark:text-white border-transparent' : ''" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false" @click="getProductByCategory(String(category.id))">
            {{ category.categoryName }}
          </button>
        </li>
      </ul>
    </div>
    <div id="categoryContent">
      <div id="cart" class="p-4 overflow-hidden dark:text-white rounded-lg bg-gray-50 dark:bg-dim-900" role="tabpanel" aria-labelledby="profile-tab">
        <div v-if="products?.length" class="grid grid-cols-2 md:grid-cols-4 gap-3 lg:grid-cols-6">
          <CartItem :products="products" />
        </div>
        <div v-else>
          {{ t('data_not_found') }}
        </div>
        <SharedSpinner />
      </div>
    </div>
  </div>
</template>
~/types
