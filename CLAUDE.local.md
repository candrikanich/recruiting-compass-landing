## Current Session

**Status:** SHIPPED — SEO live on production. All loose ends tied up.
**Branch:** main (in sync with origin/main @ 96daebb)
**Build/CI/Type-check:** all green
**Live:** https://therecruitingcompass.com serving SEO build (verified: H1, canonical, og:image, JSON-LD, sitemap, robots all good).

### Shipped this session
- PR #24: SEO foundation + Node 22 pin (engines.node + .nvmrc) + .npmrc legacy-peer-deps + vue-tsc devDep
- PR #25: reverted 3765aca (premature /resources integration) — its vercel.json had invalid `$comment` that blocked ALL real deploys
- Ran manual "Deploy to Production" workflow → recruiting-compass-landing-production (the project owning the apex domain). SEO now live.
- nuxt-seo skill doc fixed (defineFAQPage removed in v6 → defineQuestion + FAQPage type)

### Vercel topology (learned)
- 3 landing projects: `recruiting-compass-landing` (NO real domain, auto-deploys on push, errors = noise), `recruiting-compass-landing-production` (apex + www, MANUAL deploy via deploy-prod.yml), `recruiting-compass-landing-staging` (push to develop).
- "project-configuration" Vercel error with empty build logs = invalid vercel.json, NOT rate limit.

### Open (separate, not blocking)
- No-suffix `recruiting-compass-landing` project: auto-deploys + errors on every push, serves no real domain → disconnect its GitHub integration or delete to stop red-X noise on PRs.
- Dependabot: 44 vulns on default branch (20 high) — own PR.
- planning/resources-knowledge-base: WIP scaffold, 1 commit ahead origin. Resources app repo not created. When ready, re-apply 3765aca.
- Post-deploy: submit sitemap to Google Search Console.
