<script setup lang="ts">
interface Upload {
  url?: string
  secure_url?: string
}

const props = defineProps({
  imageSelected: {
    type: String,
  },
})
const emit = defineEmits(['selectedFile'])

const loading = ref<boolean>(false)
const file = ref()
const formData = ref()

const prepareFormData = () => {
  formData.value = new FormData()
  formData.value.append('file', file.value)
}

const handleImageChange = async (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target && target.files)
    file.value = target.files[0]

  prepareFormData()
  loading.value = true
  try {
    const upload = await useFetchApi('/api/upload', {
      method: 'POST',
      body: formData.value,
    }) as Upload
    emit('selectedFile', upload?.secure_url)
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
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-md-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div v-if="loading">
        <SharedSpinner />
      </div>
      <div v-else-if="props.imageSelected">
        <NuxtImg :src="props.imageSelected" class="w-56 h-56" alt="CloudImg" />
      </div>
      <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
        <Icon name="upload" size="56" />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or
          drag and drop</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>

      <input id="dropzone-file" accept="image/*" type="file" class="hidden" @change="handleImageChange">
    </label>
  </div>
</template>
