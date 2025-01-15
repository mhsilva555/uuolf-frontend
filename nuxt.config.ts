// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/css/app.css'
  ],
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
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
