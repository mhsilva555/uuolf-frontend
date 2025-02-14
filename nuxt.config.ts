// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/css/app.css',
    'primeicons/primeicons.css'
  ],
  app: {
    head: {
      link: [
        {rel: "stylesheet", href: "https://atugatran.github.io/FontAwesome6Pro/css/all.min.css"},
      ],
    }
  },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  primevue: {
    autoImport: true,
    autoload: true,
    options: {
      ripple: true,
      theme: {
        preset: Aura
      }
    }
  },
  plugins: [
      '~/plugins/pinia-plugin.js'
  ],
  googleFonts: {
    families: {
      Poppins: true,
      Arima: true,
    },
    display: 'swap',
    subsets: 'latin'
  },
  icon: {
    serverBundle: {
      collections: ['mdi']
    }
  }
})
