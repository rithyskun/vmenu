interface ISnackbar {
  show: boolean
  text: string
  color: string
}

export const useShow = () => useState<boolean>('show', () => false)
export const useText = () => useState<string>('text', () => '')
export const useColor = () => useState<string>('color', () => '')

export default (payload: ISnackbar) => {
  const show = useShow()
  const text = useText()
  const color = useColor()
  show.value = payload.show
  text.value = payload.text
  color.value = payload.color
}
