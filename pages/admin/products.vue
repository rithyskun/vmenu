<script setup lang="ts">
import { useProductStore } from '~~/stores/products'
import type { Product } from '~~/types/types'
const product = useProductStore()
const { t } = useI18n()

const products = computed(() => {
  return product.products
})

const colHeader = computed(() => {
  const column = ref([
    { id: 'productName', text: t('product_name'), type: 'string' },
    { id: 'productDescription', text: t('product_description'), type: 'string' },
    { id: 'category', text: t('category_name'), type: 'string' },
    { id: 'salePrice', text: t('sale_price'), type: 'string' },
    { id: 'productImage', text: t('product_image'), type: 'string' },
    { id: 'status', text: t('status'), type: 'string' },
    { id: 'actions', text: t('actions'), type: 'string' },
  ])
  return column.value
})

const keyword = ref<string>('')
const modal = ref<boolean>(false)
const showModal = () => {
  modal.value = true
}

const editIndex = ref<number>(-1)
const editedItem = ref<Product>({
  productName: '',
  productDescription: '',
  categoryId: '',
  salePrice: 0,
  productImage: '',
  status: false,
})

const defaultItem = ref<Product>({
  productName: '',
  productDescription: '',
  categoryId: '',
  salePrice: 0,
  productImage: '',
  status: false,
})

const formTitle = computed(() => {
  return editIndex.value === -1 ? `${t('new')} ${t('product')}` : `${t('edit')} ${t('product')}`
})

const editItem = (item: any) => {
  editIndex.value = products.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  modal.value = true
}

const showModalConfirm = () => {

}

onMounted(() => {
  product.getProducts()
})
</script>

<template>
  <div class="space-y-5 dark:bg-dim-900 dark:text-white bg-white">
    <div class="mx-1 items-center flex justify-between">
      <div class="flex space-x-2 space-y-2">
        <SharedInput v-model="keyword" type="text" :placeholder="t('search')" class="w-64 lg:w-96" />
        <SharedButton :label="t('new')" class="w-24 md:24" @click="showModal" />
      </div>
      <span class="text-xl italic font-bold hidden md:block">
        {{ t('products') }}
      </span>
    </div>
    <SharedBaseTable :filter-key="keyword" :columns="colHeader" :rows="products" :per-page="15">
      <template #[`item.category.categoryName`]="{ item }">
        {{ item.category.categoryName }}
      </template>
      <template #actions="{ item }">
        <button type="button" class="dark:text-white hover:bg-blue-200 h-8 w-8 hover:rounded-full" @click="editItem(item)">
          <Icon name="edit" class="h-5 w-5 text-blue-500" />
        </button>
        <button type="button" class="dark:text-white hover:bg-red-200 h-8 w-8 hover:rounded-full" @click="showModalConfirm(item)">
          <Icon name="delete" class="h-5 w-5 text-red-500" />
        </button>
      </template>
    </SharedBaseTable>
  </div>
</template>
