import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false, // don't try to load .map files for deps
    },
  },
  build: {
    sourcemap: false, // don't generate sourcemaps for your own code
  },
})
