<script setup lang="ts">
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'
import { mobileNavbarList } from '~~/navigationList'

defineProps({
  show: {
    type: Boolean,
  },
})

const emit = defineEmits(['closeDrawer'])
const { t } = useI18n()
const target = ref(null)
const keys = useMagicKeys()
whenever(keys.escape, () => {
  emit('closeDrawer')
})

onClickOutside(target, () => {
  emit('closeDrawer')
})
</script>

<template>
  <!-- drawer component -->
  <div
    v-show="show" id="drawer-navigation" ref="target"
    class="fixed border top-14 left-0 z-20 h-screen w-60 md:w-72 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-800" tabindex="-1"
    aria-labelledby="drawer-navigation-label"
  >
    <h5 id="drawer-navigation-label" class="text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
      {{ t("welcome") }}
    </h5>
    <button
      type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
      class="absolute top-2.5 right-2.5 inline-flex items-center rounded-md bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      @click="$emit('closeDrawer')"
    >
      <Icon name="close" />
      <span class="sr-only">Close menu</span>
    </button>
    <div class="overflow-y-auto py-4">
      <ul class="space-y-2">
        <NuxtLink
          v-for="(nav, index) in mobileNavbarList" :key="index" :to="nav.to" active-class="bg-blue-200"
          class="flex items-center rounded-md p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <Icon :name="nav.icon" />
          <span class="ml-3">{{ t(nav.locale) }}</span>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>
