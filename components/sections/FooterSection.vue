<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-2">
          <div class="mb-4">
            <BrandHorizontal light class="h-auto w-56 max-w-full" />
          </div>
          <p class="text-gray-400 mb-4 max-w-md">
            Always know where you stand &mdash; and what to do next. The college
            recruiting organizer for families, in 19 sports.
          </p>
          <div class="flex gap-4">
            <a
              :href="SOCIAL.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-green-400 transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon class="w-5 h-5" />
            </a>
            <a
              :href="SOCIAL.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-green-400 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon class="w-5 h-5" />
            </a>
            <a
              :href="SOCIAL.x"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-green-400 transition-colors"
              aria-label="X"
            >
              <TwitterIcon class="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-white mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <a href="#features" class="hover:text-green-400 transition-colors"
                >Features</a
              >
            </li>
            <li>
              <a
                href="#how-it-works"
                class="hover:text-green-400 transition-colors"
                >How It Works</a
              >
            </li>
            <li>
              <a href="#faq" class="hover:text-green-400 transition-colors"
                >FAQ</a
              >
            </li>
            <li>
              <a
                :href="webSignupUrl('landing-footer')"
                class="hover:text-green-400 transition-colors"
                >Sign Up Free</a
              >
            </li>
            <li>
              <a
                :href="`${WEB_APP_URL}/login`"
                class="hover:text-green-400 transition-colors"
                >Log In</a
              >
            </li>
            <li v-if="iosLive">
              <a
                :href="appStoreUrl('landing-footer')"
                class="hover:text-green-400 transition-colors"
                >iPhone &amp; iPad App</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-white mb-4">Get in Touch</h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <MailIcon class="w-4 h-4 shrink-0" />
              <a
                href="mailto:info@therecruitingcompass.com"
                class="hover:text-green-400 transition-colors"
              >
                info@therecruitingcompass.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400"
      >
        <p>&copy; 2026 The Recruiting Compass. All rights reserved.</p>
        <p class="mt-2">
          <NuxtLink
            to="/legal/privacy"
            class="hover:text-green-400 transition-colors"
            >Privacy Policy</NuxtLink
          >
          <span class="mx-1">•</span>
          <NuxtLink
            to="/legal/terms"
            class="hover:text-green-400 transition-colors"
            >Terms of Service</NuxtLink
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import BrandHorizontal from "~/components/icons/BrandHorizontal.vue";
import {
  MailIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
} from "~/components/landing-icons";
import {
  SOCIAL,
  WEB_APP_URL,
  iosLive,
  appStoreUrl,
  webSignupUrl,
} from "~/data/site";
</script>
