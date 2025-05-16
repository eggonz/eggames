import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/eggames/",
  css: {
    modules: {
      localsConvention: 'camelCase', // Ensures camelCase class names
    },
  }
})
