import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4200,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5155',
        changeOrigin: true,
        secure: false
      },
      '/hubs': {
        target: 'http://localhost:5155',
        changeOrigin: true,
        ws: true
      }
    }
  }
});
