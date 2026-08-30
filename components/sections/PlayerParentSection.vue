<template>
  <section class="py-14 sm:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          Built for Athletes and Families
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Whether you're the one recruiting or the one helping — we've got you
          covered.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- For Players -->
        <div
          class="bg-gradient-to-br from-gray-50 to-green-50 p-8 rounded-2xl border border-gray-200"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="bg-green-600 w-10 h-10 rounded-lg flex items-center justify-center"
            >
              <TrophyIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900">
              Own Your Recruiting Process
            </h3>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(item, i) in playerBullets"
              :key="i"
              class="flex items-start gap-3"
            >
              <CheckCircleIcon class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <span class="text-gray-700">{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- For Parents -->
        <div
          class="bg-gradient-to-br from-gray-50 to-green-50 p-8 rounded-2xl border border-gray-200"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="bg-green-600 w-10 h-10 rounded-lg flex items-center justify-center"
            >
              <UsersIcon class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900">
              See Everything. Help Without Hovering.
            </h3>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(item, i) in parentBullets"
              :key="i"
              class="flex items-start gap-3"
            >
              <CheckCircleIcon class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <span class="text-gray-700">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  TrophyIcon,
  UsersIcon,
  CheckCircleIcon,
} from "~/components/landing-icons";

const playerBullets = [
  "Track every school, coach, and conversation in one place",
  "Send polished outreach emails with one tap — templates handle the formatting",
  "See exactly what you should be doing this month with your recruiting timeline",
  "Log your performance metrics so coaches can see real numbers",
  "Share your public profile link with any coach, anytime",
];

const parentBullets = [
  "Full shared access to your athlete's recruiting dashboard — same data, same view",
  "COPPA-compliant family accounts with parent and player roles",
  "See which coaches have responded, which schools are in play, and what's next",
  'Help your athlete stay on track without needing to ask "did you email that coach?"',
  "Action items tell both of you what needs attention right now",
];
</script>
