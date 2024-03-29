import { acceptHMRUpdate, defineStore } from 'pinia'
import type { JwtPayload } from 'jwt-decode'
import jwt_decode from 'jwt-decode'
import type { ILogin, IRegister, IResponseLogin } from '../types'

type jwtToken = JwtPayload & {
  name: string
  exp: number
}

interface State {
  auth_token: string | undefined
  auth_user: object
  auth_loading: boolean
}

export const useUserStore = defineStore('auth', {
  state: (): State => {
    return {
      auth_token: undefined,
      auth_user: {},
      auth_loading: false,
    }
  },
  actions: {
    setToken(newToken: string) {
      this.auth_token = newToken
    },
    setUser(newUser: object = {}) {
      this.auth_user = newUser
    },
    setIsAuthLoading(value: boolean) {
      this.auth_loading = value
    },
    async register({ name, email, password, repeatPassword }: IRegister) {
      try {
        await $fetch('/api/auth/register', {
          method: 'POST',
          body: {
            name, email, password, repeatPassword,
          },
        })
        useSnackbar({
          show: true,
          text: `The email '${email}' has been registered.`,
          color: 'success',
        })
        navigateTo('/')
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
      }
    },
    async login({ email, password }: ILogin) {
      try {
        const { access_token, user } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email, password,
          },
        })

        this.setToken(access_token)
        this.setUser(user)
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
      }
    },
    async refreshToken() {
      try {
        const { access_token } = await $fetch('/api/auth/refresh')

        this.setToken(access_token)
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
      }
    },
    async getUser() {
      try {
        const data = await useFetchApi('/api/auth/user') as IResponseLogin
        this.setUser(data.user)
      }
      catch (error: any) {
        useSnackbar({
          show: true,
          text: error.statusMessage || error.message || error,
          color: 'error',
        })
        navigateTo('/login')
      }
    },
    reRefreshToken() {
      const token = this.auth_token
      if (!token)
        return

      const jwt = jwt_decode<jwtToken>(token)
      const newRefreshTime = jwt.exp - 60000

      setTimeout(async () => {
        await this.refreshToken()
        this.reRefreshToken()
      }, newRefreshTime)
    },
    async initAuth() {
      this.setIsAuthLoading(true)
      try {
        await this.refreshToken()
        await this.getUser()
        this.reRefreshToken()
      }
      catch (error) {
        console.error(error)
      }
      finally {
        this.setIsAuthLoading(false)
      }
    },
    async logout() {
      try {
        await useFetchApi('/api/auth/logout', {
          method: 'POST',
        })
      }
      catch (error) {
        console.error(error)
      }
    },
  },
  getters: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
