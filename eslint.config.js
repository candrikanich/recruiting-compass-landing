import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist']
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: {
        useHead: true,
        useRouter: true,
        useRoute: true,
        useState: true,
        useFetch: true,
        useAsyncData: true,
        useRuntimeConfig: true,
        navigateTo: true,
        definePageMeta: true,
        defineNuxtConfig: true,
        defineNuxtPlugin: true,
        defineNuxtMiddleware: true
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: true,
        exports: true,
        require: true,
        __dirname: true,
        __filename: true
      }
    }
  }
]
