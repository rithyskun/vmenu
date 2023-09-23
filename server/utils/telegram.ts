export class TelegramService {
  constructor() {}

  static async sendMessage(message: string) {
    const config = useRuntimeConfig()
    const telegram_token = config.telegramToken
    const telegram_chat_id = config.telegramChatId

    const baseURL = `https://api.telegram.org/bot${telegram_token}/sendMessage?chat_id=${telegram_chat_id}&text=${message}`

    return await $fetch(baseURL).catch((error: any) => console.error('Something went wrong when trying to send a Telegram notification', error))
  }
}
