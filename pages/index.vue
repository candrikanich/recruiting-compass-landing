<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-900">
      <div class="absolute inset-0 overflow-hidden">
        <div class="hero-blob hero-blob-1" />
        <div class="hero-blob hero-blob-2" />
        <div class="hero-blob hero-blob-3" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div class="fade-in mb-8 flex justify-center items-center gap-4">
          <CompassIcon class="w-20 h-20 text-green-400" />
          <div class="text-left">
            <h2 class="text-3xl sm:text-4xl font-bold text-white">
              The Recruiting Compass
            </h2>
            <p class="text-sm text-green-300 tracking-wide">
              find your path • make your move
            </p>
          </div>
        </div>
        <h1 class="hero-headline text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight fade-in delay-1">
          Navigate Your Path to
          <br />
          <span class="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            College Athletic Success
          </span>
        </h1>
        <p class="text-xl sm:text-2xl text-green-100 mb-12 max-w-3xl mx-auto fade-in delay-2">
          The all-in-one platform that guides student-athletes and parents through every step
          of the college recruiting journey—from first contact to signing day.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in delay-3">
          <button
            type="button"
            class="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
            @click="openTypeform"
          >
            Take Our Survey & Get Early Access
            <ArrowRightIcon class="ml-2 w-5 h-5" />
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
            @click="scrollToSection('features')"
          >
            Learn More
          </button>
        </div>
        <p class="mt-16 text-green-200 text-sm fade-in delay-4">
          Available on Web & iOS • Coming Spring 2026
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-gray-50 py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Recruiting Process by the Numbers
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding the challenge helps you navigate it better
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
              {{ stat1 }}+
            </div>
            <div class="text-gray-600">High School Athletes Annually</div>
          </div>
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
              {{ stat2 }}+
            </div>
            <div class="text-gray-600">College Athletic Opportunities</div>
          </div>
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
              {{ stat3 }}+
            </div>
            <div class="text-gray-600">Years Average Recruiting Timeline</div>
          </div>
          <div class="text-center">
            <div class="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
              {{ stat4 }}%
            </div>
            <div class="text-gray-600">Feel Overwhelmed Without Guidance</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-20 sm:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop juggling spreadsheets, emails, and sticky notes. The Recruiting Compass brings
            clarity and confidence to your recruiting journey.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
          >
            <div class="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 mb-3 text-sm">{{ feature.description }}</p>
            <span class="inline-block text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {{ feature.forWho }}
            </span>
          </div>
        </div>
        <div class="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1489824740691-7a25f94fc85a?w=1080&q=80"
            alt="College campus sports"
            class="w-full h-96 object-cover"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex items-end">
            <div class="p-8 text-white">
              <h3 class="text-3xl font-bold mb-2">Your Dream School is Waiting</h3>
              <p class="text-lg text-green-100">Let us help you get there with confidence and clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-20 sm:py-32 bg-gradient-to-br from-green-50 to-emerald-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your recruiting journey
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div
            class="hidden md:block absolute top-24 h-0.5 bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300"
            style="width: calc(100% - 200px); left: 100px"
          />
          <div
            v-for="(step, index) in howItWorksSteps"
            :key="index"
            class="relative text-center"
          >
            <div class="relative inline-flex items-center justify-center mb-6">
              <div class="absolute text-8xl font-bold text-green-100 opacity-50">
                {{ step.step }}
              </div>
              <div class="relative bg-gradient-to-br from-green-600 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <component :is="step.icon" class="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- App Showcase -->
    <section class="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-5xl font-bold text-white mb-4">
            Your Recruiting Command Center
          </h2>
          <p class="text-xl text-green-100 max-w-3xl mx-auto">
            Access your personalized recruiting dashboard anywhere—on your desktop at home or
            on your phone between classes. Everything syncs seamlessly across all your devices.
          </p>
        </div>
        <div class="w-full max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-sm p-1 rounded-full grid grid-cols-2 gap-0">
          <button
            type="button"
            :class="[
              'py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors',
              appTab === 'web'
                ? 'bg-white text-green-900 font-medium'
                : 'text-white hover:bg-white/10'
            ]"
            @click="appTab = 'web'"
          >
            <MonitorIcon class="w-4 h-4" />
            Web App
          </button>
          <button
            type="button"
            :class="[
              'py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors',
              appTab === 'ios'
                ? 'bg-white text-green-900 font-medium'
                : 'text-white hover:bg-white/10'
            ]"
            @click="appTab = 'ios'"
          >
            <SmartphoneIcon class="w-4 h-4" />
            iOS App
          </button>
        </div>
        <div v-if="appTab === 'web'" class="relative">
          <div class="bg-gray-800 rounded-t-2xl p-2 shadow-2xl">
            <div class="flex gap-1.5 mb-2 px-2">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div class="bg-white rounded-lg overflow-hidden border-4 border-gray-700 relative">
              <img
                src="https://images.unsplash.com/photo-1665470909939-959569b20021?w=1080&q=80"
                alt="Web App Dashboard"
                class="w-full h-auto"
                loading="lazy"
              >
              <div class="absolute inset-0 flex items-center justify-center bg-green-900/80 backdrop-blur-sm">
                <div class="text-center p-8">
                  <MonitorIcon class="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 class="text-2xl font-bold text-white mb-2">Web App Screenshot Coming Soon</h3>
                  <p class="text-green-100">Full-featured dashboard with recruiting timeline, coach contacts, and progress tracking</p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 class="font-semibold text-white mb-2">Complete Dashboard View</h4>
              <p class="text-green-100 text-sm">See your entire recruiting journey at a glance with comprehensive analytics and insights</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 class="font-semibold text-white mb-2">Manage Multiple Prospects</h4>
              <p class="text-green-100 text-sm">Track conversations with dozens of coaches across different programs simultaneously</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 class="font-semibold text-white mb-2">Upload & Share Documents</h4>
              <p class="text-green-100 text-sm">Easily upload highlight videos, transcripts, and share them instantly with coaches</p>
            </div>
          </div>
        </div>
        <div v-else class="relative flex justify-center">
          <div class="relative max-w-sm">
            <div class="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
              <div class="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
              <div class="bg-white rounded-[2.5rem] overflow-hidden relative aspect-[9/19.5]">
                <img
                  src="https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=1080&q=80"
                  alt="iOS App Interface"
                  class="w-full h-full object-cover"
                  loading="lazy"
                >
                <div class="absolute inset-0 flex items-center justify-center bg-green-900/80 backdrop-blur-sm">
                  <div class="text-center p-8">
                    <SmartphoneIcon class="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 class="text-2xl font-bold text-white mb-2">iOS App Screenshot Coming Soon</h3>
                    <p class="text-green-100 text-sm">Stay connected on the go with push notifications and instant updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 class="font-semibold text-white mb-2">On-the-Go Access</h4>
              <p class="text-green-100 text-sm">Check your recruiting status between classes, at practice, or during tournaments</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 class="font-semibold text-white mb-2">Push Notifications</h4>
              <p class="text-green-100 text-sm">Never miss a deadline, coach response, or important recruiting opportunity</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 class="font-semibold text-white mb-2">Quick Updates</h4>
              <p class="text-green-100 text-sm">Log conversations, update stats, and mark tasks complete in seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-20 sm:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Families Like Yours
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of student-athletes and parents who found clarity in their recruiting journey
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(t, i) in testimonials"
            :key="i"
            class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 relative"
          >
            <QuoteIcon class="w-10 h-10 text-green-300 mb-4" />
            <div class="flex mb-4">
              <StarIcon v-for="star in t.rating" :key="star" class="w-5 h-5 text-yellow-400" />
            </div>
            <p class="text-gray-700 mb-6 italic">"{{ t.quote }}"</p>
            <div>
              <div class="font-semibold text-gray-900">{{ t.author }}</div>
              <div class="text-sm text-gray-600">{{ t.role }}</div>
            </div>
          </div>
        </div>
        <div class="mt-20 relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1631490238101-a1156ce9bb3d?w=1080&q=80"
            alt="High school athlete recruiting"
            class="w-full h-96 object-cover"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent flex items-center">
            <div class="p-12 max-w-2xl">
              <h3 class="text-4xl font-bold text-white mb-4">Your Success Story Starts Here</h3>
              <p class="text-xl text-green-100">Every great athlete's journey begins with a single step. Take yours today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Survey CTA -->
    <section class="relative py-20 sm:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1659081443046-268bee889587?w=1920&q=80"
          alt="Student athlete success"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-green-900/95 to-emerald-900/95" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Help Us Build Your Perfect Recruiting Tool
          </h2>
          <p class="text-xl sm:text-2xl text-green-100 mb-8">
            Take our 3-minute survey and shape the future of The Recruiting Compass. Plus, unlock exclusive benefits!
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <GiftIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
              <h3 class="font-semibold text-white mb-2">Early Access</h3>
              <p class="text-green-100 text-sm">Be the first to use the app before public launch</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <ClockIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
              <h3 class="font-semibold text-white mb-2">Exclusive Discounts</h3>
              <p class="text-green-100 text-sm">Special pricing for early survey participants</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <UsersIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
              <h3 class="font-semibold text-white mb-2">Shape the Product</h3>
              <p class="text-green-100 text-sm">Your feedback directly influences our features</p>
            </div>
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center bg-white text-green-900 hover:bg-green-50 px-10 py-7 text-xl font-semibold rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300"
            @click="openTypeform"
          >
            Take the Survey Now
            <ArrowRightIcon class="ml-2 w-6 h-6" />
          </button>
          <p class="mt-6 text-green-200 text-sm">
            ⏱️ Takes only 3 minutes • 🔒 Your responses are confidential
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="py-20 sm:py-32 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-xl text-gray-600">
            Everything you need to know about The Recruiting Compass
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <button
              type="button"
              class="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors"
              @click="faqOpen === index ? (faqOpen = -1) : (faqOpen = index)"
            >
              {{ faq.question }}
              <span class="text-green-600 text-2xl leading-none">{{ faqOpen === index ? '−' : '+' }}</span>
            </button>
            <div v-show="faqOpen === index" class="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-2">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <CompassIcon class="w-8 h-8 text-green-400" />
              <span class="text-xl font-bold text-white">The Recruiting Compass</span>
            </div>
            <p class="text-gray-400 mb-4 max-w-md">
              Navigate your path to college athletic success with confidence, clarity, and expert guidance.
            </p>
            <div class="flex gap-4">
              <a href="#" class="hover:text-green-400 transition-colors" aria-label="Instagram">
                <InstagramIcon class="w-5 h-5" />
              </a>
              <a href="#" class="hover:text-green-400 transition-colors" aria-label="Twitter">
                <TwitterIcon class="w-5 h-5" />
              </a>
              <a href="#" class="hover:text-green-400 transition-colors" aria-label="Facebook">
                <FacebookIcon class="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#features" class="hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" class="hover:text-green-400 transition-colors">How It Works</a></li>
              <li><a href="#testimonials" class="hover:text-green-400 transition-colors">Testimonials</a></li>
              <li><a href="#faq" class="hover:text-green-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Get in Touch</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <MailIcon class="w-4 h-4 shrink-0" />
                <a href="mailto:info@therecruitingcompass.com" class="hover:text-green-400 transition-colors">
                  info@therecruitingcompass.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 The Recruiting Compass. All rights reserved.</p>
          <p class="mt-2">
            <a href="#" class="hover:text-green-400 transition-colors">Privacy Policy</a>
            <span class="mx-1">•</span>
            <a href="#" class="hover:text-green-400 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CompassIcon from '~/components/icons/CompassIcon.vue'
import {
  ArrowRightIcon,
  TargetIcon,
  UsersIcon,
  CalendarIcon,
  BarChartIcon,
  MessageSquareIcon,
  FileCheckIcon,
  BellIcon,
  CheckCircleIcon,
  UserPlusIcon,
  RouteIcon,
  TrophyIcon,
  MonitorIcon,
  SmartphoneIcon,
  QuoteIcon,
  StarIcon,
  GiftIcon,
  ClockIcon,
  MailIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
} from '~/components/landing-icons'

const typeformId = useRuntimeConfig().public.typeformFormId || 'YOUR_FORM_ID_HERE'
const openTypeform = () => {
  window.open(`https://form.typeform.com/to/${typeformId}`, '_blank')
}

function scrollToSection (id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Stats counter animation
const stat1 = ref(0)
const stat2 = ref(0)
const stat3 = ref(0)
const stat4 = ref(0)
const targets = { stat1: 180000, stat2: 480000, stat3: 3, stat4: 90 }
onMounted(() => {
  const duration = 2000
  const steps = 60
  const interval = duration / steps
  ;['stat1', 'stat2', 'stat3', 'stat4'].forEach((key) => {
    const target = targets[key as keyof typeof targets]
    let current = 0
    const inc = target / steps
    const t = setInterval(() => {
      current += inc
      if (current >= target) {
        if (key === 'stat1') stat1.value = target
        if (key === 'stat2') stat2.value = target
        if (key === 'stat3') stat3.value = target
        if (key === 'stat4') stat4.value = target
        clearInterval(t)
      } else {
        if (key === 'stat1') stat1.value = Math.floor(current)
        if (key === 'stat2') stat2.value = Math.floor(current)
        if (key === 'stat3') stat3.value = Math.floor(current)
        if (key === 'stat4') stat4.value = Math.floor(current)
      }
    }, interval)
  })
})

// Features
const features = [
  { icon: TargetIcon, title: 'Personalized Recruiting Roadmap', description: "Get a custom timeline based on your sport, grade level, and goals. Never miss a critical deadline or opportunity.", forWho: 'For Players & Parents' },
  { icon: UsersIcon, title: 'Coach Communication Hub', description: "Track all your interactions with college coaches in one place. Know who you've contacted, when, and what's next.", forWho: 'For Players' },
  { icon: CalendarIcon, title: 'Smart Scheduling & Reminders', description: 'Automated reminders for campus visits, showcase events, and NCAA compliance deadlines. Stay ahead of the game.', forWho: 'For Parents' },
  { icon: BarChartIcon, title: 'Athletic & Academic Progress Tracker', description: 'Monitor your stats, GPA, test scores, and see how you stack up against college program requirements.', forWho: 'For Players' },
  { icon: FileCheckIcon, title: 'Document Management', description: 'Store and organize highlight videos, transcripts, test scores, and athletic resumes. Share them instantly with coaches.', forWho: 'For Players & Parents' },
  { icon: MessageSquareIcon, title: 'Expert Guidance & Resources', description: 'Access expert tips, sample emails, NCAA rules explained simply, and answers to your toughest questions.', forWho: 'For Parents' },
  { icon: BellIcon, title: 'Opportunity Alerts', description: 'Get notified about camps, showcases, and recruiting events that match your profile and goals.', forWho: 'For Players' },
  { icon: CheckCircleIcon, title: 'Task Management System', description: 'Break down the recruiting process into manageable steps. Check off tasks and watch your progress grow.', forWho: 'For Players & Parents' },
]

// How it works
const howItWorksSteps = [
  { icon: UserPlusIcon, step: '01', title: 'Create Your Profile', description: 'Tell us about your sport, academic achievements, and recruiting goals. Takes just 5 minutes.' },
  { icon: RouteIcon, step: '02', title: 'Follow Your Custom Roadmap', description: 'Get your personalized recruiting timeline with actionable steps, deadlines, and expert guidance.' },
  { icon: TrophyIcon, step: '03', title: 'Sign with Confidence', description: 'Track your progress, manage coach relationships, and make informed decisions that lead to success.' },
]

// App showcase tab
const appTab = ref<'web' | 'ios'>('web')

// Testimonials
const testimonials = [
  { quote: "As a parent, I felt completely lost in the recruiting process. The Recruiting Compass gave us a clear path forward and peace of mind that we weren't missing critical steps.", author: 'Jennifer M.', role: 'Parent of D1 Soccer Recruit', rating: 5 },
  { quote: "Having everything in one place—my stats, coach contacts, deadlines—was a game changer. I signed with my dream school and I know this app helped me get there.", author: 'Marcus T.', role: 'Baseball Player, Class of 2025', rating: 5 },
  { quote: "The timeline feature alone is worth it. We knew exactly what to do and when to do it. No more guessing or panicking about whether we were on track.", author: 'David & Sarah K.', role: 'Parents of Track & Field Athlete', rating: 5 },
]

// FAQ
const faqOpen = ref<number>(-1)
const faqs = [
  { question: 'Who is The Recruiting Compass for?', answer: "The Recruiting Compass is designed for high school student-athletes (grades 9-12) and their parents who want to navigate the college recruiting process with confidence. Whether you're just starting or in the middle of recruiting, we're here to help." },
  { question: 'What sports does the app support?', answer: 'We support all NCAA sports including football, basketball, baseball, softball, soccer, track & field, volleyball, lacrosse, swimming, tennis, golf, and more. Our platform adapts to the unique recruiting timeline and requirements of each sport.' },
  { question: 'How much does it cost?', answer: "We're still finalizing our pricing, but we're committed to making The Recruiting Compass accessible to all families. Early survey participants will receive exclusive discounts and beta access. Take our survey to learn more!" },
  { question: 'When will the app be available?', answer: "We're launching in Spring 2026 with both web and iOS versions. Join our survey to get early access and be among the first to experience the platform." },
  { question: 'How is this different from working with a recruiting service?', answer: "The Recruiting Compass empowers you to take control of your own recruiting journey at a fraction of the cost of traditional recruiting services. You get the tools, guidance, and organization you need—all in your pocket. Plus, you maintain full ownership of your relationships with coaches." },
  { question: 'Do you help with academic requirements?', answer: "Yes! We track both athletic and academic progress. Our platform helps you monitor GPA, test scores, and NCAA eligibility requirements so you can ensure you qualify for the programs you're targeting." },
  { question: 'Can multiple family members access the same account?', answer: 'Absolutely. We designed The Recruiting Compass with families in mind. Parents and athletes can collaborate on the same account, ensuring everyone stays informed and on the same page.' },
  { question: "What if I'm not sure about my recruiting timeline?", answer: "That's exactly what we're here for! Once you create your profile, we'll generate a personalized recruiting roadmap based on your sport, grade level, and goals. You'll know exactly what to do and when to do it." },
]

useHead({
  title: 'The Recruiting Compass - Navigate Your Path to College Athletic Success',
  meta: [
    { name: 'description', content: 'The all-in-one platform that guides student-athletes and parents through every step of the college recruiting journey—from first contact to signing day.' },
  ],
})
</script>

<style scoped>
.hero-blob {
  @apply absolute rounded-full mix-blend-multiply filter blur-xl opacity-20;
  width: 20rem;
  height: 20rem;
}
.hero-blob-1 {
  @apply bg-green-500;
  top: -10rem;
  left: -10rem;
  animation: blob1 20s ease-in-out infinite;
}
.hero-blob-2 {
  @apply bg-emerald-500;
  top: 10rem;
  right: -10rem;
  animation: blob2 25s ease-in-out infinite;
}
.hero-blob-3 {
  @apply bg-teal-500;
  bottom: -10rem;
  left: 33%;
  animation: blob3 15s ease-in-out infinite;
}
@keyframes blob1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(100px, 50px); }
  66% { transform: translate(0, 0); }
}
@keyframes blob2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-100px, 100px); }
  66% { transform: translate(0, 0); }
}
@keyframes blob3 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(50px, -50px); }
  66% { transform: translate(0, 0); }
}
.fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}
.fade-in.delay-1 { animation-delay: 0.2s; }
.fade-in.delay-2 { animation-delay: 0.4s; }
.fade-in.delay-3 { animation-delay: 0.6s; }
.fade-in.delay-4 { animation-delay: 1s; }
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
