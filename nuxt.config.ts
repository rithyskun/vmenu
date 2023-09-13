// https://nuxt.com/docs/api/configuration/nuxt-config
import en from './locale/en.json'
import km from './locale/km.json'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    ['@nuxtjs/google-fonts', {
      families: {
        'Inter': [100, 200, 300, 400, 500],
        'Noto Sans Khmer': [100, 200, 300, 400, 500],
      },
    }],
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en,
        km,
      },
    },
  },
  colorMode: {
    fallback: 'dark',
    classSuffix: '',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    database: process.env.DATABASE_URL,
    jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
    jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
    jwtExpiredIn: process.env.JWT_EXPIRED_IN,
    jwtRefreshExpiredIn: process.env.JWT_REFRESH_EXPIRED_IN,
    cloudinayCloudName: process.env.CLOUDINAY_CLOUD_NAME,
    cloudinayApiKey: process.env.CLOUDINAY_API_KEY,
    cloudinayApiSecret: process.env.CLOUDINAY_API_SECRET,
  },
})
