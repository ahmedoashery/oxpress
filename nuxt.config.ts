// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET
  },
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth', "@nuxt/image"],
  build: {
    transpile: ['jsonwebtoken']
  },
  auth: {
    baseUrl: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },
})