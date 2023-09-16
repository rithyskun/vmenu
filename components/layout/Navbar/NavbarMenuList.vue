<script setup lang="ts">
export interface INavbarList {
  name: string
  to: string
  icon: string
  locale: string
}
defineProps({
  navbarList: {
    type: Array as PropType<INavbarList[]>,
    required: true,
  },
})
const { t } = useI18n()
</script>

<template>
  <NuxtLink
    v-for="nav in navbarList"
    :key="nav.name"
    class="block dark:text-white uppercase px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900"
    active-class="bg-blue-600 text-white dark:bg-blue-600 dark:text-white py-2 px-3 rounded-md"
    :to="nav.to"
  >
    {{ t(nav.locale) }}
  </NuxtLink>
</template>
