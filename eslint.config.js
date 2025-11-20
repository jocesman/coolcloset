// eslint.config.js
import nextPlugin from 'eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierPlugin from 'eslint-plugin-prettier'
import js from '@eslint/js'

export default [
  {
    // Archivos que NO se deben analizar
    ignores: ['node_modules', 'dist', '.next', 'out'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      next: nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,

      // Prettier debe ir al final
      'prettier/prettier': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
