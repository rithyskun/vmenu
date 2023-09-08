/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans Khmer', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dim: {
          50: '#5F99F7',
          100: '#5F99F7',
          200: '#38444d',
          300: '#202e3a',
          400: '#253341',
          500: '#5F99F7',
          600: '#5F99F7',
          700: '#192734',
          800: '#162d40',
          900: '#15202b',
        },
      },
    },
  },
  darkMode: 'class',
  safelist: [
    {
      pattern: /text-(red|green|blue)-(100|400)/,
      variants: ['group-hover'],
    },
    {
      pattern: /bg-(red|green|blue)-(100|400)/,
      variants: ['group-hover'],
    },
  ],
  plugins: [require('@tailwindcss/forms')],
}
