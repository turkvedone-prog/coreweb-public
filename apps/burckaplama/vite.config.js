import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  resolve: {
    alias: {
      '../../layouts/SiteLayout': path.resolve(__dirname, './src/layouts/SiteLayout.jsx'),
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
