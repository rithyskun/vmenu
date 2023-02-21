/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
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
      xs: '614px',
      sm: '768px',
      md: '1022px',
      lg: '1092px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans Khmer', ...defaultTheme.fontFamily.sans],
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
      animation: {
        torch: 'torch 5s infinite',
      },
      keyframes: {
        torch: {
          from: {
            backgroundPosition: '-100% 0',
          },
        },
        to: {
          backgroundPosition: '200% 0',
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
  varients: {
    extend: {
      lineClamp: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
