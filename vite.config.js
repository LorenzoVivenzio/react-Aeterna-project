import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Quando React chiama /api, Vite lo gira a Express (porta 3001)
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // Facciamo lo stesso per le immagini se sono servite da Express
      '/img': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})