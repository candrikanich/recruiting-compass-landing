<template>
  <section
    class="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-900"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
    </div>
    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      <div class="fade-in mb-8 flex justify-center">
        <BrandHorizontal
          light
          class="h-auto w-64 sm:w-80 lg:w-[26rem] max-w-full"
        />
      </div>
      <h1
        class="hero-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight fade-in delay-1 text-balance"
      >
        Navigate Your Path to
        <span
          class="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
        >
          {{ displayedSport
          }}<span
            v-if="showCursor"
            class="typewriter-cursor"
            style="color: #86efac"
            >|</span
          >
          Success
        </span>
      </h1>
      <p
        class="text-lg sm:text-2xl text-green-100 mb-12 max-w-3xl mx-auto fade-in delay-2"
      >
        Everything student athletes and their families need to navigate college
        recruiting&mdash;from finding schools to contacting coaches to tracking
        every step. For 19 sports. No recruiting service required.
      </p>
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in delay-3"
      >
        <button
          type="button"
          class="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
          @click="openTypeform"
        >
          Take the Survey
          <ArrowRightIcon class="ml-2 w-5 h-5" />
        </button>
        <a
          href="#features"
          class="inline-flex items-center justify-center border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-full transition-all duration-300"
        >
          Learn More
        </a>
      </div>

      <WaitlistForm class="fade-in delay-4" />

      <p class="mt-16 text-green-200 text-sm fade-in delay-5">
        Available on Web &amp; iOS &bull; Coming Spring 2026
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import BrandHorizontal from "~/components/icons/BrandHorizontal.vue";
import WaitlistForm from "~/components/WaitlistForm.vue";
import { ArrowRightIcon } from "~/components/landing-icons";

const { typeformFormId, typeformUrl } = useRuntimeConfig().public;
const openTypeform = () => {
  window.open(`${typeformUrl}${typeformFormId}`, "_blank");
};

const BASE_SPORTS = [
  "Baseball",
  "Basketball",
  "Football",
  "Softball",
  "Soccer",
  "Tennis",
  "Lacrosse",
];
const SPORTS = computed(() => {
  const shuffled = [...BASE_SPORTS].sort(() => Math.random() - 0.5);
  return [...shuffled, "College Athletic"];
});

// Seed with "Baseball" so prerendered/crawled HTML contains the primary
// keyword in the H1; the typewriter (onMounted, client-only) takes over after.
const displayedSport = ref("Baseball ");
// Cursor hidden during SSR so prerendered H1 reads cleanly; enabled on mount.
const showCursor = ref(false);

onMounted(() => {
  showCursor.value = true;
  let sportIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const tick = () => {
    const word = SPORTS.value[sportIdx]!;
    if (deleting) {
      charIdx--;
      displayedSport.value = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        sportIdx++;
      }
      setTimeout(tick, 45);
      return;
    }
    charIdx++;
    displayedSport.value = word.slice(0, charIdx);
    if (charIdx < word.length) {
      setTimeout(tick, 85);
      return;
    }
    if (sportIdx === SPORTS.value.length - 1) {
      showCursor.value = false;
      return;
    }
    setTimeout(() => {
      deleting = true;
      setTimeout(tick, 85);
    }, 1000);
  };
  setTimeout(tick, 600);
});
</script>

<style scoped>
.hero-blob {
  @apply absolute rounded-full mix-blend-multiply filter blur-xl opacity-20;
  width: 20rem;
  height: 20rem;
}
.hero-blob-1 {
  @apply bg-green-500;
  top: -10rem;
  left: -10rem;
  animation: blob1 20s ease-in-out infinite;
}
.hero-blob-2 {
  @apply bg-emerald-500;
  top: 10rem;
  right: -10rem;
  animation: blob2 25s ease-in-out infinite;
}
.hero-blob-3 {
  @apply bg-teal-500;
  bottom: -10rem;
  left: 33%;
  animation: blob3 15s ease-in-out infinite;
}
@keyframes blob1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(100px, 50px);
  }
  66% {
    transform: translate(0, 0);
  }
}
@keyframes blob2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-100px, 100px);
  }
  66% {
    transform: translate(0, 0);
  }
}
@keyframes blob3 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(50px, -50px);
  }
  66% {
    transform: translate(0, 0);
  }
}
.fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}
.fade-in.delay-1 {
  animation-delay: 0.2s;
}
.fade-in.delay-2 {
  animation-delay: 0.4s;
}
.fade-in.delay-3 {
  animation-delay: 0.6s;
}
.fade-in.delay-4 {
  animation-delay: 1s;
}
.fade-in.delay-5 {
  animation-delay: 1.4s;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.typewriter-cursor {
  animation: blink 0.7s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
