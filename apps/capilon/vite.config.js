import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  resolve: {
    alias: {
      '../../layouts/SiteLayout': path.resolve(__dirname, './src/layouts/SiteLayout.jsx'),
      '../../utils/seo': path.resolve(__dirname, '../../packages/shared-ui/src/utils/seo.js'),
      '../../utils/i18nContent': path.resolve(__dirname, '../../packages/shared-ui/src/utils/i18nContent.js'),
      '../../services/publicContentService': path.resolve(__dirname, '../../packages/shared-ui/src/services/publicContentService.js'),
      '../services/publicContentService': path.resolve(__dirname, '../../packages/shared-ui/src/services/publicContentService.js')
    }
  }
})
