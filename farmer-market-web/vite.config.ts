import { defineConfig } from 'vite';

const apiTarget = process.env.VITE_API_BASE_URL || 'http://localhost:5155';

export default defineConfig({
  server: {
    port: 4200,
    host: true,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: false
      },
      '/hubs': {
        target: apiTarget,
        changeOrigin: true,
        ws: true
      }
    }
  }
});
