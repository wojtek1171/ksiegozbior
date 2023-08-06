// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-quasar-ui', 'nuxt-mongoose', '@vite-pwa/nuxt'],
  plugins: [{ src: '~/plugins/apexcharts.client.js', mode: 'client' }],
  pwa: {
    manifest: {
      name: 'Ksiegozbior',
      short_name: 'Ksiegozbior',
      description: 'Aplikacja do katalogowania ksiegozbioru',
      icons: [
        {
          src: 'icons/icon_64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'icons/icon_144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'icons/icon_192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon_512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  runtimeConfig: {
    public: {
      token: process.env.TOKEN,
    },
  },
  quasar: {
    lang: 'pl',
    config: {
      brand: {
        primary: '#0e68c9',
        secondary: '#26A69A',
        accent: '#9C27B0',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
      },
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },
  css: ['~/layouts/global.scss'],
  devServerHandlers: [],
});
