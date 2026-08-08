## Current Session

**Status:** MERGED to main — mobile responsiveness fix. Awaiting manual prod deploy to push live.
**Branch:** main (in sync with origin/main @ a5b6be1)
**Build/CI/Type-check:** all green
**Live:** https://therecruitingcompass.com still serving prior SEO build. Mobile fix NOT live yet — needs "Deploy to Production" workflow run.

### Shipped this session
- PR #34: fix(mobile) — eliminated horizontal scroll on narrow viewports + hero polish.
  - Root cause: `BrandHorizontal` SVG viewBox 400x80. `h-32 w-auto` in hero (and `h-20 w-auto` in footer) rendered 400px wide → forced flex container past 400px viewport (scrollWidth 416 vs clientWidth 385).
  - Fix: switched logo sizing to width-driven (`w-64 sm:w-80 lg:w-[26rem] max-w-full`, `h-auto`). Footer logo `w-56`.
  - Added `overflow-x: hidden` to `html` + `body` in `assets/css/main.css` as defense-in-depth.
  - Hero H1: `text-5xl` → `text-4xl` base, added `text-balance`, killed hard `<br />` after "to" (was producing orphan line), gradient sport span made `block`.
  - Hero para: `text-lg sm:text-2xl`.
  - CTAs: `px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg`. Primary label shortened to "Take the Survey".
  - All section vertical padding tightened: `py-14 sm:py-…` (was `py-16/20`).
  - Hero: `min-h-[100svh]` (was `min-h-screen`) — iOS Safari 100vh chrome jump.
  - Survey CTA H2: `text-3xl` base (was `text-4xl`).
  - Verified via Playwright @ 400×829: `scrollWidth === clientWidth === 385`, no overflow.
  - Files: `assets/css/main.css` (+2/-1), `pages/index.vue` (+19/-17).

### Vercel topology (from prior session — still true)
- 3 landing projects: `recruiting-compass-landing` (NO real domain, auto-deploys on push, errors = noise), `recruiting-compass-landing-production` (apex + www, MANUAL deploy via deploy-prod.yml), `recruiting-compass-landing-staging` (push to develop).

### Open (separate, not blocking)
- **NEXT ACTION:** trigger "Deploy to Production" workflow in GitHub Actions to push mobile fix live.
- Consider dropping H1 to `text-3xl` base if "Basketball Success" wrapping bothers.
- No-suffix `recruiting-compass-landing` project: still auto-deploys + red-X noise on PRs.
- Dependabot: check current vuln count on default branch.
- planning/resources-knowledge-base: WIP scaffold, still 1 commit ahead origin.
- Post-deploy: sitemap submit to Google Search Console still pending.
