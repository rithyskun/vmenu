export default defineNuxtRouteMiddleware(async (to, from) => {
    const { useAuthUser } = useAuth()
    const user = useAuthUser()
    
    if (!user) {
        return navigateTo('/login')
    }
})