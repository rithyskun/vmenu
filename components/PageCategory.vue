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
const { t } = useI18n()
const selectedTab = ref<string>('')

const currentTab = () => {
  return selectedTab.value
}

const selectedCategory = (cat: IProduct) => {
  selectedTab.value = cat.categoryId
}
</script>

<template>
  <div id="category">
    <div class="mb-3 mt-3 dark:text-white border-b border-gray-200 dark:border-gray-700">
      <ul id="tabCategory" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#myTabContent" role="tablist">
        <li class="mr-2" role="tab">
          <button id="all-tab" class="inline-block p-4 border-b-2 rounded-t-lg" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
            {{ t('all') }}
          </button>
        </li>
        <li class="mr-2" role="tab">
          <button id="favorite-tab" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">
            {{ t('favorite') }}
          </button>
        </li>
        <li class="mr-2" role="tab">
          <button id="feature-tab" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">
            {{ t('feature') }}
          </button>
        </li>
        <li role="tab">
          <button id="promotion-tab" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">
            {{ t('promotion') }}
          </button>
        </li>
        <li v-for="(category, index) in categories" :key="index" role="tab">
          <button id="category-tab" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">
            {{ category.categoryName }}
          </button>
        </li>
      </ul>
    </div>
    <div id="categoryContent">
      <div id="cart" class="p-4 rounded-lg bg-gray-50 dark:bg-dim-900" role="tabpanel" aria-labelledby="profile-tab">
        <div v-if="products?.length" class="grid grid-cols-2 md:grid-cols-4 gap-3 lg:grid-cols-6">
          <CartItem :products="products" />
        </div>
        <div v-else>
          {{ t('data_not_found') }}
        </div>
        <SharedSpinner v-show="loading" />
      </div>
    </div>
  </div>
</template>
