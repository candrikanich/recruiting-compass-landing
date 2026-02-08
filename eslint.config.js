import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist', 'design']
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue']
      }
    }
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
        defineNuxtMiddleware: true,
        computed: true,
        ref: true,
        onMounted: true,
        reactive: true,
        watch: true,
        nextTick: true
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
