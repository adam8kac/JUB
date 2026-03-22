import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        mfe_auth: 'http://localhost:5001/assets/remoteEntry.js',
        mfe_jobs: 'http://localhost:5002/assets/remoteEntry.js',
        mfe_cv: 'http://localhost:5003/assets/remoteEntry.js',
        mfe_hub: 'http://localhost:5004/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
