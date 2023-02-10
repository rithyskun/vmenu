<template>
    <div v-if="user">
        <NuxtLayout name="page">
            <div class="dark:bg-gray-900 dark:text-white">
                <NuxtPage />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['authorised']
})

const { initAuth, useAuthUser } = useAuth()
const user = useAuthUser()

onBeforeMount(() => {
    initAuth()
})

</script>