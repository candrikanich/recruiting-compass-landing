<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { iosLive, APP_STORE_ID } from "~/data/site";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: iosLive
    ? [{ name: "apple-itunes-app", content: `app-id=${APP_STORE_ID}` }]
    : [],
});
</script>
