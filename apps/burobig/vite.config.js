import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [react()],
  resolve: {
    alias: {
      '../../layouts/SiteLayout': path.resolve('./src/layouts/SiteLayout.jsx'),
      '../../utils/seo': '@coreweb/shared-ui',
      '../../utils/i18nContent': '@coreweb/shared-ui',
      '../../services/publicContentService': '@coreweb/shared-ui'
    }
  }
})
