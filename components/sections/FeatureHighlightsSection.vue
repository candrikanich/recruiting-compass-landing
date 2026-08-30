<template>
  <section class="py-14 sm:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          And There's More
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Every detail of the recruiting process, covered.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 rounded-xl border border-gray-200 hover:border-green-300 transition-colors"
        >
          <div
            class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3"
          >
            <component :is="feature.icon" class="w-5 h-5 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  BarChartIcon,
  BellIcon,
  MessageSquareIcon,
  MonitorIcon,
  CheckCircleIcon,
} from "~/components/landing-icons";

const features = [
  {
    icon: UsersIcon,
    title: "Public Profile",
    description:
      "A shareable athlete profile page with your stats, academics, video links, and highlights. See when coaches view it.",
  },
  {
    icon: BarChartIcon,
    title: "Analytics Dashboard",
    description:
      "Upcoming events, schools in your pipeline, coach response rates, action items, and recruiting progress — all in one view.",
  },
  {
    icon: BellIcon,
    title: "AI-Driven Action Items",
    description:
      "11 rules that surface what needs your attention: coaches who haven't replied, missing profile fields, upcoming deadlines, schools without contacts.",
  },
  {
    icon: MessageSquareIcon,
    title: "Push Notifications",
    description:
      "Get notified when you receive an offer, a coach reaches out, or an event is coming up.",
  },
  {
    icon: MonitorIcon,
    title: "Works on Web and iOS",
    description: "Full-featured on both platforms. Your data syncs everywhere.",
  },
  {
    icon: CheckCircleIcon,
    title: "Accessible",
    description:
      "WCAG AA compliant. Keyboard navigable, screen reader friendly, Dynamic Type supported.",
  },
];
</script>
