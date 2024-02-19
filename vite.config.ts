import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/components/common'),
      '@foundation': path.resolve(__dirname, './src/components/foundation'),
      '@components': path.resolve(__dirname, './src/components'),
      '@page': path.resolve(__dirname, './src/page'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@atoms': path.resolve(__dirname, './src/atoms'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
  server: {
    port: 3000,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
    proxy: {
      '/api': {
        target: 'https://dev.gomterview.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 75,
      },
      include: /\.(png|jpe?g|gif|svg|webp)$/i,
      exclude: /node_modules/,
    }),
  ],
});
