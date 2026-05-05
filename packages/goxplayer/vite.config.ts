import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GoxPlayer',
      fileName: (format) => `goxplayer.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'lucide-vue-next', 'hls.js'],
      output: {
        globals: {
          vue: 'Vue',
          'lucide-vue-next': 'LucideVueNext',
          'hls.js': 'Hls',
        },
      },
    },
  },
})
