export const isLoading = () => useState<boolean>('loading', () => false)
export default (item: boolean) => {
  const loading = isLoading()
  return loading.value = item
}
