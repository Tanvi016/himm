import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['notebook.png', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Himm Scrapbook',
        short_name: 'Himm',
        description: 'A romantic digital scrapbook for Himm',
        theme_color: '#F8F2EA',
        background_color: '#F8F2EA',
        display: 'standalone',
        icons: [
          {
            src: 'notebook.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'notebook.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'notebook.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
