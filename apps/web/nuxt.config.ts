// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirect: false
  },
  devServer: {
    port: 3000
  },
  runtimeConfig: {
    public: {
      webUrl: process.env.NUXT_PUBLIC_WEB_URL || 'http://localhost:3000',
      adminUrl: process.env.NUXT_PUBLIC_ADMIN_URL || 'http://localhost:3001',
      streamWorkerUrl: '/api/stream/sign',
      googleEnabled: !!process.env.GOOGLE_CLIENT_ID,
      facebookEnabled: !!process.env.FACEBOOK_CLIENT_ID
    }
  }
})
