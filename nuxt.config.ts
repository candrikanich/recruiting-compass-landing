import { defineOrganization } from "nuxt-schema-org/schema";

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Compatibility date
  compatibilityDate: "2026-01-10",

  // SEO modules (@nuxtjs/seo bundles robots, sitemap, og-image, schema-org)
  modules: ["@nuxtjs/seo", "@nuxt/image"],

  // Site-wide SEO foundation — drives canonical URLs, sitemap, robots, schema
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://therecruitingcompass.com",
    name: "The Recruiting Compass",
    description:
      "Helping high school baseball players and their families navigate the college recruiting process with confidence and clarity.",
    defaultLocale: "en",
  },

  // Organization identity for JSON-LD structured data
  schemaOrg: {
    identity: defineOrganization({
      name: "The Recruiting Compass",
      url: "https://therecruitingcompass.com",
      logo: "/images/logo.svg",
      sameAs: [],
    }),
  },

  // Dynamic OG generation disabled — we ship a static social card
  // (/og-image.png) referenced via app.head. Avoids the satori/resvg native
  // dependency chain, which is the right call for a single landing page.
  ogImage: {
    enabled: false,
  },

  // Static site generation
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/legal/privacy", "/legal/terms"],
      // /resources is a Vercel rewrite to a separate deployment, not a Nuxt
      // route — don't try to prerender or crawl it.
      ignore: ["/resources"],
    },
  },

  // /resources is served by the resources app (own sitemap); keep it out of
  // this site's sitemap and skip link-checking it (it 404s at build time).
  sitemap: {
    exclude: ["/resources", "/resources/**"],
  },
  linkChecker: {
    excludeLinks: ["/resources", "/resources/**"],
  },

  // CSS configuration
  css: ["~/assets/css/main.css"],

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // App configuration
  app: {
    head: {
      title: "Navigate Your College Athletics Journey",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Helping high school baseball players and their families navigate the college recruiting process with confidence and clarity.",
        },
        { name: "author", content: "The Recruiting Compass" },
        {
          property: "og:title",
          content:
            "The Recruiting Compass - Navigate Your College Athletics Journey",
        },
        {
          property: "og:description",
          content:
            "Helping high school baseball players and their families navigate the college recruiting process with confidence and clarity.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://therecruitingcompass.com/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "The Recruiting Compass — navigate your path to baseball recruiting success",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://therecruitingcompass.com/og-image.png",
        },
        {
          name: "twitter:title",
          content:
            "The Recruiting Compass - Navigate Your College Athletics Journey",
        },
        {
          name: "twitter:description",
          content:
            "Helping high school baseball players and their families navigate the college recruiting process.",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600&family=Source+Sans+3:wght@400&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },

  // Runtime configuration
  runtimeConfig: {
    resendApiKey: "", // injected from NUXT_RESEND_API_KEY
    resendAudienceId: "", // injected from NUXT_RESEND_AUDIENCE_ID
    // Public keys (exposed to client-side)
    public: {
      typeformFormId: process.env.TYPEFORM_FORM_ID,
      typeformUrl: "https://alphabet.typeform.com/to/",
    },
  },
});
