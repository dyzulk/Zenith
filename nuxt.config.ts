import { resolve } from 'node:path'
import fs from 'node:fs'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  srcDir: 'app',
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
    '@goxstream/shared': './shared'
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/pusher/8.3.0/pusher.min.js' },
        { src: 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd/ffmpeg.min.js' },
        { src: 'https://unpkg.com/@ffmpeg/util@0.12.6/dist/umd/index.min.js' }
      ]
    }
  },
  nitro: {
    minify: true,
    sourceMap: false,
    // Explicit platform-specific configurations based on PAAS variable
    ...(process.env.PAAS === 'vercel' || process.env.PAAS === 'netlify' ? {
      preset: process.env.PAAS,
      output: {
        dir: '.output',
        publicDir: '.output/public'
      }
    } : {}),
    ...(process.env.PAAS === 'cloudflare-pages' ? {
      preset: 'cloudflare-pages',
      output: {
        dir: 'dist',
        publicDir: 'dist'
      }
    } : {}),
    ...(process.env.PAAS === 'render' ? {
      preset: 'node-server',
      output: {
        dir: '.output',
        publicDir: '.output/public'
      }
    } : {}),
    experimental: {
      wasm: true
    },
    externals: {
      external: ['pusher-js', '@ffmpeg/ffmpeg', '@ffmpeg/util']
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
        external: ['pusher-js', '@ffmpeg/ffmpeg', '@ffmpeg/util'],
        output: {
          globals: {

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

