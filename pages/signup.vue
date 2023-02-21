<script setup lang="ts">
import { useUserStore } from '~~/stores/auth'

const useAuth = useUserStore()

interface UserRegister {
  name: string
  email: string
  password: string
  repeatPassword: string
  loading: boolean
}

const term = ref<boolean>(false)
const user = reactive<UserRegister>({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  loading: false,
})

const validationError = ref<string>('')

const handleRegister = async () => {
  if (!user.email || !user.password || !user.repeatPassword) {
    validationError.value = 'Field is required'
    setTimeout(() => {
      validationError.value = ''
    }, 2000)
    return
  }

  if (user.password !== user.repeatPassword) {
    validationError.value = 'Password do not match'
    setTimeout(() => {
      validationError.value = ''
    }, 2000)
    return
  }
  user.loading = true
  try {
    await useAuth.register({
      name: user.name,
      email: user.email,
      password: user.password,
      repeatPassword: user.repeatPassword,
    })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    user.loading = false
  }
}
</script>

<template>
  <div>
    <section class="bg-white dark:bg-dim-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="w-full bg-white rounded-md-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create and account
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleRegister">
              <SharedInput v-model="user.name" type="text" label="Name" placeholder="Name" />
              <SharedInput v-model="user.email" type="text" label="Email" placeholder="Email" />
              <SharedInput v-model="user.password" type="password" label="Password" placeholder="Password" />
              <SharedInput v-model="user.repeatPassword" type="password" label="Confirm Password" placeholder="Confirm Password" :validation="validationError" />
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms" v-model="term" aria-describedby="terms" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded-md bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  >
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the
                    <a
                      class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      href="#"
                    >Terms and Conditions</a></label>
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
                an account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a
                  href="/login"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Sign in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
