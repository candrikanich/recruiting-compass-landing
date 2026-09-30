<template>
  <section class="bg-gray-50 py-14 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          The Recruiting Compass by the Numbers
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Built to cover every aspect of college recruiting
        </p>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
      >
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
            {{ stat.value }}
          </div>
          <div class="text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: "19", label: "Sports Supported" },
  { value: "30+", label: "Outreach Templates" },
  { value: "22", label: "NCAA D1 Calendars" },
  { value: "66+", label: "Performance Metrics" },
];
</script>
