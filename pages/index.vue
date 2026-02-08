<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-baseball-50">


    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="hero-headline text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Navigate Your
          <span class="text-primary-600 inline-block overflow-hidden align-bottom">
            <span class="word-flip-wrapper inline-block">
              <Transition name="flip" mode="out-in">
                <span :key="sportWord" class="word-flip-word block text-center">
                  {{ sportWord }}
                </span>
              </Transition>
            </span>
          </span>
          Recruiting Journey
        </h1>
        
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Help your high school baseball player take control of the college recruiting process. 
          Track communications, manage relationships with coaches, and make informed decisions 
          about your baseball future.
        </p>

        <!-- Primary CTA - Take Survey -->
        <div class="mb-8">
          <button class="btn-secondary text-lg px-12 py-4 mb-4" @click="openTypeform">
            Take Our Market Research Survey
          </button>
          <p class="text-sm text-gray-500">
            Help us build the perfect recruiting tool for families like yours
          </p>
        </div>

        <!-- Secondary CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://myrecruitingcompass.com/signup" class="btn-outline">
            Try the App Now
          </a>
          <a href="#learn-more" class="btn-outline">
            Learn More
          </a>
        </div>
      </div>
    </section>

    <!-- For Families Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Built for Baseball Families
          </h2>
          <p class="text-lg text-gray-600">
            Whether you're a player or parent, we've designed tools to support your recruiting journey
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- For Players -->
          <div class="bg-baseball-50 rounded-xl p-8">
            <div class="w-12 h-12 bg-baseball-500 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">For Players</h3>
            <ul class="space-y-2 text-gray-600">
              <li>Track your target schools and programs</li>
              <li>Log every coach interaction</li>
              <li>Monitor your performance metrics</li>
              <li>Stay organized during recruiting events</li>
            </ul>
          </div>

          <!-- For Parents -->
          <div class="bg-primary-50 rounded-xl p-8">
            <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">For Parents</h3>
            <ul class="space-y-2 text-gray-600">
              <li>Support your athlete's journey</li>
              <li>Manage important documents</li>
              <li>Track communication opportunities</li>
              <li>Compare offers and opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Learn More Section -->
    <section id="learn-more" class="py-16 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">
          The Recruiting Compass Is Coming Soon
        </h2>
        
        <p class="text-lg text-gray-600 mb-8">
          We're building the comprehensive tool that baseball families need to navigate 
          the complex college recruiting process with confidence. Take our survey to help 
          us build exactly what you need.
        </p>

        <div class="bg-white rounded-xl p-8 shadow-lg">
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-secondary" @click="openTypeform">
              Take the Survey
            </button>
            <a href="https://myrecruitingcompass.com/signup" class="btn-outline">
              Try Early Access
            </a>
          </div>
        </div>
      </div>
    </section>



    <!-- Typeform Embed -->
    <div id="typeform-container" class="hidden"></div>
  </div>
</template>

<script setup lang="ts">
// Sport word rotator (flipbook / flip-clock style)
const SPORTS = [
  'Baseball',
  'Football',
  'Basketball',
  'Volleyball',
  'Soccer',
  'Tennis',
  'Lacrosse',
  'College',
] as const;

const sportIndex = ref(0)
const sportWord = computed(() => SPORTS[sportIndex.value])

let sportInterval: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  sportInterval = setInterval(() => {
    if (sportIndex.value >= SPORTS.length - 1) {
      if (sportInterval) clearInterval(sportInterval)
      sportInterval = null
      return
    }
    sportIndex.value = sportIndex.value + 1
  }, 1800)
})
onUnmounted(() => {
  if (sportInterval) clearInterval(sportInterval)
})

// Typeform integration - will need your form ID
const typeformId = useRuntimeConfig().public.typeformFormId || 'YOUR_FORM_ID_HERE'

const openTypeform = () => {
  // For now, we'll use a simple redirect until you provide the form ID
  window.open(`https://form.typeform.com/to/${typeformId}`, '_blank')
  
  // Alternative: You can use Typeform's embed library when you have the form ID
  // This requires adding the Typeform script to your head
}

// SEO meta tags
useHead({
  title: 'The Recruiting Compass - Navigate Your Baseball Journey',
  meta: [
    { name: 'description', content: 'Helping high school baseball players and their families navigate the college recruiting process with confidence and clarity.' }
  ]
})
</script>

<style scoped>
.hero-headline {
  line-height: 1.3;
  padding-bottom: 0.2em;
  overflow: visible;
}

.word-flip-wrapper {
  perspective: 12rem;
  min-width: 18ch; /* avoid layout shift for "College Recruiting" */
}

.word-flip-word {
  transform-origin: center top;
  backface-visibility: hidden;
}

/* Flip-clock style: out = top flips up, in = next flips down into place */
.flip-enter-active,
.flip-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.flip-leave-to {
  transform: rotateX(-90deg);
  opacity: 0;
}

.flip-enter-from {
  transform: rotateX(90deg);
  opacity: 0;
}

.flip-enter-to,
.flip-leave-from {
  transform: rotateX(0);
  opacity: 1;
}
</style>