import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all IP addresses
    port: 5173,       // The port number to listen on
    strictPort: true, // Fail if the port is already in use
  },
})
