import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { name, version } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/eggames/",
  css: {
    modules: {
      localsConvention: 'camelCase', // Ensures camelCase class names
    },
  },
  define: {
    __APP_NAME__: JSON.stringify(name),
    __APP_VERSION__: JSON.stringify(version),
  }
})
