import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Hadith-Web-App/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'data/collections.json', 'data/topics.json', 'data/hadiths.json'],
      manifest: {
        name: 'HadithDB - Kutub al-Sittah',
        short_name: 'HadithDB',
        description: 'Explore the six most authentic hadith collections with translations',
        theme_color: '#091A12',
        background_color: '#091A12',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})
