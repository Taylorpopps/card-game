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
    "VUE_APP_API_URL": "https://preview.wem.io/51968/webservices/api/",
    "VUE_USER": "Admin",
    "VUE_PASSWORD": "test1234"
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
