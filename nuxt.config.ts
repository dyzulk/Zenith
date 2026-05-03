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
  app: {
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.8/hls.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/pusher/8.3.0/pusher.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/umd/ffmpeg.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.2/dist/umd/index.min.js' }
      ]
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET,
    minify: true,
    sourceMap: false,
    experimental: {
      wasm: true
    },
    prerender: {
      routes: ['/']
    },
    alias: {
      'pg-native': resolve(__dirname, 'server/utils/pg-mock.ts')
    },
    externals: {
      inline: ['@prisma/adapter-pg', 'pg'],
      external: ['hls.js', 'pusher-js', '@ffmpeg/ffmpeg', '@ffmpeg/util']
    },
    esbuild: {
      options: {
        target: 'esnext',
        minify: true
      }
    }
  },
  vite: {
    assetsInclude: ['**/*.pem'],
    worker: {
      format: 'es'
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        external: ['hls.js', 'pusher-js', '@ffmpeg/ffmpeg', '@ffmpeg/util'],
        output: {
          globals: {
            'hls.js': 'Hls',
            'pusher-js': 'Pusher',
            '@ffmpeg/ffmpeg': 'FFmpeg',
            '@ffmpeg/util': 'FFmpegUtil'
          }
        }
      }
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
      facebookEnabled: !!process.env.FACEBOOK_CLIENT_ID,
      pusherKey: process.env.PUSHER_KEY,
      pusherCluster: process.env.PUSHER_CLUSTER
    }
  }
})

