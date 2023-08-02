// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-quasar-ui', 'nuxt-mongoose'],
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
});
