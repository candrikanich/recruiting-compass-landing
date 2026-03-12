<template>
  <div>
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Brand -->
          <BrandHorizontal />
          
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer v-if="!isHomePage" class="bg-gray-900 text-white py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <BrandHorizontal />
          </div>
          <p class="text-gray-400 mb-4">
            Navigate your baseball journey with confidence
          </p>
          <div class="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="https://myrecruitingcompass.com" class="hover:text-white transition-colors">
              App Login
            </a>
            <span>•</span>
            <button class="hover:text-white transition-colors" @click="openTypeform">
              Survey
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import BrandHorizontal from '~/components/icons/BrandHorizontal.vue'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const openTypeform = () => {
  const { typeformFormId, typeformUrl } = useRuntimeConfig().public
  window.open(`${typeformUrl}${typeformFormId}`, '_blank')
}
</script>