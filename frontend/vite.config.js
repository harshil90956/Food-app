// vite.config.js
export default {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173 // Render dynamically assigns the port
  }
}
