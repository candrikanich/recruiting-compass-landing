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
        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Start Your Recruiting Journey Today
        </h2>
        <p class="text-xl sm:text-2xl text-green-100 mb-12">
          Free for student athletes and families. Web and iOS. Set up your
          profile in 10 minutes.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://myrecruitingcompass.com/signup"
            class="inline-flex items-center justify-center bg-white text-green-900 hover:bg-green-50 px-10 py-5 text-xl font-semibold rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300"
          >
            Create Your Free Account
            <ArrowRightIcon class="ml-2 w-6 h-6" />
          </a>
          <a
            href="https://myrecruitingcompass.com/login"
            class="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from "~/components/landing-icons";
</script>
