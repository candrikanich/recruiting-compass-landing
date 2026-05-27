## Current Session

**Status:** SEO work merged to origin/main (PR #24). BLOCKED on Vercel production deploy.
**Branch:** main (in sync with origin/main @ aa37577)
**Build:** pass (local + CI green)
**Type-check:** pass (added vue-tsc devDep — nuxi typecheck needs it in CI)
**CI:** "Lint, Type Check & Build" green (only required check)

### BLOCKER — Vercel production deploy errors
- Every prod/preview deploy since fcec655 returns instant ERROR, zero build logs, generic "project-configuration" docs URL. One deploy (fcec655) succeeded between two errors → rate-limit / account-level signature, NOT code (CI build passes).
- Live site (https://www.therecruitingcompass.com) serves OLD pre-SEO build — SEO title/H1 NOT live yet.
- Last failed prod deploy: dpl_8swRoSQoW4kwTHjHGPpB6waihPaD (merge aa37577).
- NEXT: open inspectorUrl in Vercel dashboard for the human-readable error (API hides it); check Hobby plan deploy limit; redeploy once limit window clears. Do NOT spam redeploys.

### Done this session
- Node 22 pinned (engines.node + .nvmrc)
- .npmrc legacy-peer-deps=true (fixed npm ci ERESOLVE: nuxt-og-image wants tailwindcss@^4)
- vue-tsc@^2.2.10 devDep (fixed CI nuxi typecheck)
- nuxt-seo skill doc fixed (defineFAQPage removed in v6 → defineQuestion + FAQPage type)
- Deleted stale feat/seo-improvements (local) + merged chore/seo-finalize (local+remote)

### Set aside
- stash@{0}: resources-hub nav links + vercel.json /resources rewrite (Task 15, NOT ready — points at nonexistent RESOURCES_DEPLOYMENT_HOST). Restore when resources app deployed.
- Dependabot: 44 vulns on default branch (20 high) — separate PR needed.
- planning/resources-knowledge-base branch: 1 commit ahead origin, WIP scaffold spec.
**Handoff:** `planning/handoff-2026-03-31-resources-scaffold.md`
