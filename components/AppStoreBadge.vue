<template>
  <a
    v-if="iosLive"
    :href="appStoreUrl(campaign)"
    class="inline-flex"
    aria-label="Download The Recruiting Compass on the App Store"
  >
    <img
      src="https://tools.applemarketingtools.com/api/badges/download-on-the-app-store/black/en-us"
      alt="Download on the App Store"
      width="180"
      height="60"
      class="h-14 sm:h-16 w-auto"
    />
  </a>
  <span
    v-else
    class="inline-flex items-center justify-center border border-dashed border-green-300/50 text-green-200 px-5 py-3 text-sm sm:text-base rounded-full"
  >
    iPhone &amp; iPad app coming soon
  </span>
</template>

<script setup lang="ts">
import { iosLive, appStoreUrl } from "~/data/site";

defineProps<{ campaign: string }>();
</script>
