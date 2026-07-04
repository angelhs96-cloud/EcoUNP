import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // 👇 Esta es la línea clave para GitHub Pages. 
    // Si tu repositorio en GitHub se llama exactamente "EcoUNP", déjalo así. 
    // Si lo llamaste diferente, pon el nombre exacto entre las barras.


    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: ['pyromania-mortician-tug.ngrok-free.dev'],
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});