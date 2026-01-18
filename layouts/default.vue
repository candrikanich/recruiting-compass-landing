<template>
  <div>
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo Placeholder -->
          <div class="flex items-center">
            <CompassIcon class="w-8 h-8 text-primary-600" />
            <span class="ml-2 text-xl font-bold text-gray-900">The Recruiting Compass</span>
          </div>
          
          <!-- CTA Buttons -->
          <div class="hidden md:flex space-x-4">
            <a href="https://blog.therecruitingcompass.com" class="text-gray-600 hover:text-primary-600 transition-colors">
              Blog
            </a>
            <a href="https://myrecruitingcompass.com/login" class="text-gray-600 hover:text-primary-600 transition-colors">
              Login
            </a>
            <a href="https://myrecruitingcompass.com/signup" class="btn-primary text-sm">
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <CompassIcon class="w-6 h-6 text-primary-600" />
            <span class="ml-2 text-lg font-semibold">The Recruiting Compass</span>
          </div>
          <p class="text-gray-400 mb-4">
            Navigate your baseball journey with confidence
          </p>
          <div class="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="https://myrecruitingcompass.com" class="hover:text-white transition-colors">
              App Login
            </a>
            <span>•</span>
            <button @click="openTypeform" class="hover:text-white transition-colors">
              Survey
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import CompassIcon from '~/components/icons/CompassIcon.vue'

const openTypeform = () => {
  const typeformId = useRuntimeConfig().public.typeformFormId || 'YOUR_FORM_ID_HERE'
  window.open(`https://form.typeform.com/to/${typeformId}`, '_blank')
}
</script>