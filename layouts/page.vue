<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar";

const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const user = useAuthUser()

const store = useSidebarStore();

onBeforeMount(() => {
    initAuth()
})

</script>

<template>
    <div class="dark:bg-dim-900" v-if="user">
        <LayoutNavbar />
        <LayoutSidebar />
        <div class="mx-5 z-40 absolute">
            <div :class="{ '!ml-[0px]': store.sidebar }">
                <Icon name="sidebar" size="20"
                    class="hover:cursor-pointer text-gray-300 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
                    :class="
                        store.sidebar
                            ? ' hover:text-blue-500'
                            : 'rotate-180 hover:text-blue-500'
                    " @click="store.toggleSidebar" />
            </div>
        </div>
        <div class="w-full bg-gray-200">
            <slot />
        </div>
    </div>
</template>