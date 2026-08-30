<template>
  <section
    class="py-14 sm:py-32 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-5xl font-bold text-white mb-4">
          Your Recruiting Command Center
        </h2>
        <p class="text-xl text-green-100 max-w-3xl mx-auto">
          Access your personalized recruiting dashboard anywhere—on your desktop
          at home or on your phone between classes. Everything syncs seamlessly
          across all your devices.
        </p>
      </div>
      <div
        class="w-full max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-sm p-1 rounded-full grid grid-cols-2 gap-0"
      >
        <button
          type="button"
          :class="[
            'py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors',
            appTab === 'web'
              ? 'bg-white text-green-900 font-medium'
              : 'text-white hover:bg-white/10',
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
              : 'text-white hover:bg-white/10',
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
          <div
            class="bg-white rounded-lg overflow-hidden border-4 border-gray-700"
          >
            <img
              :src="currentWebSlide.src"
              :alt="currentWebSlide.alt"
              width="1266"
              height="880"
              class="w-full h-auto transition-opacity duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <!-- Carousel controls -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="
              webSlide = (webSlide - 1 + webSlides.length) % webSlides.length
            "
          >
            ‹
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, i) in webSlides"
              :key="i"
              type="button"
              :class="[
                'w-2 h-2 rounded-full transition-colors',
                i === webSlide ? 'bg-white' : 'bg-white/30',
              ]"
              @click="webSlide = i"
            />
          </div>
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="webSlide = (webSlide + 1) % webSlides.length"
          >
            ›
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            v-for="(slide, i) in webSlides"
            :key="i"
            :class="[
              'bg-white/10 backdrop-blur-sm rounded-xl p-6 border transition-colors cursor-pointer',
              i === webSlide
                ? 'border-white/50 bg-white/20'
                : 'border-white/20 hover:border-white/40',
            ]"
            @click="webSlide = i"
          >
            <h4 class="font-semibold text-white mb-2">{{ slide.title }}</h4>
            <p class="text-green-100 text-sm">{{ slide.description }}</p>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center">
        <div class="relative max-w-sm w-full">
          <div
            class="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800"
          >
            <div
              class="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"
            />
            <div
              class="bg-white rounded-[2.5rem] overflow-hidden relative aspect-[9/19.5]"
            >
              <img
                :src="currentIosSlide.src"
                :alt="currentIosSlide.alt"
                width="1206"
                height="2622"
                class="w-full h-full object-cover object-top transition-opacity duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <!-- Carousel controls -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="
              iosSlide = (iosSlide - 1 + iosSlides.length) % iosSlides.length
            "
          >
            ‹
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, i) in iosSlides"
              :key="i"
              type="button"
              :class="[
                'w-2 h-2 rounded-full transition-colors',
                i === iosSlide ? 'bg-white' : 'bg-white/30',
              ]"
              @click="iosSlide = i"
            />
          </div>
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            @click="iosSlide = (iosSlide + 1) % iosSlides.length"
          >
            ›
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
          <div
            v-for="(slide, i) in iosSlides"
            :key="i"
            :class="[
              'bg-white/10 backdrop-blur-sm rounded-xl p-6 border transition-colors cursor-pointer',
              i === iosSlide
                ? 'border-white/50 bg-white/20'
                : 'border-white/20 hover:border-white/40',
            ]"
            @click="iosSlide = i"
          >
            <h4 class="font-semibold text-white mb-2">{{ slide.title }}</h4>
            <p class="text-green-100 text-sm">{{ slide.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MonitorIcon, SmartphoneIcon } from "~/components/landing-icons";

const appTab = ref<"web" | "ios">("web");
const webSlide = ref(0);
const iosSlide = ref(0);

const webSlides = [
  {
    src: "/images/dashboard-web.webp",
    alt: "Recruiting dashboard overview",
    title: "Your Recruiting Command Center",
    description:
      "See your entire recruiting journey at a glance — schools, coaches, interactions, and progress all in one place.",
  },
  {
    src: "/images/dashboard-schools.webp",
    alt: "Schools list and search",
    title: "Track & Evaluate Target Schools",
    description:
      "Search, filter, and manage your school list with fit scores, division filters, and status tracking.",
  },
  {
    src: "/images/dashboard-timeline.webp",
    alt: "Recruiting timeline and milestones",
    title: "Your 4-Year Recruiting Roadmap",
    description:
      "Stay on track with a phase-by-phase timeline, prioritized action items, and milestone progress.",
  },
];

const iosSlides = [
  {
    src: "/images/dashboard-ios.webp",
    alt: "iOS dashboard overview",
    title: "Your Dashboard, Always On Hand",
    description:
      "Check coaches, schools, interactions, and offers at a glance — wherever you are.",
  },
  {
    src: "/images/ios-timeline.webp",
    alt: "iOS recruiting timeline",
    title: "Stay On Track, Phase by Phase",
    description:
      "Follow your year-by-year roadmap and check off tasks as you go — right from your phone.",
  },
  {
    src: "/images/ios-schools.webp",
    alt: "iOS schools list",
    title: "Manage Your School List On the Go",
    description:
      "Filter, favorite, and track your target schools between classes or at the field.",
  },
];

const currentWebSlide = computed(() => webSlides[webSlide.value]!);
const currentIosSlide = computed(() => iosSlides[iosSlide.value]!);
</script>
