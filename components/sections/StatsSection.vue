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
            {{ stat.current }}{{ stat.suffix }}
          </div>
          <div class="text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  target: number;
  suffix: string;
  label: string;
  current: number;
}

const stats = reactive<Stat[]>([
  { target: 19, suffix: "", label: "Sports Supported", current: 0 },
  { target: 33, suffix: "+", label: "Outreach Templates", current: 0 },
  { target: 22, suffix: "", label: "NCAA Calendars", current: 0 },
  { target: 66, suffix: "+", label: "Performance Metrics", current: 0 },
]);

onMounted(() => {
  const duration = 2000;
  const steps = 60;
  const interval = duration / steps;

  stats.forEach((stat) => {
    let current = 0;
    const inc = stat.target / steps;
    const timer = setInterval(() => {
      current += inc;
      if (current >= stat.target) {
        stat.current = stat.target;
        clearInterval(timer);
      } else {
        stat.current = Math.floor(current);
      }
    }, interval);
  });
});
</script>
