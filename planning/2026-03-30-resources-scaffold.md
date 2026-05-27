# Resources Knowledge Base — Scaffold Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold `recruiting-compass-resources` — a Nuxt 3 + Nuxt Content v3 knowledge base for college athletics recruiting, deployed independently on Vercel and served at `therecruitingcompass.com/resources/*` via rewrite.

**Architecture:** Nuxt 3 with `app.baseURL: '/resources'` keeps all routes and static assets under `/resources/*`, avoiding collisions with the landing site's own assets. Nuxt Content v3 with a `resources` collection drives markdown articles via SSG. The Beehiiv newsletter API is called via a `/resources-api/newsletter` rewrite on the landing site — same domain, no CORS issues. Two Vercel rewrites in the landing site wire everything together: one for pages, one for the API.

**Tech Stack:** Nuxt 3, `@nuxt/content` v3, `@nuxtjs/tailwindcss`, TypeScript, Vercel, Beehiiv subscriber API, Unsplash (image URLs stored in frontmatter)

---

## Routing Architecture Note

With `app.baseURL: '/resources'`:
- All Nuxt page routes live at `/resources/*` (pages/index.vue → `/resources/`)
- `route.path` strips the base: visiting `/resources/timelines/junior-year` gives `route.path = '/timelines/junior-year'`
- Content files at `content/resources/[category]/[slug].md` have Nuxt Content internal path `/resources/[category]/[slug]`
- Content queries must re-add the base: `queryCollection('resources').path('/resources' + route.path).first()`
- Static assets land at `/resources/_nuxt/` — covered by the landing site's `/resources/:path*` rewrite

Landing site needs **two rewrites** (add to `vercel.json` after first resources deploy):
```json
{
  "rewrites": [
    {
      "source": "/resources-api/:path*",
      "destination": "https://RESOURCES_VERCEL_URL/api/:path*"
    },
    {
      "source": "/resources/:path*",
      "destination": "https://RESOURCES_VERCEL_URL/resources/:path*"
    }
  ]
}
```
The newsletter form posts to `/resources-api/newsletter` (same domain → rewrite → resources app `/api/newsletter`).

---

## File Structure

```
recruiting-compass-resources/
├── .env.example
├── .gitignore
├── content.config.ts
├── nuxt.config.ts
├── tailwind.config.cjs
├── app.vue
├── assets/css/main.css
├── components/
│   ├── ArticleCard.vue
│   ├── ArticleMeta.vue
│   ├── AudienceFilter.vue
│   ├── BreadcrumbNav.vue
│   ├── CategoryCard.vue
│   ├── CategoryIcon.vue
│   ├── RelatedArticles.vue
│   ├── ResourceCTA.vue
│   └── icons/
│       ├── IconCommitments.vue
│       ├── IconDivisions.vue
│       ├── IconEligibility.vue
│       ├── IconNcaaRules.vue
│       ├── IconOutreach.vue
│       ├── IconScholarships.vue
│       ├── IconShowcases.vue
│       └── IconTimelines.vue
├── composables/useCategories.ts
├── content/resources/
│   ├── eligibility/
│   ├── timelines/junior-year-recruiting-guide.md
│   ├── outreach/how-to-write-a-recruiting-email.md
│   ├── showcases/
│   ├── scholarships/
│   ├── divisions/
│   ├── commitments/
│   └── ncaa-rules/
├── pages/
│   ├── index.vue
│   └── [category]/
│       ├── index.vue
│       └── [slug].vue
├── server/
│   └── api/newsletter.post.ts
└── vercel.json
```

---

## Task 1: Initialize repo and install dependencies

**Files:** `package.json`, `nuxt.config.ts`, `tsconfig.json`, `.gitignore`

- [ ] **Step 1: Create the repo directory and initialize Nuxt**

```bash
mkdir /Volumes/AlphabetSoup/TheRecruitingCompass/code/recruiting-compass-resources
cd /Volumes/AlphabetSoup/TheRecruitingCompass/code/recruiting-compass-resources
npx nuxi@latest init . --package-manager npm
```

Select the default template when prompted. Accept all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install @nuxt/content @nuxtjs/tailwindcss
npm install -D tailwindcss@^3 autoprefixer @tailwindcss/typography
```

- [ ] **Step 3: Initialize git and make the first commit**

```bash
git init
git add .
git commit -m "chore: initialize nuxt 3 project"
```

---

## Task 2: Configure nuxt.config.ts

**Files:** `nuxt.config.ts`

- [ ] **Step 1: Replace nuxt.config.ts with the full configuration**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  app: {
    baseURL: '/resources',
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  runtimeConfig: {
    beehiivApiKey: '',        // NUXT_BEEHIIV_API_KEY
    beehiivPublicationId: '', // NUXT_BEEHIIV_PUBLICATION_ID
    public: {
      siteUrl: 'https://therecruitingcompass.com',
      appUrl: 'https://myrecruitingcompass.com',
      // In dev: /api — in prod (behind landing site rewrite): /resources-api
      apiPrefix: '/api',
    },
  },

  devtools: { enabled: true },
})
```

- [ ] **Step 2: Verify the dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:3000/resources` with no errors.

- [ ] **Step 3: Commit**

```bash
git add nuxt.config.ts
git commit -m "chore: configure nuxt — baseURL /resources, content module, SSG prerender"
```

---

## Task 3: content.config.ts — collection schema

**Files:** `content.config.ts`, `content/resources/` directory tree

- [ ] **Step 1: Create content.config.ts**

```typescript
// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    resources: defineCollection({
      type: 'page',
      source: 'resources/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
        category: z.enum([
          'eligibility', 'timelines', 'outreach', 'showcases',
          'scholarships', 'divisions', 'commitments', 'ncaa-rules',
        ]),
        audience: z.enum(['player', 'parent', 'both']),
        stage: z.enum(['freshman', 'sophomore', 'junior', 'senior', 'all']),
        lastUpdated: z.string(),
        lastReviewed: z.string(),
        tags: z.array(z.string()).optional(),
        heroImage: z.string().optional(),
        ogImage: z.string().optional(),
        draft: z.boolean().optional().default(false),
      }),
    }),
  },
})
```

- [ ] **Step 2: Create the 8 category content directories**

```bash
mkdir -p content/resources/{eligibility,timelines,outreach,showcases,scholarships,divisions,commitments,ncaa-rules}
```

- [ ] **Step 3: Commit**

```bash
git add content.config.ts content/
git commit -m "chore: add content collection schema and 8 category directories"
```

---

## Task 4: Tailwind config + global CSS (emerald palette + field-lines)

**Files:** `tailwind.config.cjs`, `assets/css/main.css`

- [ ] **Step 1: Create tailwind.config.cjs**

```javascript
// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

Tailwind's built-in `emerald-500/600/700` scale is used directly — no custom tokens needed (matches the app).

- [ ] **Step 2: Create assets/css/main.css**

```css
/* assets/css/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  /**
   * Sports field white-line motif.
   * Apply to a `relative overflow-hidden` container.
   * Matches the pattern already used at myrecruitingcompass.com.
   */
  .field-lines::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.15) 20px,
      rgba(255, 255, 255, 0.15) 22px
    );
    pointer-events: none;
  }
}
```

- [ ] **Step 3: Verify Tailwind processes without errors**

```bash
npm run dev
```

Expected: dev server starts, no PostCSS/Tailwind errors in console.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.cjs assets/
git commit -m "chore: add tailwind config with typography plugin and field-lines CSS utility"
```

---

## Task 5: app.vue + layouts/default.vue

**Files:** `app.vue`, `layouts/default.vue`

- [ ] **Step 1: Create layouts/default.vue**

```vue
<!-- layouts/default.vue -->
<script setup lang="ts">
const { public: config } = useRuntimeConfig()
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <header class="bg-emerald-700 text-white shadow-md">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg hover:text-emerald-200 transition-colors">
          <span>🧭</span>
          <span>Recruiting Resources</span>
        </NuxtLink>
        <a
          :href="config.appUrl"
          class="bg-white text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-colors"
        >
          Open App →
        </a>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-emerald-900 text-emerald-200 text-sm py-8">
      <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p class="font-semibold text-white">The Recruiting Compass</p>
          <p class="mt-1">Free resources for college athletics recruiting.</p>
        </div>
        <div class="flex flex-col gap-1">
          <a :href="config.appUrl" class="hover:text-white transition-colors">Open App →</a>
          <NuxtLink to="/" class="hover:text-white transition-colors">All Resources</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
```

- [ ] **Step 2: Update app.vue**

```vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 3: Verify layout renders at http://localhost:3000/resources**

```bash
npm run dev
```

Expected: emerald header with compass emoji, "Open App →" button, footer. No console errors.

- [ ] **Step 4: Commit**

```bash
git add app.vue layouts/
git commit -m "feat: add default layout with emerald header and footer"
```

---

## Task 6: useCategories composable

**Files:** `composables/useCategories.ts`

- [ ] **Step 1: Create the composable**

```typescript
// composables/useCategories.ts
export interface Category {
  slug: string
  name: string
  description: string
}

export const CATEGORIES: Category[] = [
  { slug: 'eligibility',  name: 'Eligibility & Academics', description: 'GPA, test scores, NCAA clearinghouse' },
  { slug: 'timelines',    name: 'Recruiting Timelines',    description: 'When to start, what to do each year' },
  { slug: 'outreach',     name: 'Contacting Coaches',      description: 'Emails, calls, and campus visits' },
  { slug: 'showcases',    name: 'Showcases & Camps',       description: 'Which events matter, how to get noticed' },
  { slug: 'scholarships', name: 'Scholarships & Aid',      description: 'Athletic scholarships, NLI, roster limits' },
  { slug: 'divisions',    name: 'Division Levels',         description: 'D1 / D2 / D3 / NAIA / JUCO differences' },
  { slug: 'commitments',  name: 'Offers & Commitments',    description: 'Verbal commitments and NLI signing' },
  { slug: 'ncaa-rules',   name: 'NCAA Rules',              description: 'Contact restrictions and compliance' },
]

export function useCategories() {
  function getCategoryBySlug(slug: string): Category | undefined {
    return CATEGORIES.find(c => c.slug === slug)
  }

  return { categories: CATEGORIES, getCategoryBySlug }
}
```

- [ ] **Step 2: Commit**

```bash
git add composables/
git commit -m "feat: add useCategories composable with 8 locked category definitions"
```

---

## Task 7: Category icon SVG components + CategoryIcon wrapper

**Files:** `components/icons/Icon*.vue` (8 files), `components/CategoryIcon.vue`

All icons use Heroicons SVG paths (MIT license). Size is controlled by the parent via Tailwind class.

- [ ] **Step 1: Create components/icons/IconEligibility.vue (academic cap)**

```vue
<!-- components/icons/IconEligibility.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
  </svg>
</template>
```

- [ ] **Step 2: Create components/icons/IconTimelines.vue (calendar)**

```vue
<!-- components/icons/IconTimelines.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
  </svg>
</template>
```

- [ ] **Step 3: Create components/icons/IconOutreach.vue (envelope)**

```vue
<!-- components/icons/IconOutreach.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
</template>
```

- [ ] **Step 4: Create components/icons/IconShowcases.vue (trophy)**

```vue
<!-- components/icons/IconShowcases.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.35A6.98 6.98 0 0110 15v2.25H8.25v.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5v-.75H14V15a6.98 6.98 0 01-.948-3.769 6.73 6.73 0 002.743-1.35 6.753 6.753 0 006.138-5.6.75.75 0 00-.584-.86 47.539 47.539 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.806 49.806 0 00-9.744 0 .75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clip-rule="evenodd" />
  </svg>
</template>
```

- [ ] **Step 5: Create components/icons/IconScholarships.vue (banknotes)**

```vue
<!-- components/icons/IconScholarships.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd" />
    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
  </svg>
</template>
```

- [ ] **Step 6: Create components/icons/IconDivisions.vue (bar chart)**

```vue
<!-- components/icons/IconDivisions.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
  </svg>
</template>
```

- [ ] **Step 7: Create components/icons/IconCommitments.vue (check badge)**

```vue
<!-- components/icons/IconCommitments.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
  </svg>
</template>
```

- [ ] **Step 8: Create components/icons/IconNcaaRules.vue (book open)**

```vue
<!-- components/icons/IconNcaaRules.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
  </svg>
</template>
```

- [ ] **Step 9: Create components/CategoryIcon.vue (wrapper — avoids dynamic resolveComponent complexity)**

```vue
<!-- components/CategoryIcon.vue -->
<script setup lang="ts">
defineProps<{ slug: string }>()
</script>

<template>
  <IconEligibility  v-if="slug === 'eligibility'" />
  <IconTimelines    v-else-if="slug === 'timelines'" />
  <IconOutreach     v-else-if="slug === 'outreach'" />
  <IconShowcases    v-else-if="slug === 'showcases'" />
  <IconScholarships v-else-if="slug === 'scholarships'" />
  <IconDivisions    v-else-if="slug === 'divisions'" />
  <IconCommitments  v-else-if="slug === 'commitments'" />
  <IconNcaaRules    v-else-if="slug === 'ncaa-rules'" />
</template>
```

- [ ] **Step 10: Commit**

```bash
git add components/
git commit -m "feat: add 8 category SVG icon components and CategoryIcon wrapper"
```

---

## Task 8: Hub page (pages/index.vue) + CategoryCard.vue

**Files:** `pages/index.vue`, `components/CategoryCard.vue`

- [ ] **Step 1: Create components/CategoryCard.vue**

```vue
<!-- components/CategoryCard.vue -->
<script setup lang="ts">
import type { Category } from '~/composables/useCategories'

defineProps<{
  category: Category
  articleCount: number
}>()
</script>

<template>
  <NuxtLink
    :to="`/${category.slug}`"
    class="block bg-white rounded-xl border border-slate-200 p-6 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 group"
  >
    <CategoryIcon :slug="category.slug" class="w-10 h-10 text-emerald-600 mb-4" />
    <h2 class="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
      {{ category.name }}
    </h2>
    <p class="text-sm text-slate-500 mt-1 leading-snug">{{ category.description }}</p>
    <span class="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-3">
      {{ articleCount }} {{ articleCount === 1 ? 'article' : 'articles' }}
    </span>
  </NuxtLink>
</template>
```

- [ ] **Step 2: Create pages/index.vue**

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const { categories } = useCategories()
const { public: config } = useRuntimeConfig()

const { data: allArticles } = await useAsyncData('hub-articles', () =>
  queryCollection('resources').where('draft', '<>', true).all()
)

const countByCategory = computed(() => {
  const counts: Record<string, number> = {}
  for (const article of allArticles.value ?? []) {
    counts[article.category] = (counts[article.category] ?? 0) + 1
  }
  return counts
})

useSeoMeta({
  title: 'College Recruiting Resources | The Recruiting Compass',
  description: 'Free guides for college athletics recruiting — eligibility, timelines, contacting coaches, scholarships, and more.',
  ogTitle: 'College Recruiting Resources | The Recruiting Compass',
  ogDescription: 'Free guides for college athletics recruiting — eligibility, timelines, contacting coaches, scholarships, and more.',
  ogUrl: `${config.siteUrl}/resources`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'College Recruiting Resources | The Recruiting Compass',
  twitterDescription: 'Free guides for college athletics recruiting.',
})
</script>

<template>
  <div>
    <!-- Hero with field-lines motif -->
    <section class="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 overflow-hidden">
      <div class="field-lines absolute inset-0" />
      <div class="relative max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight">Recruiting Resources</h1>
        <p class="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
          Everything you need to navigate college athletics recruiting — free, clear, and always up to date.
        </p>
      </div>
    </section>

    <!-- Category grid -->
    <section class="max-w-6xl mx-auto px-4 py-12">
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Browse by Topic</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CategoryCard
          v-for="category in categories"
          :key="category.slug"
          :category="category"
          :article-count="countByCategory[category.slug] ?? 0"
        />
      </div>
    </section>
  </div>
</template>
```

- [ ] **Step 3: Verify at http://localhost:3000/resources**

Expected: field-lines hero, 8 category cards with emerald icons, all showing "0 articles".

- [ ] **Step 4: Commit**

```bash
git add pages/index.vue components/CategoryCard.vue
git commit -m "feat: add hub page with field-lines hero and 8 category cards"
```

---

## Task 9: Category listing page + ArticleCard.vue + AudienceFilter.vue

**Files:** `pages/[category]/index.vue`, `components/ArticleCard.vue`, `components/AudienceFilter.vue`

- [ ] **Step 1: Create components/AudienceFilter.vue**

```vue
<!-- components/AudienceFilter.vue -->
<script setup lang="ts">
defineProps<{ modelValue: 'all' | 'player' | 'parent' }>()
const emit = defineEmits<{ 'update:modelValue': ['all' | 'player' | 'parent'] }>()

const options = [
  { value: 'all',    label: 'All' },
  { value: 'player', label: 'Players' },
  { value: 'parent', label: 'Parents' },
] as const
</script>

<template>
  <div class="flex gap-2" role="group" aria-label="Filter by audience">
    <button
      v-for="option in options"
      :key="option.value"
      :class="[
        'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
        modelValue === option.value
          ? 'bg-emerald-600 text-white'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
```

- [ ] **Step 2: Create components/ArticleCard.vue**

```vue
<!-- components/ArticleCard.vue -->
<script setup lang="ts">
interface Article {
  title: string
  description: string
  slug: string
  category: string
  audience: string
  stage: string
  lastReviewed: string
  heroImage?: string
}

defineProps<{ article: Article }>()

const stageLabel: Record<string, string> = {
  freshman: 'Freshman', sophomore: 'Sophomore',
  junior: 'Junior', senior: 'Senior', all: 'All Years',
}
</script>

<template>
  <NuxtLink
    :to="`/${article.category}/${article.slug}`"
    class="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-400 hover:shadow-md transition-all duration-200 group"
  >
    <!-- Hero image -->
    <div class="h-40 bg-emerald-50 overflow-hidden flex items-center justify-center">
      <img
        v-if="article.heroImage"
        :src="article.heroImage"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <CategoryIcon v-else :slug="article.category" class="w-12 h-12 text-emerald-200" />
    </div>

    <div class="flex-1 p-5">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <span class="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          {{ stageLabel[article.stage] ?? article.stage }}
        </span>
        <span v-if="article.audience !== 'both'" class="text-xs text-slate-400">
          {{ article.audience === 'player' ? 'Players' : 'Parents' }}
        </span>
      </div>
      <h3 class="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
        {{ article.title }}
      </h3>
      <p class="text-sm text-slate-500 mt-1 line-clamp-2">{{ article.description }}</p>
    </div>

    <div class="px-5 pb-4 text-xs text-slate-400">
      Reviewed {{ article.lastReviewed }}
    </div>
  </NuxtLink>
</template>
```

- [ ] **Step 3: Create pages/[category]/index.vue**

```vue
<!-- pages/[category]/index.vue -->
<script setup lang="ts">
const route = useRoute()
const categorySlug = route.params.category as string
const { getCategoryBySlug } = useCategories()
const category = getCategoryBySlug(categorySlug)

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

const { data: articles } = await useAsyncData(`category-${categorySlug}`, () =>
  queryCollection('resources')
    .where('category', '=', categorySlug)
    .where('draft', '<>', true)
    .all()
)

const audienceFilter = ref<'all' | 'player' | 'parent'>('all')

const filteredArticles = computed(() => {
  if (audienceFilter.value === 'all') return articles.value ?? []
  return (articles.value ?? []).filter(
    a => a.audience === audienceFilter.value || a.audience === 'both'
  )
})

const { public: config } = useRuntimeConfig()

useSeoMeta({
  title: `${category.name} | The Recruiting Compass`,
  description: `${category.description} — free guides for college athletics recruiting.`,
  ogTitle: `${category.name} | The Recruiting Compass`,
  ogDescription: `${category.description} — free guides for college athletics recruiting.`,
  ogUrl: `${config.siteUrl}/resources/${categorySlug}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <section class="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 overflow-hidden">
      <div class="field-lines absolute inset-0" />
      <div class="relative max-w-4xl mx-auto px-4 py-12 text-white">
        <BreadcrumbNav :category="category" />
        <div class="flex items-center gap-4 mt-4">
          <CategoryIcon :slug="categorySlug" class="w-12 h-12 text-emerald-200" />
          <div>
            <h1 class="text-3xl font-bold">{{ category.name }}</h1>
            <p class="text-emerald-100 mt-1">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-10">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <p class="text-sm text-slate-500">
          {{ filteredArticles.length }} {{ filteredArticles.length === 1 ? 'article' : 'articles' }}
        </p>
        <AudienceFilter v-model="audienceFilter" />
      </div>

      <div v-if="filteredArticles.length === 0" class="text-center py-16 text-slate-400">
        <p class="text-lg">No articles yet in this category.</p>
        <p class="text-sm mt-2">Content is added regularly — check back soon.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
      </div>
    </section>
  </div>
</template>
```

- [ ] **Step 4: Verify at http://localhost:3000/resources/timelines**

Expected: emerald hero with calendar icon and "Recruiting Timelines" heading, audience filter buttons, empty article grid.

- [ ] **Step 5: Commit**

```bash
git add pages/[category]/ components/ArticleCard.vue components/AudienceFilter.vue
git commit -m "feat: add category listing page with article cards and audience filter"
```

---

## Task 10: Article page + ArticleMeta.vue + BreadcrumbNav.vue

**Files:** `pages/[category]/[slug].vue`, `components/ArticleMeta.vue`, `components/BreadcrumbNav.vue`

- [ ] **Step 1: Create components/BreadcrumbNav.vue**

```vue
<!-- components/BreadcrumbNav.vue -->
<script setup lang="ts">
import type { Category } from '~/composables/useCategories'

defineProps<{
  category: Category
  articleTitle?: string
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm text-emerald-200 flex-wrap">
    <NuxtLink to="/" class="hover:text-white transition-colors">Resources</NuxtLink>
    <span aria-hidden="true">›</span>
    <NuxtLink :to="`/${category.slug}`" class="hover:text-white transition-colors">
      {{ category.name }}
    </NuxtLink>
    <template v-if="articleTitle">
      <span aria-hidden="true">›</span>
      <span class="text-white truncate max-w-[200px]">{{ articleTitle }}</span>
    </template>
  </nav>
</template>
```

- [ ] **Step 2: Create components/ArticleMeta.vue**

```vue
<!-- components/ArticleMeta.vue -->
<script setup lang="ts">
defineProps<{
  lastReviewed: string
  audience: string
  stage: string
}>()

const audienceLabel: Record<string, string> = {
  player: 'Players', parent: 'Parents', both: 'Players & Parents',
}
const stageLabel: Record<string, string> = {
  freshman: 'Freshman Year', sophomore: 'Sophomore Year',
  junior: 'Junior Year', senior: 'Senior Year', all: 'All Years',
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
    <span class="inline-flex items-center gap-1 text-emerald-100 bg-emerald-600/50 px-3 py-1 rounded-full font-medium">
      ✓ Reviewed {{ lastReviewed }}
    </span>
    <span class="text-emerald-200">{{ stageLabel[stage] ?? stage }}</span>
    <span class="text-emerald-300">·</span>
    <span class="text-emerald-200">{{ audienceLabel[audience] ?? audience }}</span>
  </div>
</template>
```

- [ ] **Step 3: Create pages/[category]/[slug].vue**

```vue
<!-- pages/[category]/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const categorySlug = route.params.category as string
const slug = route.params.slug as string

const { getCategoryBySlug } = useCategories()
const category = getCategoryBySlug(categorySlug)

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

// route.path = /[category]/[slug] (base stripped by Nuxt)
// Nuxt Content path = /resources/[category]/[slug]
const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('resources').path('/resources' + route.path).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const { public: config } = useRuntimeConfig()
const canonicalUrl = `${config.siteUrl}/resources/${categorySlug}/${slug}`
const ogImage = article.value.ogImage ?? article.value.heroImage ?? `${config.siteUrl}/og-default.png`

useSeoMeta({
  title: `${article.value.title} | The Recruiting Compass`,
  description: article.value.description,
  ogTitle: article.value.title,
  ogDescription: article.value.description,
  ogImage,
  ogUrl: canonicalUrl,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: article.value.title,
  twitterDescription: article.value.description,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [{ property: 'article:modified_time', content: article.value.lastReviewed }],
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 overflow-hidden">
      <div class="field-lines absolute inset-0" />
      <img
        v-if="article.heroImage"
        :src="article.heroImage"
        :alt="article.title"
        class="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div class="relative max-w-4xl mx-auto px-4 py-12 text-white">
        <BreadcrumbNav :category="category" :article-title="article.title" />
        <h1 class="text-3xl md:text-4xl font-bold mt-4 leading-tight">{{ article.title }}</h1>
        <p class="text-emerald-100 mt-3 text-lg max-w-2xl">{{ article.description }}</p>
        <div class="mt-4">
          <ArticleMeta
            :last-reviewed="article.lastReviewed"
            :audience="article.audience"
            :stage="article.stage"
          />
        </div>
      </div>
    </section>

    <!-- Body -->
    <div class="max-w-4xl mx-auto px-4 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <article class="prose prose-slate max-w-none
          prose-headings:text-slate-900
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-800">
          <ContentRenderer :value="article" />
        </article>
        <aside class="space-y-6">
          <ResourceCTA variant="waitlist" />
          <RelatedArticles :category-slug="categorySlug" :current-slug="slug" />
        </aside>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add pages/[category]/[slug].vue components/ArticleMeta.vue components/BreadcrumbNav.vue
git commit -m "feat: add article page with hero, ContentRenderer, breadcrumb, and meta"
```

---

## Task 11: RelatedArticles.vue

**Files:** `components/RelatedArticles.vue`

- [ ] **Step 1: Create the component**

```vue
<!-- components/RelatedArticles.vue -->
<script setup lang="ts">
const props = defineProps<{
  categorySlug: string
  currentSlug: string
}>()

const { data: related } = await useAsyncData(`related-${props.currentSlug}`, () =>
  queryCollection('resources')
    .where('category', '=', props.categorySlug)
    .where('slug', '<>', props.currentSlug)
    .where('draft', '<>', true)
    .limit(3)
    .all()
)
</script>

<template>
  <div v-if="related && related.length > 0" class="bg-emerald-50 rounded-xl p-5">
    <h3 class="font-semibold text-slate-800 text-sm uppercase tracking-wide mb-3">Related Articles</h3>
    <ul class="space-y-3">
      <li v-for="article in related" :key="article.slug">
        <NuxtLink
          :to="`/${article.category}/${article.slug}`"
          class="text-sm text-emerald-700 hover:text-emerald-900 font-medium leading-snug"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add components/RelatedArticles.vue
git commit -m "feat: add RelatedArticles sidebar component"
```

---

## Task 12: ResourceCTA.vue + Beehiiv server route

**Files:** `components/ResourceCTA.vue`, `server/api/newsletter.post.ts`

- [ ] **Step 1: Create server/api/newsletter.post.ts**

```typescript
// server/api/newsletter.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event)

  if (!body?.email || !body.email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'Valid email required' })
  }

  const config = useRuntimeConfig()

  if (!config.beehiivApiKey || !config.beehiivPublicationId) {
    throw createError({ statusCode: 500, statusMessage: 'Newsletter not configured' })
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${config.beehiivPublicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.beehiivApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'resources-site',
        utm_medium: 'article-cta',
      }),
    }
  )

  if (!response.ok) {
    console.error('Beehiiv error:', response.status, await response.text())
    throw createError({ statusCode: 502, statusMessage: 'Failed to subscribe — please try again' })
  }

  return { success: true }
})
```

- [ ] **Step 2: Create components/ResourceCTA.vue**

The form POSTs to `/api/newsletter` in dev (direct to this app) and `/resources-api/newsletter` in production (via landing site rewrite, configured via `NUXT_PUBLIC_API_PREFIX`).

```vue
<!-- components/ResourceCTA.vue -->
<script setup lang="ts">
defineProps<{ variant?: 'waitlist' | 'app' }>()

const { public: config } = useRuntimeConfig()

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function subscribe() {
  if (!email.value || !email.value.includes('@')) return
  status.value = 'loading'
  errorMessage.value = ''
  try {
    // apiPrefix: '/api' in dev, '/resources-api' in production (see .env.example)
    await $fetch(`${config.apiPrefix}/newsletter`, {
      method: 'POST',
      body: { email: email.value },
    })
    status.value = 'success'
    email.value = ''
  } catch {
    status.value = 'error'
    errorMessage.value = 'Something went wrong — please try again.'
  }
}
</script>

<template>
  <div class="bg-emerald-700 text-white rounded-xl p-6">
    <h3 class="font-bold text-lg">Track Your Recruiting Journey</h3>
    <p class="text-emerald-100 text-sm mt-1 mb-4">
      The Recruiting Compass helps student-athletes manage their college search in one place.
    </p>

    <a
      :href="variant === 'app' ? `${config.appUrl}/signup` : `${config.appUrl}/waitlist`"
      class="block w-full bg-white text-emerald-700 font-semibold text-center py-2.5 rounded-lg hover:bg-emerald-50 transition-colors mb-4"
    >
      {{ variant === 'app' ? 'Create Free Account' : 'Join the Waitlist' }}
    </a>

    <div class="border-t border-emerald-600 pt-4">
      <p class="text-sm text-emerald-200 mb-2">Get recruiting tips by email:</p>

      <div v-if="status === 'success'" class="text-sm text-emerald-100 bg-emerald-600 rounded-lg px-3 py-2">
        ✓ You're subscribed — check your inbox!
      </div>
      <form v-else @submit.prevent="subscribe" class="flex gap-2">
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          required
          class="flex-1 px-3 py-2 rounded-lg text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          :disabled="status === 'loading'"
          class="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          {{ status === 'loading' ? '…' : 'Subscribe' }}
        </button>
      </form>
      <p v-if="status === 'error'" class="text-xs text-red-300 mt-1">{{ errorMessage }}</p>
    </div>
  </div>
</template>
```

- [ ] **Step 3: Add `apiPrefix` to runtimeConfig in nuxt.config.ts**

```typescript
// In runtimeConfig.public, add:
apiPrefix: '/api', // NUXT_PUBLIC_API_PREFIX — set to /resources-api in Vercel production
```

- [ ] **Step 4: Commit**

```bash
git add components/ResourceCTA.vue server/ nuxt.config.ts
git commit -m "feat: add ResourceCTA with Beehiiv newsletter and app CTA"
```

---

## Task 13: MVP content — 2 articles

**Files:** `content/resources/timelines/junior-year-recruiting-guide.md`, `content/resources/outreach/how-to-write-a-recruiting-email.md`

- [ ] **Step 1: Create content/resources/timelines/junior-year-recruiting-guide.md**

```markdown
---
title: "The Junior Year Recruiting Guide: What to Do and When"
description: "Junior year is the most critical recruiting year for most student-athletes. Here's exactly what to do, month by month, to maximize your chances."
slug: junior-year-recruiting-guide
category: timelines
audience: both
stage: junior
lastUpdated: 2026-03-30
lastReviewed: 2026-03-30
tags:
  - junior year
  - recruiting timeline
heroImage: https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80
---

Junior year is when most recruiting decisions get made. Coaches are watching, evaluating, and extending offers. Here's how to make the most of it.

## Why Junior Year Matters Most

College coaches have limited scholarships and roster spots. They need to know by spring of your junior year whether you're on their list — because they're already planning their incoming class. If you wait until senior year, the spots are often gone.

## Month-by-Month Plan

### September–October

**Update your recruiting profile.** Stats from sophomore year should be in. Make sure your height, weight, GPA, and test scores are current everywhere coaches might find you.

**Contact coaches proactively.** After September 1 of your junior year, Division I coaches can contact you directly. But you don't have to wait — you can email them at any point.

**Attend fall showcases.** Many programs evaluate heavily in the fall. Ask your coach which showcases have the most college attendance in your area.

### November–December

**Follow up with coaches who watched you.** If a coach was at a tournament or showcase, email them the week after. Keep it short: who you are, what they saw, your stats, your interest level.

**Take campus visits.** Unofficial visits are always allowed and cost nothing except travel. Visit schools you're genuinely considering before the spring rush.

### January–February

**Narrow your list.** You should have a working list of 10–20 schools by now. Not all will work out — but you need a realistic target range across division levels.

**Prepare for standardized tests.** NCAA eligibility requires meeting GPA + test score thresholds. If you're taking the SAT or ACT this spring, prepare now.

### March–May

**Spring showcases are high-stakes.** This is when many coaches finalize their class decisions. Be physically ready and emotionally prepared.

**Expect offers.** If coaches are serious, verbal offers typically come in spring of junior year. Know the difference between a verbal offer (not binding) and an NLI (which is binding).

**Official visits begin April 1.** After April 1 of junior year, you can take official visits — the college pays travel. You're allowed 5 official visits total across all schools.

## Common Mistakes

- **Waiting too long to reach out.** Coaches respect proactive athletes.
- **Not following up after events.** A single email after a showcase can move you from the "maybe" list to the "yes" list.
- **Ignoring academics.** Coaches check transcripts. A bad semester junior year costs offers.
- **Feeling pressured to commit early.** Verbal commitments are not binding. Commit when you're ready.

## What Coaches Want to Know

By the end of junior year, coaches want to know four things:

1. Can you play at their level?
2. Are you academically eligible?
3. Are you genuinely interested in their program?
4. Will you fit their culture?

Answer those four questions clearly in every interaction, and you'll be ahead of most recruits.
```

- [ ] **Step 2: Create content/resources/outreach/how-to-write-a-recruiting-email.md**

```markdown
---
title: "How to Write a Recruiting Email That Gets a Response"
description: "A practical guide to cold-emailing college coaches — what to include, what to avoid, and how to follow up without being annoying."
slug: how-to-write-a-recruiting-email
category: outreach
audience: player
stage: all
lastUpdated: 2026-03-30
lastReviewed: 2026-03-30
tags:
  - emailing coaches
  - cold outreach
  - communication
heroImage: https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&q=80
---

Most recruiting emails get ignored — not because coaches are rude, but because they're overwhelmed. Here's how to write one that actually gets read.

## The Brutal Truth About Coach Inboxes

Division I coaches receive hundreds of emails from recruits every week. They skim subject lines and delete most without opening. Your email needs to answer three questions in the first two sentences:

1. Who are you?
2. Why are you emailing this program specifically?
3. Why should they care?

## The Formula

**Subject line:**
```
[Grad Year] [Position] | [State] | [Key Stat or Achievement]
Example: 2027 SS | Texas | .420 BA, 3 State Appearances
```

**Body:**
```
Coach [Last Name],

I'm [Full Name], a [grad year] [position] from [City, State] at [High School].
I'm interested in [University]'s program because [one specific reason].

My highlights this season: [2-3 key stats or accomplishments].
My GPA is [X.X] and I scored [score] on the [SAT/ACT].

I'd love to know if [University] might be a fit. Is there a good time to connect?

[Full Name]
[Phone]
[Link to film/Hudl profile]
```

## What to Include

**Your basics, immediately.** Grad year, position, location. Coaches filter by class year before anything else.

**One real reason you're emailing them.** "Your program's reputation" is generic. "Your program has produced three All-Conference shortstops in the last four years and I want to play at that level" shows you've done homework.

**Your best 2–3 numbers.** Batting average, ERA, GPA, 40 time — whatever is strongest. Don't list everything.

**A link to film.** A Hudl highlight or YouTube clip. Coaches won't watch a full game. Give them 3–5 minutes of your best plays.

## What to Leave Out

- Your full stats table (save it for a profile sheet)
- Long backstory about why you love the sport
- "I know this is a long shot, but..." — never apologize for reaching out
- Generic compliments that could apply to any program

## The Follow-Up

Send the initial email. If no response after two weeks, send a one-line follow-up:

```
Coach [Last Name] — just wanted to make sure my email didn't get buried.
Still very interested in [University]. Happy to send more info.

[Full Name]
```

One follow-up is professional. Two is persistence. Three is pushy. After three with no response, focus your energy on programs that are engaging.

## Timing Matters

- **After September 1 of junior year:** D1 coaches can now contact you directly. Many are active in their inboxes.
- **After a tournament or showcase:** Email within a week. "I was at [Event] and I believe your staff was there" is a strong opener.
- **Avoid:** Friday afternoons, holiday weeks, dead periods. Send Tuesday–Thursday mornings.

## Volume Matters

Sending 5 emails and waiting is not a recruiting strategy. Serious recruits send 50–100 emails over a full year. Cast a wide net, then narrow it based on who responds with genuine interest.
```

- [ ] **Step 3: Verify articles render**

Navigate to `http://localhost:3000/resources/timelines/junior-year-recruiting-guide`. Expected: article page with Unsplash hero image, prose body, breadcrumb, ResourceCTA in sidebar.

Navigate to `http://localhost:3000/resources`. Expected: timelines and outreach category cards now show "1 article" each.

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "content: add 2 MVP articles — junior year guide and recruiting email guide"
```

---

## Task 14: .env.example + vercel.json

**Files:** `.env.example`, `.gitignore`, `vercel.json`

- [ ] **Step 1: Create .env.example**

```bash
# .env.example

# Beehiiv — server-side only, never expose to browser
NUXT_BEEHIIV_API_KEY=your_beehiiv_api_key_here
NUXT_BEEHIIV_PUBLICATION_ID=your_publication_id_here

# Site URLs
NUXT_PUBLIC_SITE_URL=https://therecruitingcompass.com
NUXT_PUBLIC_APP_URL=https://myrecruitingcompass.com

# In dev: /api  |  In Vercel production: /resources-api  (landing site rewrite)
NUXT_PUBLIC_API_PREFIX=/api
```

- [ ] **Step 2: Create .env from example**

```bash
cp .env.example .env
# Fill in NUXT_BEEHIIV_API_KEY and NUXT_BEEHIIV_PUBLICATION_ID when Beehiiv account is ready
```

- [ ] **Step 3: Ensure .env is in .gitignore**

Open `.gitignore` and confirm `.env` is listed. If not, add it:
```
.env
.env.local
```

- [ ] **Step 4: Create vercel.json in the resources repo**

```json
{
  "buildCommand": "npm run generate",
  "outputDirectory": ".output/public",
  "framework": null
}
```

- [ ] **Step 5: Commit**

```bash
git add .env.example .gitignore vercel.json
git commit -m "chore: add env example and vercel deployment config"
```

---

## Task 15: Landing site rewrite (post-deploy)

> **Do this after the resources repo has been deployed to Vercel and you have its URL.**

**Files:** `vercel.json` in `recruiting-compass-landing`

- [ ] **Step 1: Push resources repo to GitHub and deploy to Vercel**

```bash
cd /Volumes/AlphabetSoup/TheRecruitingCompass/code/recruiting-compass-resources
# Create repo on GitHub first, then:
git remote add origin git@github.com:ORG/recruiting-compass-resources.git
git push -u origin main
```

Then create the Vercel project via dashboard or CLI:
```bash
vercel link   # link to new project
vercel --prod # first production deploy
```

Note the deployed URL (e.g., `recruiting-compass-resources-abc123.vercel.app`).

- [ ] **Step 2: Set environment variables in Vercel for the resources project**

In Vercel dashboard → Settings → Environment Variables, set:
- `NUXT_BEEHIIV_API_KEY` — from Beehiiv dashboard
- `NUXT_BEEHIIV_PUBLICATION_ID` — from Beehiiv dashboard
- `NUXT_PUBLIC_SITE_URL` = `https://therecruitingcompass.com`
- `NUXT_PUBLIC_APP_URL` = `https://myrecruitingcompass.com`
- `NUXT_PUBLIC_API_PREFIX` = `/resources-api`

Redeploy after setting env vars.

- [ ] **Step 3: Create vercel.json in recruiting-compass-landing**

```json
{
  "rewrites": [
    {
      "source": "/resources-api/:path*",
      "destination": "https://recruiting-compass-resources-abc123.vercel.app/api/:path*"
    },
    {
      "source": "/resources/:path*",
      "destination": "https://recruiting-compass-resources-abc123.vercel.app/resources/:path*"
    }
  ]
}
```

Replace `recruiting-compass-resources-abc123.vercel.app` with the actual URL from Step 1.

- [ ] **Step 4: Commit and push the landing site**

```bash
cd /Volumes/AlphabetSoup/TheRecruitingCompass/code/recruiting-compass-landing
git add vercel.json
git commit -m "chore: add rewrites for resources knowledge base and newsletter API"
git push
```

- [ ] **Step 5: Verify end-to-end**

1. Navigate to `https://therecruitingcompass.com/resources` — hub page loads
2. Navigate to `https://therecruitingcompass.com/resources/timelines/junior-year-recruiting-guide` — article loads with prose content
3. Submit the newsletter form — confirm Beehiiv receives the subscriber

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Nuxt 3 + Nuxt Content v3 — Tasks 1–3
- ✅ 8 locked category slugs — Task 6 (composable) + Task 3 (collection schema enum)
- ✅ Full frontmatter schema including `draft` — Task 3
- ✅ `lastReviewed` displayed as trust signal — Task 10 (ArticleMeta)
- ✅ Social OG + Twitter meta tags — Tasks 8, 9, 10 (useSeoMeta on every page)
- ✅ Canonical URL — Task 10 (useHead link tag)
- ✅ article:modified_time — Task 10 (useHead meta)
- ✅ Vercel rewrite — Task 15
- ✅ Emerald palette (emerald-500/600/700) — Task 4 (Tailwind)
- ✅ Field-lines motif — Task 4 (CSS utility), used in Tasks 8, 9, 10
- ✅ Category SVG icons — Task 7
- ✅ Unsplash hero images in frontmatter — Task 13 (content), Task 9 (ArticleCard renders)
- ✅ Newsletter email capture (Beehiiv) — Task 12
- ✅ App CTA — Task 12 (ResourceCTA)
- ✅ Draft flag — Task 3 (schema) + Tasks 9, 11 (where draft <> true)
- ✅ Audience filter — Task 9
- ✅ Related articles — Task 11
- ✅ Breadcrumb — Tasks 9, 10
- ✅ 404 for invalid category/slug — Tasks 9, 10 (createError)
- ✅ 2 MVP articles — Task 13
- ✅ Environment variables — Task 14 (.env.example) + Task 2 (runtimeConfig)
- ✅ `app.baseURL: '/resources'` routing approach — Task 2, documented in routing note
