<script setup lang="ts">
import { useProductStore } from '~~/stores/products'
import type { IProduct } from '~~/types/types'
import { useCategoriesStore } from '~~/stores/categories'
import { AppHelper } from '~~/server/utils/helper'

const no_image = '/no-image.png'
const product = useProductStore()
const { t } = useI18n()
const category = useCategoriesStore()

const products = computed(() => {
  return product.products
})

const colHeader = computed(() => {
  const column = ref([
    { id: 'productName', text: t('product_name'), type: 'string' },
    { id: 'category', text: t('category_name'), type: 'string' },
    { id: 'salePrice', text: t('sale_price'), type: 'string' },
    { id: 'productImage', text: t('product_image'), type: 'string' },
    { id: 'status', text: t('status'), type: 'string' },
    { id: 'actions', text: t('actions'), type: 'string' },
  ])
  return column.value
})

const selectedImage = ref<string>('')
const keyword = ref<string>('')
const modal = ref<boolean>(false)
const showModal = () => {
  modal.value = true
}

const productId = ref<string>('')
const editIndex = ref<number>(-1)
const editedItem = ref<IProduct>({
  productName: '',
  productDescription: '',
  categoryId: '',
  salePrice: 0,
  productImage: '',
  status: true,
  feature: false,
  favorite: false,
  promotion: false,
})

const defaultItem = ref<IProduct>({
  productName: '',
  productDescription: '',
  categoryId: '',
  salePrice: 0,
  productImage: '',
  status: true,
  feature: false,
  favorite: false,
  promotion: false,
})

const confirmModal = ref<boolean>(false)
const closeModal = () => {
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editIndex.value = -1
  })
  modal.value = false
  confirmModal.value = false
  selectedImage.value = ''
}

const formTitle = computed(() => {
  return editIndex.value === -1 ? `${t('new')} ${t('product')}` : `${t('edit')} ${t('product')}`
})

const editItem = (item: any) => {
  editIndex.value = products.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  const update_category = editedItem.value.categoryId
  editedItem.value.categoryId = update_category
  selectedImage.value = item.productImage
  productId.value = item.id
  modal.value = true
}

const confirmDeletedId = ref<string>('')
const confirmDeleteItem = ref<string>('')
const showModalConfirm = async (item: any) => {
  confirmModal.value = true
  confirmDeletedId.value = item?.id
  confirmDeleteItem.value = item?.category.categoryName
}
const loading = ref<boolean>(false)
const handleSubmit = async () => {
  loading.value = true

  useProgressBar(true)
  if (!editedItem.value.productName || !editedItem.value.categoryId || !editedItem.value.salePrice) {
    useSnackbar({
      show: true,
      text: 'INVALID.USER.INPUT',
      color: 'error',
    })
    loading.value = false
    useProgressBar(false)
    return
  }

  if (editIndex.value > -1) {
    try {
      editedItem.value.productImage = selectedImage.value
      await product.updateProduct(productId.value,
        { ...editedItem.value },
      )
    }
    catch (error: any) {
      useSnackbar({
        show: true,
        text: error.statusMessage || error.message || error,
        color: 'error',
      })
    }
    finally {
      loading.value = false
      useProgressBar(false)
      closeModal()
    }
  }
  else {
    try {
      editedItem.value.productImage = selectedImage.value
      await product.createProduct({
        ...editedItem.value,
      })
    }
    catch (error: any) {
      useSnackbar({
        show: true,
        text: error.statusMessage || error.message || error,
        color: 'error',
      })
    }
    finally {
      loading.value = false
      useProgressBar(false)
      closeModal()
    }
  }
}

const categories = computed(() => {
  return category.categories
})

const handleConfirmedDelete = async () => {
  useProgressBar(true)
  await product.deleteProduct(confirmDeletedId.value)
  confirmModal.value = false
  closeModal()
  useProgressBar(false)
}

const doubleClickToEdit = (item: any) => {
  editItem(item)
}

onMounted(() => {
  product.getProducts()
  category.getCategories()
})
</script>

<template>
  <div class="md:space-y-5 space-y-2 dark:bg-dim-900 dark:text-white bg-white">
    <div class="text-xl italic font-bold block md:hidden">
      {{ t('product') }}
    </div>
    <div class="mx-1 items-center flex justify-between">
      <div class="flex space-x-2 space-y-2">
        <SharedInput v-model="keyword" type="text" :placeholder="t('search')" class="w-64 lg:w-96" />
        <SharedButton :label="t('new')" class="w-20 md:24" @click="showModal" />
      </div>
      <span class="text-xl italic font-bold hidden md:block">
        {{ t('products') }}
      </span>
    </div>
    <SharedBaseTable :filter-key="keyword" :columns="colHeader" :rows="products" :per-page="10" @row-d-b-click="(item) => doubleClickToEdit(item)">
      <template #salePrice="{ item }: any">
        {{ AppHelper.formatCurrency(item.salePrice) }}
      </template>
      <template #category="{ item }: any">
        {{ item.category.categoryName }}
      </template>
      <template #productImage="{ item }: any">
        <div class="text-center flex flex-col items-center">
          <NuxtImg :src="item.productImage || no_image" class="h-16 w-full object-contain object-center" />
        </div>
      </template>
      <template #status="{ item }: any">
        <div class="rounded-md border px-1 py-1" :class="item.status ? 'dark:bg-green-300 bg-green-500 text-white dark:text-gray-900' : 'dark:bg-red-300 bg-red-500 text-white dark:text-gray-900'">
          {{ item.status ? t('active') : t('inactive') }}
        </div>
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

    <!-- model create/update Product  -->
    <SharedModal v-show="modal" @close="closeModal">
      <template #header>
        {{ formTitle }}
      </template>
      <template #body>
        <form id="product" name="product" @submit.prevent="handleSubmit">
          <div class="space-y-5">
            <SharedInput v-model="editedItem.productName" type="text" :label="t('product_name')" />
            <SharedTextarea v-model="editedItem.productDescription" type="text" :label="t('product_description')" />
            <label for="category-1" class="block text-sm font-medium text-gray-900 dark:text-white">{{ t('category') }}</label>
            <select id="category-1" v-model="editedItem.categoryId" class="bg-gray-50 border form-select border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected disabled class="text-gray-600 cursor-not-allowed bg-gray-100">
                {{ t('choose_category') }}
              </option>
              <option v-for="(cat, index) in categories" :key="index" :value="cat.id">
                {{ cat.categoryName }}
              </option>
            </select>
            <SharedInput v-model.number="editedItem.salePrice" type="number" :label="t('sale_price')" />
            <div class="flex items-center pl-4 border bg-white dark:bg-gray-700 border-gray-200 rounded dark:border-gray-700">
              <input id="checkbox-status" v-model="editedItem.status" type="checkbox" class="w-4 h-4 form-checkbox text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-status" class="w-full py-3 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">{{ editedItem.status ? `${t('status')}: ${t('active')}` : `${t('status')}: ${t('inactive')}` }}</label>
            </div>
            <div class="flex items-center pl-4 border bg-white dark:bg-gray-700 border-gray-200 rounded dark:border-gray-700">
              <input id="checkbox-feature" v-model="editedItem.feature" type="checkbox" class="w-4 h-4 form-checkbox text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-feature" class="w-full py-3 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">{{ editedItem.feature ? `${t('feature')}: ${t('active')}` : `${t('feature')}: ${t('inactive')}` }}</label>
            </div>
            <div class="flex items-center pl-4 border bg-white dark:bg-gray-700 border-gray-200 rounded dark:border-gray-700">
              <input id="checkbox-favorite" v-model="editedItem.favorite" type="checkbox" class="w-4 h-4 form-checkbox text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-favorite" class="w-full py-3 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">{{ editedItem.favorite ? `${t('favorite')}: ${t('active')}` : `${t('favorite')}: ${t('inactive')}` }}</label>
            </div>
            <div class="flex items-center pl-4 border bg-white dark:bg-gray-700 border-gray-200 rounded dark:border-gray-700">
              <input id="checkbox-promotion" v-model="editedItem.promotion" type="checkbox" class="w-4 h-4 form-checkbox text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-promotion" class="w-full py-3 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">{{ editedItem.promotion ? `${t('promotion')}: ${t('active')}` : `${t('promotion')}: ${t('inactive')}` }}</label>
            </div>
            <SharedFile :image-selected="selectedImage" @selected-file="(file) => (selectedImage = file)" />
          </div>
        </form>
      </template>

      <template #footer>
        <SharedButtonCustom v-if="editIndex > -1" :disabled="loading" :label="t('update')" class="w-full" @click.prevent="handleSubmit" />
        <SharedButtonCustom v-else :disabled="loading" :label="t('save')" class="w-full" @click.prevent="handleSubmit" />
      </template>
    </SharedModal>

    <!-- model confirm delete category -->
    <SharedModal v-show="confirmModal" @close="confirmModal = false">
      <template #header>
        {{ t('delete') }}
      </template>

      <template #body>
        <div class="flex flex-col items-center text-center justify-center space-y-5">
          <button class="text-red-400">
            <Icon name="alert" size="96" />
          </button>
          <div class="flex flex-col text-md line-clamp-3 text-center items-center">
            {{ t('are_you_sure_to_delete_this_item') }} <strong> "{{ confirmDeleteItem }}" ?</strong>
          </div>
        </div>
      </template>

      <template #footer>
        <SharedButtonCustom :disabled="loading" :label="`${t('delete')}`" class="w-full" @click.prevent="handleConfirmedDelete" />
      </template>
    </SharedModal>
  </div>
</template>
