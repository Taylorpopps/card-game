import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router',  '@vueuse/core', '@vueuse/math'],
      vueTemplate: true,
    }),
  ],
  define: { 'process.env': {
    "VUE_APP_ENVIRONMENT": "production",
    "VUE_APP_API_URL": "http://127.0.0.1:8000/"
  } },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url))
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    entries: [
      './src/**/*.vue',
    ],
  },
})
