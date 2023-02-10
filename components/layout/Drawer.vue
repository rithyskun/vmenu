<script setup lang="ts">
import { minNav } from "~~/navigationList";
import { onClickOutside, whenever, useMagicKeys } from "@vueuse/core";

const { t } = useI18n();
defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["closeDrawer"]);

const target = ref(null);
const keys = useMagicKeys();
whenever(keys.escape, () => {
  emit("closeDrawer");
});

onClickOutside(target, () => {
  emit("closeDrawer");
});
</script>

<template>
  <!-- drawer component -->
  <div
    v-show="show"
    ref="target"
    id="drawer-navigation"
    class="fixed top-14 left-0 z-20 h-screen w-60 md:w-72 overflow-y-auto bg-white p-4 dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-navigation-label"
  >
    <h5
      id="drawer-navigation-label"
      class="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
    >
      {{ t("welcome") }}
    </h5>
    <button
      @click="$emit('closeDrawer')"
      type="button"
      data-drawer-hide="drawer-navigation"
      aria-controls="drawer-navigation"
      class="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <Icon name="close" />
      <span class="sr-only">Close menu</span>
    </button>
    <div class="overflow-y-auto py-4">
      <ul class="space-y-2">
        <NuxtLink
          v-for="nav in minNav"
          :to="nav.to"
          active-class="bg-blue-200"
          class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <Icon :name="nav.icon" />
          <span class="ml-3">{{ t(nav.locale) }}</span>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>
