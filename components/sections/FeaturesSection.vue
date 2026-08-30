<template>
  <section id="features" class="py-14 sm:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          Everything You Need in One Place
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Stop juggling spreadsheets, emails, and sticky notes. The Recruiting
          Compass brings clarity and confidence to your recruiting journey.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
        >
          <div
            class="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          >
            <component :is="feature.icon" class="w-6 h-6 text-white" />
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
  TargetIcon,
  UsersIcon,
  MessageSquareIcon,
  CalendarIcon,
  ClockIcon,
  BarChartIcon,
} from "~/components/landing-icons";

const features = [
  {
    icon: TargetIcon,
    title: "Build Your School List, Then Work It",
    description:
      "Research and organize target schools with a 5-stage recruiting pipeline — from Researching to Committed. Every school is enriched with College Scorecard data: graduation rates, enrollment, costs, and more.",
  },
  {
    icon: UsersIcon,
    title: "Know Every Coach and Where You Stand",
    description:
      "Track every coach you're talking to with a full CRM: response rate analytics, days since last contact, follow-up reminders, and interaction history. See which coaches are engaging and which need a nudge.",
  },
  {
    icon: MessageSquareIcon,
    title: "Send the Right Message at the Right Time",
    description:
      "Choose from 33+ coach outreach templates — introduction emails, thank-you notes, campus visit follow-ups, and more. Built-in NCAA contact-window compliance prevents you from sending when rules say you can't.",
  },
  {
    icon: CalendarIcon,
    title: "A 4-Year Roadmap, Not Just a To-Do List",
    description:
      "Your recruiting timeline maps out what to do from freshman year through signing day. Five guidance panels cover NCAA eligibility, test prep, financial aid, common worries, and what matters right now.",
  },
  {
    icon: ClockIcon,
    title: "Know When Coaches Can Contact You",
    description:
      "22 NCAA recruiting calendars built from official NCAA PDFs, covering every sport and division. See exactly when contact periods, quiet periods, and dead periods fall.",
  },
  {
    icon: BarChartIcon,
    title: "Log the Numbers That Get You Recruited",
    description:
      "Track 66+ sport-specific performance metrics — from 60-yard dash times to GPA to vertical jump. Set your primary metric so coaches see your best number first.",
  },
];
</script>
