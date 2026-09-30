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
          Join as a Founding Family
        </h2>
        <p class="text-xl sm:text-2xl text-green-100 mb-8">
          The Recruiting Compass is live. Families who join during our founding
          period keep full access free for life.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <GiftIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
            <h3 class="font-semibold text-white mb-2">Free for Life</h3>
            <p class="text-green-100 text-sm">
              Founding families keep full access free, forever. No card
              required.
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <UsersIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
            <h3 class="font-semibold text-white mb-2">
              One Account per Family
            </h3>
            <p class="text-green-100 text-sm">
              Parents and athletes share one workspace &mdash; and it can track
              more than one athlete.
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <ClockIcon class="w-10 h-10 text-green-300 mx-auto mb-3" />
            <h3 class="font-semibold text-white mb-2">No Sales Calls</h3>
            <p class="text-green-100 text-sm">
              Published pricing, no ads, and we never sell your data.
            </p>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            :href="webSignupUrl('landing-cta')"
            class="inline-flex items-center justify-center bg-white text-green-900 hover:bg-green-50 px-10 py-5 text-xl font-semibold rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300"
          >
            Start Free on the Web
            <ArrowRightIcon class="ml-2 w-6 h-6" />
          </a>
          <AppStoreBadge campaign="landing-cta" />
        </div>
        <p class="mt-6 text-green-200 text-sm">
          After the founding period: 30-day free trial, then $99/year or
          $12.99/month for the whole family.
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
import AppStoreBadge from "~/components/AppStoreBadge.vue";
import { webSignupUrl } from "~/data/site";
</script>
