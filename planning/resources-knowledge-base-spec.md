# Spec: TheRecruitingCompass Resource Center

**Date:** 2026-03-26
**Status:** Draft
**Repo:** `recruiting-compass-resources` (new repo)
**Live at:** `therecruitingcompass.com/resources`

---

## Purpose

A public, free-forever knowledge base for college athletics recruiting. Covers all sports (not baseball-only). Organized by topic, browsable by audience. Serves two jobs simultaneously:

1. **Top-of-funnel content marketing** — organic traffic from social media and search
2. **In-app contextual help** — the main Recruiting Compass app deep-links to specific articles by slug

---

## Key Constraints

- **Slug stability is non-negotiable.** The main app links to specific articles by URL. Once a slug is published, it never changes. Redirects are the only acceptable exception.
- **No auth layer.** All content is public.
- **Git-based publishing only.** One author (Chris), writing `.md` files, deploying via git push.
- **Social sharing is the primary launch traffic source.** OG meta tags and Twitter cards are day-one requirements, not optimizations.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Nuxt 3 | Same as landing site — known stack |
| Content | Nuxt Content v3 | Built for markdown-in-git, has search, generates routes |
| Styling | Tailwind CSS | Shared design language with landing site |
| Deployment | Vercel (separate project) | Independent deploys from the landing site |
| Routing to main domain | Vercel Rewrite on landing site | `therecruitingcompass.com/resources/*` → resources project |

---

## URL Structure

```
/resources                          → Hub: all categories listed
/resources/[category]               → Category page: article list + audience filter
/resources/[category]/[slug]        → Article page
```

### Categories (locked — these are URL segments, never rename)

| Slug | Display Name | Description |
|---|---|---|
| `eligibility` | Eligibility & Academics | GPA, test scores, NCAA clearinghouse, academic requirements |
| `timelines` | Recruiting Timelines | When to start, what to do each year, dead periods |
| `outreach` | Contacting Coaches | Emails, calls, campus visits, unofficial/official visits |
| `showcases` | Showcases & Camps | Which events matter, how to get noticed, tournament strategy |
| `scholarships` | Scholarships & Aid | Athletic scholarships, NLI, roster limits, equivalency vs. headcount |
| `divisions` | Division Levels | D1/D2/D3/NAIA/JUCO differences, what to realistically target |
| `commitments` | Offers & Commitments | Verbal commitments, NLI signing, roster management |
| `ncaa-rules` | NCAA Rules | Current rulebook, contact restrictions, compliance |

> **If a new category is ever needed:** add a new slug, never repurpose or rename an existing one.

---

## Frontmatter Schema

Every article must include all required fields. Optional fields are for future extensibility.

```yaml
---
# --- Required ---
title: "How to Write a Recruiting Email That Gets a Response"
description: "A practical guide to cold-emailing college coaches — what to include, what to avoid, and how to follow up."
slug: how-to-write-a-recruiting-email        # stable forever — matches the filename
category: outreach                            # must match a category slug above
audience: player                             # player | parent | both
stage: junior                                # freshman | sophomore | junior | senior | all
lastUpdated: 2026-03-15                      # date file was last edited
lastReviewed: 2026-03-15                     # date content was verified as accurate (displayed to users)

# --- Recommended ---
tags:
  - emailing coaches
  - cold outreach
  - communication
ogImage: /og/how-to-write-a-recruiting-email.png  # 1200x630, for social sharing

# --- Future: AI Q&A (add when ready to build RAG layer) ---
# summary: "This article explains how to write an effective cold email to a college coach, including subject line format, what coaches want to see, and how to follow up without being annoying."
# questions:
#   - "What should I include in a recruiting email to a coach?"
#   - "How do I email a college coach for the first time?"
#   - "Should I follow up if a coach doesn't respond to my email?"
---
```

### Notes on specific fields

- **`slug`** — always matches the filename (sans `.md`). Human-readable, no dates in slugs.
- **`lastReviewed`** — displayed prominently on article pages as a trust signal. Must be manually updated each time content is verified as current. NCAA rules change yearly — review all `ncaa-rules` articles each August.
- **`ogImage`** — generate via a script or manually. If absent, fall back to a category-specific default OG image.
- **AI fields** — commented out but defined. Add them as real fields when the Q&A feature is planned.

---

## Content Folder Structure

```
content/
└── resources/
    ├── eligibility/
    │   ├── ncaa-academic-requirements.md
    │   ├── ncaa-clearinghouse-guide.md
    │   └── gpa-requirements-by-division.md
    ├── timelines/
    │   ├── freshman-year-recruiting-checklist.md
    │   ├── sophomore-year-what-to-do.md
    │   ├── junior-year-recruiting-guide.md
    │   └── senior-year-last-chance.md
    ├── outreach/
    │   └── how-to-write-a-recruiting-email.md
    ├── showcases/
    ├── scholarships/
    ├── divisions/
    ├── commitments/
    └── ncaa-rules/
```

---

## Pages & Components

### Pages

| Route | File | Purpose |
|---|---|---|
| `/resources` | `pages/index.vue` | Category hub — grid of all 8 categories with article counts |
| `/resources/[category]` | `pages/[category]/index.vue` | Category listing — article cards + audience filter |
| `/resources/[category]/[slug]` | `pages/[category]/[slug].vue` | Article page |

### Key Components

| Component | Responsibility |
|---|---|
| `CategoryCard.vue` | Category hub tile — icon, name, article count |
| `ArticleCard.vue` | Article preview in listing — title, description, stage badge, audience tag, last reviewed |
| `AudienceFilter.vue` | Filter control on category pages — "All / Players / Parents" |
| `ArticleMeta.vue` | Article page header — last reviewed date, stage, audience, reading time |
| `RelatedArticles.vue` | Bottom of article — 2-3 articles from same category |
| `ResourceCTA.vue` | Persistent CTA in every article — links to main app/waitlist |
| `BreadcrumbNav.vue` | Hub → Category → Article breadcrumb |

---

## Social Sharing (Day One)

Every article page must render correct meta tags server-side (SSR/SSG):

```html
<!-- OG -->
<meta property="og:title" content="[article title]" />
<meta property="og:description" content="[article description]" />
<meta property="og:image" content="[ogImage or category default]" />
<meta property="og:url" content="https://therecruitingcompass.com/resources/[category]/[slug]" />
<meta property="og:type" content="article" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[article title]" />
<meta name="twitter:description" content="[article description]" />
<meta name="twitter:image" content="[ogImage or category default]" />

<!-- Article-specific -->
<meta property="article:modified_time" content="[lastReviewed]" />
```

Use Nuxt's `useSeoMeta()` composable to set these per-article.

---

## Vercel Domain Routing

Two projects, one domain. The landing site (`recruiting-compass-landing`) needs a rewrite rule:

```json
// vercel.json on the landing site
{
  "rewrites": [
    {
      "source": "/resources/:path*",
      "destination": "https://[resources-vercel-deployment-url]/:path*"
    }
  ]
}
```

The resources Vercel project is deployed independently. Its own Vercel URL is hidden behind the rewrite. This means:
- Both projects deploy independently
- Landing site redeploy is NOT required to publish new articles
- The resources project's `NUXT_PUBLIC_SITE_URL` = `https://therecruitingcompass.com`

---

## XML Sitemap

Nuxt Content can auto-generate a sitemap. Include all article URLs. Exclude draft articles (use a `draft: true` frontmatter field to suppress from sitemap and listing pages).

---

## Content Freshness Workflow

Each August (after NCAA publishes updated recruiting calendars):
1. Review all articles in `/ncaa-rules` and `/timelines`
2. Update content as needed
3. Update `lastReviewed` date in frontmatter even if content didn't change (signals to readers it was checked)
4. Any article with `lastReviewed` older than 18 months should show a subtle "content under review" notice automatically

---

## CTA Strategy

Every article ends with a `<ResourceCTA />` component. Two jobs:

1. **Email newsletter capture** — collect emails for ongoing recruiting content / NCAA news updates
2. **App CTA** — drive signups to the main Recruiting Compass app

Two app variants controlled by a single prop:
- **Waitlist CTA** — while the app is in beta: "Ready to build your recruiting profile? Join the waitlist."
- **App CTA** — post-launch: "Create your free Recruiting Compass profile and track your recruiting journey."

The component accepts a `variant` prop (`waitlist | app`). Switch globally when the app launches.

> **Newsletter platform TBD** — see Open Questions.

---

## App Deep-Link Contract

When the main Recruiting Compass app links to a resource article, it uses the full canonical URL:

```
https://therecruitingcompass.com/resources/[category]/[slug]
```

**This URL must never return a 404.** If an article is retired, it must redirect (301) to either the category page or a replacement article. Deleting articles without redirects is not allowed.

---

## MVP Scope (Week 1)

Ship the structure with 5-8 articles across 3-4 categories. The goal is a working, shareable site — not complete coverage.

**Suggested first articles:**
1. `timelines/junior-year-recruiting-guide.md` — highest search intent
2. `outreach/how-to-write-a-recruiting-email.md` — most shareable
3. `eligibility/ncaa-academic-requirements.md` — most googled
4. `divisions/d1-vs-d2-vs-d3-differences.md` — perennial question
5. `scholarships/athletic-scholarship-basics.md` — parent audience hook

---

## Visual Identity

**Own look, not the landing site.** Athletic / sports-field aesthetic:
- **Color palette:** field green (natural grass tones, not turf neon), white field lines as design motif
- **Typography:** strong, sporty — legible and authoritative for a knowledge base
- **Category icons:** SVG icon per category, displayed on article cards and the hub grid
- **Article hero images:** dynamically sourced from a free stock photo service (Unsplash API or Pexels API) based on article topic — curated URL stored in frontmatter `heroImage` field, with category-specific fallback

> **Palette specifics TBD** — see Open Questions.

---

## Image Strategy

Two types of imagery:

### Category Icons
- One SVG icon per category (8 total)
- Used on: hub grid tiles, article cards, article page header badge
- Design to feel sport/athletics-themed but not baseball-only

### Article Hero Images
- **Source:** free stock photo service with API (Unsplash or Pexels — both free, attribution-friendly)
- **Approach:** curate a `heroImage` URL per article at write time, store in frontmatter
- **Fallback:** if `heroImage` is absent, show the category's default hero image
- **OG image:** `ogImage` field in frontmatter; if absent, auto-generate from `heroImage` + title overlay, or use category default OG

```yaml
# Additional frontmatter fields:
heroImage: https://images.unsplash.com/photo-[id]?w=1200   # sourced at write time
# ogImage falls back to heroImage if absent
```

> **Stock image service choice TBD** — see Open Questions.

---

## Open Questions

- [ ] **Newsletter platform** — which service for email capture? (ConvertKit, Beehiiv, Mailchimp, Resend, etc.) Determines how the signup form integrates and where subscribers land.
- [ ] **Stock image service** — Unsplash API or Pexels API? Both are free. Unsplash requires attribution. Pexels has no attribution requirement but is smaller catalog.
- [ ] **Green palette specifics** — natural grass green (muted, like `#2d6a2d`) or something more designed? Want to confirm before scaffolding Tailwind tokens.
- [ ] **Draft flag** — include `draft: true` in frontmatter to let you deploy work-in-progress articles that are excluded from listings and sitemap? (Recommended yes — low cost, prevents "oops" publishes.)
