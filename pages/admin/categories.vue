<script setup lang="ts">
import { useCategoriesStore } from '~~/stores/categories'
import type { Category } from '~~/types/types'

const no_image = '/no-image.png'
const category = useCategoriesStore()

const { t } = useI18n()

const keyword = ref<string>()
const colHeader = computed(() => {
  const column = ref([
    { id: 'categoryName', text: t('category_name'), type: 'string' },
    { id: 'categoryImage', text: t('category_image'), type: 'string' },
    { id: 'actions', text: t('actions'), type: 'string' },
  ])
  return column.value
})

const selectedImage = ref<string>()

const categories = computed(() => {
  return category.categories
})

const editIndex = ref<number>(-1)
const editedItem = ref<Category>({
  categoryName: '',
})
const defaultItem = ref<Category>({
  categoryName: '',
})

const modal = ref<boolean>(false)
const loading = ref<boolean>(false)
const formTitle = computed(() => {
  return editIndex.value === -1 ? `${t('new')} ${t('category')}` : `${t('edit')} ${t('category')}`
})

const showModal = () => {
  editIndex.value = -1
  editedItem.value = Object.assign({}, defaultItem.value)
  selectedImage.value = ''
  modal.value = true
}

const closeModal = () => {
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editIndex.value = -1
  })
  modal.value = false
}

const editItem = (item: any) => {
  editIndex.value = categories.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  selectedImage.value = item.categoryImage
  modal.value = true
}

const handleSubmit = async () => {
  loading.value = true
  if (!editedItem.value.categoryName) {
    useSnackbar({
      show: true,
      text: 'Category name is required',
      color: 'error',
    })
    return loading.value = false
  }

  if (editIndex.value > -1) {
    try {
      await category.updateCategory(String(editedItem.value.id), {
        categoryName: editedItem.value.categoryName,
        categoryImage: selectedImage.value,
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
      modal.value = false
    }
  }
  else {
    try {
      await category.createCategory({
        categoryName: editedItem.value.categoryName,
        categoryImage: selectedImage.value,
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
      modal.value = false
    }
  }
}

const confirmModal = ref<boolean>(false)
const confirmDeleteId = ref<string>('')
const confirmDeleteItem = ref<string>('')
const showModalConfirm = async (item: any) => {
  confirmModal.value = true
  confirmDeleteId.value = item?.id
  confirmDeleteItem.value = item?.categoryName
}

const handleConfirmedDelete = async () => {
  loading.value = true
  try {
    return await category.deleteCategory(confirmDeleteId.value)
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
    confirmDeleteId.value = ''
    confirmModal.value = false
  }
}

const doubleClickToEdit = (item: any) => {
  editItem(item)
}

onMounted(() => {
  category.getCategories()
})
</script>

<template>
  <div>
    <div class="md:space-y-5 space-y-2 dark:bg-dim-900 dark:text-white bg-white">
      <div class="text-xl italic font-bold block md:hidden">
        {{ t('categories') }}
      </div>
      <div class="mx-1 items-center flex justify-between">
        <div class="flex space-x-2 space-y-2">
          <SharedInput v-model="keyword" type="text" :placeholder="t('search')" class="w-64 lg:w-96" />
          <SharedButton :label="t('new')" class="w-20 md:24" @click="showModal" />
        </div>
        <span class="text-xl italic font-bold hidden md:block">
          {{ t('categories') }}
        </span>
      </div>

      <SharedBaseTable :filter-key="keyword" :columns="colHeader" :rows="categories" :per-page="10" @row-d-b-click="(item) => doubleClickToEdit(item)">
        <template #categoryName="{ item }: any">
          <div class="text-center w-32 md:w-full line-clamp-3 hover:line-clamp-6 flex flex-col items-center">
            {{ item.categoryName }}
          </div>
        </template>
        <template #categoryImage="{ item }: any">
          <div class="text-center flex flex-col items-center">
            <NuxtImg :src="item.categoryImage || no_image" class="h-16 w-full object-contain object-center" />
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
    </div>

    <!-- model create/update category  -->
    <SharedModal v-show="modal" @close="closeModal">
      <template #header>
        {{ formTitle }}
      </template>

      <template #body>
        <form id="category" name="category" @submit.prevent="handleSubmit">
          <div class="space-y-5">
            <SharedInput v-model="editedItem.categoryName" type="text" :label="t('category_name')" />
            <SharedFile :image-selected="selectedImage" @selected-file="(file) => (selectedImage = file)" />
          </div>
        </form>
      </template>

      <template #footer>
        <SharedButton v-if="editIndex > -1" :disabled="loading" :label="t('update')" class="w-full" @click.prevent="handleSubmit" />
        <SharedButton v-else :disabled="loading" :label="t('save')" class="w-full" @click.prevent="handleSubmit" />
      </template>
    </SharedModal>

    <!-- model confirm delete category  -->
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
            {{ t('are_you_sure_to_delete_this_item') }} <strong>"{{ confirmDeleteItem }}" ?</strong>
          </div>
        </div>
      </template>

      <template #footer>
        <SharedButton :disabled="loading" :label="`${t('delete')}`" class="w-full" @click.prevent="handleConfirmedDelete" />
      </template>
    </SharedModal>
  </div>
</template>
