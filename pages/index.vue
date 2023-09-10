<script setup lang="ts">
import { useUserStore } from '~/stores/auth'

const { t } = useI18n()

const search = ref<string>('')

const user = useUserStore()
</script>

<template>
  <NuxtLayout name="default">
    <nav class="flex flex-wrap sticky top-0 z-40 items-center justify-between max-w-screen-xl mx-auto">
      <div class="flex items-center p-2">
        <label for="search" class="sr-only">Search</label>
        <div class="relative w-full">
          <Icon name="search" class="absolute mt-3.5 ml-3 text-gray-500" size="16" />
          <input id="search" v-model="search" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="t('search')" required>
        </div>
      </div>
      <div class="flex items-center md:order-2">
        <div class="flex justify-center flex-row text-center items-center gap-5">
          <LayoutLocale />
          <LayoutDark />
          <div v-if="user.auth_token">
            <NuxtLink
              to="/admin/products"
              class="text-gray-800 hidden md:block cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-md-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <Icon name="setting" size="18" />
            </NuxtLink>
          </div>
          <div v-else>
            <NuxtLink
              to="/login"
              class="text-gray-800 cursor-pointer hidden md:block dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-md-lg text-sm px-3 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <Icon name="user" size="18" />
            </NuxtLink>
          </div>
        </div>
        <NuxtLink
          to="/admin/products"
          class="inline-flex items-center mt-1 mr-2 text-sm text-gray-500 rounded-md-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open main menu</span>
          <Icon name="setting" size="18" />
        </NuxtLink>
      </div>
    </nav>
    <div class="bg-white overflow-auto border-gray-200 px-2 md:px-4 py-2.5 dark:bg-dim-900">
      <div class="grid grid-rows-3 md:grid-rows-1 grid-flow-col">
        <PageBody />
      </div>
    </div>
  </NuxtLayout>
</template>
