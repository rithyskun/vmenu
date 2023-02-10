<script setup lang="ts">
import { menu } from '~~/navigationList'
import { useSidebarStore } from '../../stores/sidebar'

const store = useSidebarStore()

const { t } = useI18n()
</script>

<template>
  <div
    class="fixed top-18 -left-[220px] z-10 h-screen w-[220px] overflow-y-auto whitespace-normal bg-white shadow transition-all duration-300 dark:bg-gray-900"
    :class="{ '!left-0': store.sidebar }"
  >
    <div class="w-full px-3 text-xs">
      <NuxtLink class="nav-link">
        <div class="flex items-center mt-2">
          <Icon name="folder" />
          <span class="ml-3">Demo</span>
        </div>
      </NuxtLink>
      <ul class="space-y-1 p-2">
        <NuxtLink
          v-for="nav in menu"
          :to="nav.to"
          active-class="bg-blue-200 dark:bg-gray-500"
          class="flex items-center hover:bg-gray-200 rounded-lg p-2 text-base font-normal text-gray-900 dark:text-white dark:hover:bg-gray-700"
        >
          <Icon :name="nav.icon" size="16" />
          <span class="ml-3 text-xs">{{ t(nav.locale) }}</span>
        </NuxtLink>
      </ul>

      
    </div>
  </div>
</template>
