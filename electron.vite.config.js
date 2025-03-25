// electron.vite.config.js
export default {
  main: {
    // vite config options
  },
  preload: {
    // vite config options
  },
  renderer: {
    // vite config options
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    tailwindcss()
  ]
}