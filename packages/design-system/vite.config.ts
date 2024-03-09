import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'design-system',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      input: './src/index.ts',
      external: ['react', 'react-dom'],
    },
  },
  plugins: [react(), tsconfigPaths()],
});
