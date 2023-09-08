import { useUserStore } from './../stores/auth'
export default (url: string, options: any = {}) => {
  const user = useUserStore()
  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${user.auth_token}`,
    },
  })
}
