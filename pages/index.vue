<script setup lang="ts">
import { useUserStore } from '~/stores/auth'

const user = useUserStore()
</script>

<template>
  <NuxtLayout name="default">
    <nav class="bg-white overflow-auto border-gray-200 px-2 md:px-4 py-2.5 dark:bg-dim-900">
      <div class="flex flex-wrap items-center justify-end max-w-screen-xl mx-auto">
        <div class="flex items-center md:order-2">
          <div v-if="user.auth_token">
            <NuxtLink
              to="/admin"
              class="text-gray-800 hidden md:block cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-md-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <Icon name="setting" />
            </NuxtLink>
          </div>
          <div v-else>
            <NuxtLink
              to="/login"
              class="text-gray-800 cursor-pointer hidden md:block dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-md-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <Icon name="user" />
            </NuxtLink>
          </div>

          <NuxtLink
            to="/admin"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-md-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open main menu</span>
            <Icon name="setting" />
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-rows-3 md:grid-rows-1 grid-flow-col gap-5">
        <Cart />
      </div>
    </nav>
  </NuxtLayout>
</template>
