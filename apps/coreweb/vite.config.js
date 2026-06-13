import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '../../services/apiService': path.resolve(__dirname, '../../packages/shared-ui/src/services/apiService.js'),
      '../../utils/recaptcha': path.resolve(__dirname, '../../packages/shared-ui/src/utils/recaptcha.js'),
    }
  }
})
