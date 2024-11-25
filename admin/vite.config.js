import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4174, // Render dynamically assigns the port
  },
<<<<<<< HEAD
};
=======
};
>>>>>>> 3f31545923e748d4310b887d347a6eddb05608e1
