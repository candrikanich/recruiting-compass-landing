<template>
  <section
    id="how-it-works"
    class="py-14 sm:py-32 bg-gradient-to-br from-green-50 to-emerald-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Three simple steps to take control of your recruiting journey
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
        <div
          class="hidden md:block absolute top-24 h-0.5 bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300"
          style="width: calc(100% - 200px); left: 100px"
        />
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative text-center"
        >
          <div class="relative inline-flex items-center justify-center mb-6">
            <div class="absolute text-8xl font-bold text-green-100 opacity-50">
              {{ step.step }}
            </div>
            <div
              class="relative bg-gradient-to-br from-green-600 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <component :is="step.icon" class="w-10 h-10 text-white" />
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">
            {{ step.title }}
          </h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  UserPlusIcon,
  RouteIcon,
  TrophyIcon,
} from "~/components/landing-icons";

const steps = [
  {
    icon: UserPlusIcon,
    step: "01",
    title: "Set Up Your Profile",
    description:
      "Tell us your sport, position, graduation year, and key stats. Add your academic info and video links. Takes about 10 minutes.",
  },
  {
    icon: RouteIcon,
    step: "02",
    title: "Build Your School List",
    description:
      "Search and add target schools. The pipeline tracks where you stand with each one — from researching to committed. We pull in College Scorecard data so you can compare schools on the facts.",
  },
  {
    icon: TrophyIcon,
    step: "03",
    title: "Start Reaching Out",
    description:
      "Use built-in templates to contact coaches. Log every interaction. Your dashboard shows what needs attention — which coaches haven't replied, what deadlines are coming, and what to do next.",
  },
];
</script>
