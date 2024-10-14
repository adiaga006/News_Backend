import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://news-backend-i5rtqmmhs-adiaga006s-projects.vercel.app/',  // Backend server của bạn
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
