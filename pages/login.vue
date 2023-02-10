<script setup lang="ts">

const user = reactive({
    email: "",
    password: "",
    loading: false
})

const validationError = ref<string>("")

const handleRegister = async () => {
    const { login } = useAuth()

    if (!user.email || !user.password) {
        validationError.value = "Field is required"
        setTimeout(() => {
            validationError.value = ""
        }, 2000)
        return
    }

    user.loading = true
    try {
        await login({
            email: user.email,
            password: user.password
        })
    } catch (error) {
        console.error(error)
    } finally {
        navigateTo('/admin')
        user.loading = false
    }
};


</script>

<template>
    <section class="bg-white dark:bg-dim-900">

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div v-if="user.loading">
                <SharedSpinner />
            </div>
            <div v-else
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="handleRegister">
                        <SharedInput label="Email Address" v-model="user.email" placeholder="Email address"
                            :validation="validationError" type="text" />
                        <SharedInput label="Password" v-model="user.password" placeholder="Password" type="password"
                            :validation="validationError" />

                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#"
                                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot
                                password?</a>
                        </div>

                        <SharedButton :disable="user.loading" label="Sign in" type="submit" :disabled="user.loading" />
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?
                            <a href="/signup" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign
                                up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
