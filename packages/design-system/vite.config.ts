import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'design-system',
      fileName: 'index',
    },
    rollupOptions: {
      input: './src/index.ts',
      external: ['react', 'react-dom'],
    },
  },
  resolve: {
    preserveSymlinks: true,
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
    tsconfigPaths(),
  ],
});
