import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.MID", "**/*.png","**/*.ogg"],
  server: {
    port: 3000, // Change the port if needed
  },
  define: {
    'process.env': {}, // Ensures compatibility with process.env
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Allows you to use '@/components' instead of '../../../components'
    },
  },
  build: {
    outDir: 'build',  // Change from 'dist' to 'build'
  },
});
