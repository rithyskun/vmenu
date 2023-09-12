<script setup lang="ts">
import { navbarList } from '~~/navigationList'
import { useUserStore } from '~~/stores/auth'

const user = useUserStore()
const { t } = useI18n()
const isMobile = ref<boolean>(false)

const close = () => {
  isMobile.value = false
}

const handleLogout = async () => {
  user.logout()
  user.$reset()
  navigateTo('/')
}
</script>

<template>
  <nav class="bg-white top-0 z-40 sticky mx-auto border-gray-200 py-2.5 rounded-md dark:bg-dim-900">
    <div class="flex flex-wrap items-center justify-between md:justify-end mx-3">
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        class="inline-flex items-center p-2 text-sm text-gray-500 hover:bg-gray-100  dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        @click="isMobile = !isMobile"
      >
        <span class="sr-only">Open main menu</span>
        <Icon :name="!isMobile ? 'menu' : 'menuOpen'" />
      </button>
      <div id="navbar-sticky" class="hidden w-full md:block md:w-auto">
        <ul
          class="flex space-x-2 flex-col items-center justify-center text-center md:flex-row md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700"
        >
          <NuxtLink
            v-for="nav in navbarList"
            :key="nav.name"
            class="block dark:text-white uppercase px-3 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900"
            active-class="bg-blue-600 text-white dark:bg-blue-600 dark:text-white py-2.5 px-3 rounded-md"
            :to="nav.to"
          >
            {{ t(nav.locale) }}
          </NuxtLink>

          <div class="flex items-center gap-5">
            <SharedTooltip custom-style="right-5 mt-5">
              <layout-locale />
              <template #tooltip>
                {{ t('locale') }}
              </template>
            </SharedTooltip>

            <SharedTooltip custom-style="right-5 mt-5">
              <layout-dark />
              <template #tooltip>
                {{ t('dark_mode') }}
              </template>
            </SharedTooltip>

            <SharedTooltip custom-style="right-5 mt-5">
              <layout-logout @click="handleLogout" />
              <template #tooltip>
                {{ t('signout') }}
              </template>
            </SharedTooltip>
          </div>
        </ul>
      </div>
      <div class="flex space-x-2 md:hidden lg:hidden">
        <layout-locale />
        <layout-dark />
      </div>
    </div>
  </nav>
  <LayoutDrawer :show="isMobile" @close-drawer="close" />
</template>
