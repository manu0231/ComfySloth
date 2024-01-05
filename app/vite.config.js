import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // '/api': 'http://localhost:3000',
      '/api': 'https://storeserver-production-bc7e.up.railway.app',
    },
  },
  plugins: [react()],
  // some other configuration
})
