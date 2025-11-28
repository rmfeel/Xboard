import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true, // Generate manifest.json to map hashed filenames
    rollupOptions: {
      output: {
        manualChunks: undefined, // Default splitting
      }
    }
  }
})
