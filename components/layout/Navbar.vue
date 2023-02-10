<script setup lang="ts">
import { mainNav } from '~~/navigationList'
const { logout } = useAuth()
const { t } = useI18n()
const isMobile = ref<boolean>(false)

const close = () => {
  isMobile.value = false
}

const handleLogout = () => {
    logout()
    navigateTo('/')
}

</script>

<template>
  <nav class="bg-white border-gray-200 sm:px-4 py-2.5 rounded dark:bg-dim-900">
    <div class="container flex flex-wrap items-center justify-between px-3">
      <a href="/" class="items-center hidden md:flex">
        <span
          class="self-center text-xl mr-5 font-semibold whitespace-nowrap dark:text-white"
          >@R
          <strong class="font-mono italic text-cyan-500">S</strong></span
        >
      </a>

      <button
        @click="isMobile = !isMobile"
        data-collapse-toggle="navbar-sticky"
        type="button"
        class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <Icon name="menu" />
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-sticky">
        <ul
          class="flex space-x-2 flex-col items-center justify-center text-center md:flex-row md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700"
        >
          <NuxtLink
            class="block dark:bg-gray-900 dark:text-white uppercase px-3 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            active-class="dark:bg-white bg-gray-500 text-white bg-cyan-500 dark:text-gray-900 py-2.5 px-3 rounded-full"
            v-for="nav in mainNav"
            :key="nav.name"
            :to="nav.to"
            >{{ t(nav.locale) }}</NuxtLink
          >

          <div class="flex items-center gap-5">
            <layout-locale />

            <layout-dark />

            <layout-logout @click="handleLogout" />
          </div>
        </ul>
      </div>
      <div class="flex space-x-2 md:hidden lg:hidden">
        <layout-locale />
        <layout-dark />
      </div>
    </div>
  </nav>
  <LayoutDrawer :show="isMobile" @closeDrawer="close" />
</template>
