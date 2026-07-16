import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  base: '/recalls',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/context': path.resolve(__dirname, './src/context'),
      '@/helpers': path.resolve(__dirname, './src/helpers'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    allowedHosts: ['cofasv38.franklin-gov.com', 'istest.franklintn.gov', 'dev.franklintn.gov', 'fireapps.franklintn.gov']
  }
})
