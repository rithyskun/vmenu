import { useNProgress } from '@vueuse/integrations/useNProgress'

export default (loading: boolean) => {
  const { isLoading } = useNProgress()

  return isLoading.value = loading
}
