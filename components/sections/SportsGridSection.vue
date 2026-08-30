<template>
  <section class="py-14 sm:py-32 bg-gradient-to-br from-green-50 to-emerald-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          Built for Your Sport
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Every sport gets its own recruiting calendar, performance metrics, and
          NCAA compliance rules.
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="sport in sports"
          :key="sport"
          class="bg-white p-4 rounded-xl border border-gray-200 text-center font-medium text-gray-800 hover:border-green-300 hover:shadow-sm transition-all duration-200"
        >
          {{ sport }}
        </div>
      </div>
      <p class="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
        Not a baseball app with other sports bolted on — every feature is
        sport-specific from the ground up.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const sports = [
  "Baseball",
  "Softball",
  "Basketball (M)",
  "Basketball (W)",
  "Football",
  "Soccer (M)",
  "Soccer (W)",
  "Volleyball (W)",
  "Beach Volleyball",
  "Lacrosse (M)",
  "Lacrosse (W)",
  "Field Hockey",
  "Ice Hockey (M)",
  "Ice Hockey (W)",
  "Tennis",
  "Golf",
  "Swimming & Diving",
  "Track & Field / XC",
  "Gymnastics",
];
</script>
