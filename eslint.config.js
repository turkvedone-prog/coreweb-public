import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'scratch/**', 'seed_*.js', 'write_*.js', 'inspect_*.js', 'transfer_*.js', 'verify_*.js', 'wait_for_*.js', 'patch_*.js', 'run_*.js', 'cleanup_*.js']),
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['*.js', 'scratch/**/*.js', 'scratch/**/*.cjs', '*.cjs'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.browser,
      },
    },
  },
])

