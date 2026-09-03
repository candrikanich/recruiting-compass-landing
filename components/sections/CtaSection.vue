<template>
  <section class="relative py-14 sm:py-32 overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1659081443046-268bee889587?w=1920&q=80"
        alt="Student athlete success"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-green-900/95 to-emerald-900/95"
      />
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2
          class="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Help Us Build Your Perfect Recruiting Tool
        </h2>
        <p class="text-xl sm:text-2xl text-green-100 mb-8">
          Take our 3-minute survey and shape the future of The Recruiting
          Compass. Plus, unlock exclusive benefits!
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <GiftIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
            <h3 class="font-semibold text-white mb-2">Early Access</h3>
            <p class="text-green-100 text-sm">
              Be the first to use the app before public launch
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <ClockIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
            <h3 class="font-semibold text-white mb-2">Free for Life</h3>
            <p class="text-green-100 text-sm">
              Founding families keep full access free, forever. No card required.
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <UsersIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
            <h3 class="font-semibold text-white mb-2">Shape the Product</h3>
            <p class="text-green-100 text-sm">
              Your feedback directly influences our features
            </p>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center bg-white text-green-900 hover:bg-green-50 px-10 py-5 text-xl font-semibold rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300"
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
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  GiftIcon,
  ClockIcon,
  UsersIcon,
} from "~/components/landing-icons";

const { typeformFormId, typeformUrl } = useRuntimeConfig().public;
const openTypeform = () => {
  window.open(`${typeformUrl}${typeformFormId}`, "_blank");
};
</script>
