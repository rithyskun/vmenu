<script setup lang="ts">

const { useAuthUser } = useAuth()
const user = useAuthUser()

</script>

<template>
    <NuxtLayout name="default">
        <nav class="bg-white border-gray-200 px-2 md:px-4 py-2.5 dark:bg-gray-900">
            <div class="flex flex-wrap items-center justify-end max-w-screen-xl mx-auto">
                <div class="flex items-center md:order-2">
                    <div v-if="user">
                        <NuxtLink to="/admin"
                            class="text-gray-800 cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            <Icon name="setting" />
                        </NuxtLink>
                    </div>
                    <div v-else>
                        <NuxtLink to="/login"
                            class="text-gray-800 cursor-pointer dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            <Icon name="user" />
                        </NuxtLink>
                    </div>
                    
                    <button data-collapse-toggle="mega-menu" type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mega-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <Cart />
            </div>
        </nav>
    </NuxtLayout>
</template>
