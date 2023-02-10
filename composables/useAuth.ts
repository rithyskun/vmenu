import { ILogin, IResponseLogin, IRegister } from './../types/types';
import jwt_decode, { JwtPayload }from 'jwt-decode'
import { resolve } from 'path';

type jwtToken = JwtPayload & {
    name: string;
    exp: number;
}

export default () => {

    const useAuthToken = () => useState<string>('auth_token')
    const useAuthUser = () => useState<object>('auth_user')
    const useAuthLoading = () => useState<boolean>('auth_loading', () => true)

    const setToken = (newToken: string) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser: IResponseLogin['user']) => {
        const authUser = useAuthUser()
        authUser.value = newUser
    }

    const setIsAuthLoading = (value: boolean) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

    const register = ({name, email, password, repeatPassword}: IRegister) => {
        return new Promise( async (resolve, reject) => {
            try {
                const data: IRegister = await $fetch('/api/auth/register', {
                    method: 'POST',
                    body: {
                        name,
                        email,
                        password,
                        repeatPassword
                    }
                })
                if(data) {
                    navigateTo('/')
                }
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const login = ({email, password}: ILogin) => {
        return new Promise( async (resovle, reject) => {
            try {
                const data: IResponseLogin = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        email,
                        password
                    }
                })
                
                setToken(data.access_token)
                setUser(data.user)

                resovle(true)
                
            } catch (error) {
                reject(error)
            }
        })
    }

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data: IResponseLogin = await $fetch('/api/auth/refresh')
                setToken(data.access_token)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getUser = () => {
        return new Promise( async (resolve , reject) => {
            try {
                const data = await useFetchApi('/api/auth/user') as IResponseLogin
                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const reRefreshToken = () => {
        const authToken = useAuthToken()

        if(!authToken.value) {
            return
        }

        const jwt = jwt_decode<jwtToken>(authToken.value)
        const newRefreshTime = jwt.exp - 60000
        setTimeout( async () => {
            await refreshToken()
            reRefreshToken()
        }, newRefreshTime)

    }

    const initAuth = () => {
        return new Promise( async (resolve, reject) => {
            setIsAuthLoading(true)
            try {
                await refreshToken()
                await getUser()

                reRefreshToken()

                resolve(true)
                
            } catch (error) {
                reject(error)
            }
        })
    }

    const logout = () => {
        return new Promise( async(resolve, reject) => {
            try {
                await useFetchApi('/api/auth/logout', {
                    method: 'POST'
                })
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    return {
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        useAuthLoading,
        logout,
        register,
        getUser
    }
}