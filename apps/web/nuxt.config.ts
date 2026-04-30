// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      streamWorkerUrl: process.env.NUXT_PUBLIC_STREAM_WORKER_URL || 'http://localhost:8787',
      googleEnabled: !!process.env.GOOGLE_CLIENT_ID,
      facebookEnabled: !!process.env.FACEBOOK_CLIENT_ID
    }
  }
})
