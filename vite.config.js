import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    entries: ['index.html']
  },
  server: {
    port: 3000,
    open: false,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
});
