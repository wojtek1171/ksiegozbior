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
    /* */
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },
  css: ['~/layouts/global.scss'],
});
