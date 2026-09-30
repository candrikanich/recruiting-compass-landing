<template>
  <div class="min-h-screen">
    <HeroSection />
    <StatsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PlayerParentSection />
    <AppShowcaseSection />
    <SportsGridSection />
    <FeatureHighlightsSection />
    <FaqSection />
    <CtaSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "~/components/sections/HeroSection.vue";
import StatsSection from "~/components/sections/StatsSection.vue";
import FeaturesSection from "~/components/sections/FeaturesSection.vue";
import HowItWorksSection from "~/components/sections/HowItWorksSection.vue";
import PlayerParentSection from "~/components/sections/PlayerParentSection.vue";
import AppShowcaseSection from "~/components/sections/AppShowcaseSection.vue";
import SportsGridSection from "~/components/sections/SportsGridSection.vue";
import FeatureHighlightsSection from "~/components/sections/FeatureHighlightsSection.vue";
import FaqSection from "~/components/sections/FaqSection.vue";
import CtaSection from "~/components/sections/CtaSection.vue";
import FooterSection from "~/components/sections/FooterSection.vue";
import { faqs } from "~/data/faqs";
import { iosLive, appStoreUrl } from "~/data/site";

useHead({
  title: "College Recruiting: Athletes & Parents",
  meta: [
    {
      name: "description",
      content:
        "Track schools, manage coach relationships and navigate NCAA recruiting. The college recruiting platform for athletes and families in 19 sports.",
    },
  ],
});

useSchemaOrg([
  defineSoftwareApp({
    name: "The Recruiting Compass",
    description:
      "All-in-one college recruiting platform for 19 sports. Track schools, manage coach relationships, and navigate NCAA recruiting with tools built for student athletes and their families.",
    applicationCategory: "SportsApplication",
    operatingSystem: "Web, iOS",
    ...(iosLive ? { downloadUrl: appStoreUrl("schema") } : {}),
  }),
  defineWebPage({ "@type": ["WebPage", "FAQPage"] }),
  ...faqs.map((faq) =>
    defineQuestion({ name: faq.question, acceptedAnswer: faq.answer }),
  ),
]);
</script>
