import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    tailwindcss()
  ],
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {}
})
