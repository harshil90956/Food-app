import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173, // Render dynamically assigns the port
  },
};
