<template>
  <div
    class="min-h-[100svh] bg-gradient-to-br from-green-950 via-green-900 to-emerald-900 text-white"
  >
    <main class="max-w-md mx-auto px-4 py-10 flex flex-col items-center">
      <NuxtLink
        :to="homeLink"
        aria-label="The Recruiting Compass home"
        class="block w-60 max-w-full"
      >
        <BrandHorizontal light class="h-auto w-60 max-w-full" />
      </NuxtLink>
      <h1 class="mt-6 text-2xl font-bold text-center text-balance">
        The college recruiting organizer for families
      </h1>
      <p class="mt-2 text-green-100 text-center">
        Every school, coach and deadline in one place. 19 sports.
      </p>
      <p class="mt-3 text-sm text-green-100 text-center">
        Founding Families get full access
        <strong class="text-white">free for life</strong>. No card required.
      </p>

      <ul class="mt-8 w-full space-y-3">
        <li v-for="link in orderedLinks" :key="link.id">
          <a
            :href="link.href"
            :class="[
              'flex items-center gap-3 w-full rounded-2xl px-5 py-4 min-h-[60px] font-semibold transition-colors',
              link.id === primaryId
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg'
                : 'bg-white/10 hover:bg-white/20 border border-white/20',
            ]"
          >
            <component
              :is="link.icon"
              class="w-5 h-5 shrink-0"
              aria-hidden="true"
            />
            <span class="flex-1">
              {{ link.label }}
              <span
                v-if="link.note"
                class="block text-sm font-normal text-green-100"
                >{{ link.note }}</span
              >
            </span>
            <ArrowRightIcon class="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </li>
      </ul>

      <WaitlistForm class="mt-4" />

      <div class="mt-8 flex gap-6 text-green-100">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="p-2 hover:text-white transition-colors"
        >
          <component :is="social.icon" class="w-6 h-6" />
        </a>
      </div>

      <p class="mt-6 text-xs text-green-200/80 text-center">
        <a :href="`${WEB_APP_URL}/login`" class="hover:text-white">Log in</a>
        <span class="mx-1">•</span>
        <NuxtLink to="/legal/privacy" class="hover:text-white"
          >Privacy</NuxtLink
        >
        <span class="mx-1">•</span>
        <NuxtLink to="/legal/terms" class="hover:text-white">Terms</NuxtLink>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import BrandHorizontal from "~/components/icons/BrandHorizontal.vue";
import WaitlistForm from "~/components/WaitlistForm.vue";
import {
  ArrowRightIcon,
  FacebookIcon,
  FileCheckIcon,
  InstagramIcon,
  MonitorIcon,
  RouteIcon,
  SmartphoneIcon,
  TikTokIcon,
  TwitterIcon,
} from "~/components/landing-icons";
import { SOCIAL, WEB_APP_URL, iosLive, isAppleMobile } from "~/data/site";
import { useSignupUrl } from "~/composables/useSignupUrl";
import { useAppStoreUrl } from "~/composables/useAppStoreUrl";

// Link-in-bio for every social profile. Each profile links here with its own
// UTM tags (docs/LINKS.md), which ride along to web signup and become the
// App Store campaign (ct=links-<utm_source>).
definePageMeta({ layout: false });

useHead({
  title: "Links",
  meta: [
    {
      name: "description",
      content:
        "Get The Recruiting Compass on iPhone or the web, plus free recruiting guides for parents.",
    },
  ],
});

const route = useRoute();
const router = useRouter();
const signupHref = useSignupUrl("links");
const appStoreHref = useAppStoreUrl("links");
const homeLink = computed(() => ({ path: "/", query: route.query }));

interface LinkItem {
  id: "app" | "web" | "timeline" | "home";
  label: string;
  note?: string;
  href: string;
  icon: Component;
}

const links = computed<LinkItem[]>(() => [
  ...(iosLive
    ? [
        {
          id: "app" as const,
          label: "Get the iPhone & iPad app",
          note: "Free on the App Store",
          href: appStoreHref.value,
          icon: SmartphoneIcon,
        },
      ]
    : []),
  {
    id: "web",
    label: "Start free on the web",
    note: "Works on any computer or phone",
    href: signupHref.value,
    icon: MonitorIcon,
  },
  {
    id: "timeline",
    label: "Free recruiting timeline, grades 9–12",
    note: "One-page PDF for parents, any sport",
    href: "/timeline.pdf",
    icon: FileCheckIcon,
  },
  {
    id: "home",
    label: "See how it works",
    href: router.resolve(homeLink.value).href,
    icon: RouteIcon,
  },
]);

// Prerendered for everyone with web signup first; once mounted, iPhone and
// iPad visitors see the App Store first.
const appleMobile = ref(false);
onMounted(() => {
  appleMobile.value = isAppleMobile(navigator);
});
const primaryId = computed(() =>
  appleMobile.value && iosLive ? "app" : "web",
);
const orderedLinks = computed(() =>
  [...links.value].sort(
    (a, b) =>
      Number(b.id === primaryId.value) - Number(a.id === primaryId.value),
  ),
);

const socials = [
  { label: "Instagram", href: SOCIAL.instagram, icon: InstagramIcon },
  { label: "Facebook", href: SOCIAL.facebook, icon: FacebookIcon },
  { label: "TikTok", href: SOCIAL.tiktok, icon: TikTokIcon },
  { label: "X", href: SOCIAL.x, icon: TwitterIcon },
];
</script>
