# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TheRecruitingCompass Landing Site** is a static marketing website built with Nuxt 3 and Vue 3. It drives user sign-ups for the main recruiting compass application and collects market research data via Typeform integration. The site targets high school baseball players and their families with family-focused messaging.

**Key Characteristics:**
- Static Site Generation (SSG) deployed to Netlify
- Single-page landing site (only `/pages/index.vue`)
- Mobile responsive with Tailwind CSS custom design system
- TypeScript with strict type checking
- ESLint and Prettier enforced via CI/CD pipeline

---

## Development Commands

### Setup
```bash
npm install
cp .env.example .env
# Edit .env with Typeform form ID and domain URLs
```

### Development
```bash
npm run dev               # Local dev server with hot reload
npm run type-check       # TypeScript validation
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
```

### Production
```bash
npm run build            # Build for production (SSG)
npm run generate         # Alias for SSG build
npm run preview          # Preview production build locally
```

### Common Workflows
- **Before committing:** `npm run lint:fix && npm run format && npm run type-check`
- **Full validation:** `npm run type-check && npm run lint && npm run build`
- **Single test/check:** Use individual commands above

---

## Architecture & Key Concepts

### Directory Structure
- **`/pages/`** — File-based routing (currently only `index.vue` homepage)
- **`/layouts/`** — `default.vue` wraps all pages with header, navigation, and footer
- **`/components/`** — Reusable Vue components; `/icons/` contains SVG icon components
- **`/assets/css/`** — Tailwind CSS with custom component classes (`.btn-primary`, `.btn-secondary`, `.btn-outline`)
- **`/public/`** — Static assets (favicon, robots.txt, etc.)

### Technology Stack
- **Nuxt 3.12.0** — Meta-framework for SSG and server-side rendering
- **Vue 3.5.25** — Reactive component framework with `<script setup>` syntax
- **Tailwind CSS 3.4.17** — Utility-first CSS with custom color scheme
- **TypeScript 5.9.3** — Static type checking
- **Nitro** — Nuxt's server engine (handles SSG prerendering)

### Configuration Files
- **`nuxt.config.ts`** — Main configuration (SSG prerendering, CSS pipeline, app head metadata, runtime env vars)
- **`tailwind.config.cjs`** — Design tokens: primary blue theme, baseball orange accents, custom spacing/border-radius
- **`package.json`** — Dependencies and npm scripts
- **`.env.example`** — Template for environment variables (Typeform Form ID, domain URLs, analytics)
- **`netlify.toml`** — Netlify deployment config with security headers (HSTS, CSP, XSS protection), Node 20 runtime
- **`.gitlab-ci.yml`** — GitLab CI validation pipeline (linting on merge requests)

### Data Flow & External Integrations
1. **Typeform Integration** — Form ID injected via `NUXT_PUBLIC_TYPEFORM_FORM_ID` at build time
2. **Cross-Domain CTAs** — Links to `myrecruitingcompass.com` (main app) and `blog.therecruitingcompass.com` configured in `.env`
3. **Static Deployment** — Built as HTML/CSS/JS, served via Netlify CDN for fast loading

### Build & Deployment Pipeline
- **Local:** Nuxt dev server with HMR
- **CI/CD:** GitLab CI runs linting on merge requests (non-blocking with `allow_failure: true`)
- **Production:** Push to `main` → automatic Netlify build and deploy
- **Output:** `.output/public/` directory deployed as static site

### Design System & Styling
- **Colors:** Tailwind customization in `tailwind.config.cjs` defines primary blue, baseball orange, and custom grays
- **Components:** Reusable button styles (`.btn-primary`, `.btn-secondary`, `.btn-outline`) in `assets/css/main.css`
- **Icons:** SVG icon components in `components/icons/` (e.g., `CompassIcon.vue`)
- **Responsive:** Mobile-first approach with Tailwind breakpoints

### Code Patterns
- **Vue 3 Composition API** — Use `<script setup>` syntax for components
- **Nuxt Composables** — Use `useHead()`, `definePageMeta()`, `useRouter()` for Nuxt-specific features
- **Type Safety** — Components receive typed props; no `any` types
- **CSS Scoping** — Use scoped styles (`<style scoped>`) in Vue components

---

## Important Notes

### Environment Variables
- **Required for build:** `TYPEFORM_FORM_ID`, `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_APP_URL`
- **Runtime public vars** — Prefixed with `NUXT_PUBLIC_` to be accessible in the browser
- See `.env.example` for complete list

### Security Headers (Netlify)
- HSTS enforced (max-age=31536000)
- Content Security Policy implemented
- XSS and frame-attack protections enabled
- MIME type sniffing prevented

### SEO & Meta Tags
- Configured in `nuxt.config.ts` with app-wide defaults
- Individual pages can override via `useHead()` composable
- Critical for organic search visibility

### Single Page vs. Multi-Page
- Currently a single-page landing site
- To add pages: create new `.vue` file in `/pages/` and Nuxt auto-routes it
- Share common layout via `/layouts/default.vue`

---

## Git & Workflow

- **Feature branches** — Create branches for changes; never push directly to `main`
- **Conventional commits** — Use `feat:`, `fix:`, `docs:`, `style:`, `refactor:` prefixes in imperative mood
- **Pre-commit validation** — Run `npm run lint:fix && npm run format && npm run type-check` before committing
- **Automatic deployment** — Merging to `main` triggers Netlify build and deploy

---

## Debugging & Troubleshooting

- **Type errors** — Run `npm run type-check` and address all errors before commit
- **Build failures** — Check `.env` file has correct Typeform Form ID and domain URLs
- **Style issues** — Check `tailwind.config.cjs` for missing utilities; ensure Tailwind scans all component files
- **Deployment issues** — Check `netlify.toml` for build configuration; verify Node 20 is available
