import { resolve } from 'node:path'
import fs from 'node:fs'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },
  ui: {
    primary: 'green'
  },
  css: ['~/assets/css/main.css'],
  alias: {
    '~shared': './shared',
    '@zenith/shared': './shared'
  },
  nitro: {
    preset: 'cloudflare-module',
    durableObjects: {
      CommentRoom: './server/utils/CommentRoom'
    },
    hooks: {
      'compiled': async (nitro) => {
        const filePath = resolve(nitro.options.output.serverDir, 'index.mjs');
        await fs.promises.appendFile(filePath, '\nexport const CommentRoom = globalThis.CommentRoom;');
      }
    }
  },
  vite: {
    worker: {
      format: 'es'
    }
  },
  devServer: {
    port: 3000
  },
  runtimeConfig: {
    public: {
      webUrl: process.env.NUXT_PUBLIC_WEB_URL || 'http://localhost:3000',
      streamWorkerUrl: '/api/stream/sign',
      googleEnabled: !!process.env.GOOGLE_CLIENT_ID,
      facebookEnabled: !!process.env.FACEBOOK_CLIENT_ID
    }
  }
})

