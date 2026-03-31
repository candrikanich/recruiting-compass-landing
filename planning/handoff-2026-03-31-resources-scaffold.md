# Handoff: Resources Knowledge Base Scaffold
**Date:** 2026-03-31
**Branch:** main (5 commits ahead of origin — NOT YET PUSHED)
**Status:** PLANNING COMPLETE — READY TO IMPLEMENT

## Completed This Session

- **Spec finalized** — all open questions resolved, fully locked — `planning/resources-knowledge-base-spec.md`
- **Implementation plan written** — 15 tasks, full code, ready to execute — `planning/2026-03-30-resources-scaffold.md` — commit `a57303d`

### Spec decisions locked this session:
- Visual identity: own look, Tailwind `emerald-500/600/700` gradient (exact tokens from `myrecruitingcompass.com`), white field-lines motif (the CSS pattern already used in the app)
- Images: Unsplash, curated URLs in frontmatter `heroImage` field, category fallback
- Newsletter: Beehiiv API (subscriber endpoint), native form (not iframe), API route via `/resources-api/newsletter` rewrite
- Draft flag: `draft: true` frontmatter — deploys but hidden from listings/sitemap
- All 4 previously-open questions resolved

## In Progress (Uncommitted)

None — the plan is complete and committed. The new repo (`recruiting-compass-resources`) does not exist yet. Implementation has not started.

## Known Issues / Blockers

- **Beehiiv account not set up yet** — `NUXT_BEEHIIV_API_KEY` and `NUXT_BEEHIIV_PUBLICATION_ID` will be blank until Chris creates the Beehiiv publication. Task 12 (ResourceCTA) and Task 15 (Vercel env vars) depend on this, but it does not block Tasks 1–11.
- **Landing site `vercel.json` does not exist yet** — needs to be created in Task 15 after the resources repo is deployed and its Vercel URL is known.
- **5 commits not pushed to origin** — push `main` before starting a new session if remote backup is desired.

## Test Status

- Unit tests: UNKNOWN — no tests exist in this repo (landing site is static, minimal test surface)
- Type check: UNKNOWN — not run this session
- Lint: UNKNOWN — not run this session

## Resume Command

Start a new session and paste:

> "Continue the resources knowledge base scaffold. The plan is at `planning/2026-03-30-resources-scaffold.md`. The new repo does not exist yet — start at Task 1. Use subagent-driven execution."

## Next Steps (in order)

1. **Task 1** — Initialize `recruiting-compass-resources` repo at `/Volumes/AlphabetSoup/TheRecruitingCompass/code/recruiting-compass-resources`, run `npx nuxi@latest init`, install `@nuxt/content @nuxtjs/tailwindcss`, git init
2. **Tasks 2–12** — Configure nuxt.config.ts, content schema, Tailwind, layout, composable, icons, pages, components, ResourceCTA + Beehiiv route — all code is written in the plan
3. **Task 13** — Write 2 MVP articles (junior year guide + recruiting email guide)
4. **Task 14** — `.env.example`, `vercel.json` in resources repo
5. **Task 15** — Deploy to Vercel, note the URL, add rewrites to `recruiting-compass-landing/vercel.json`

## Key Architecture Notes (for fresh context)

- **`app.baseURL: '/resources'`** — routes + assets all under `/resources/*`, avoids landing site `_nuxt/` collision
- **Two landing site rewrites needed:** `/resources-api/:path*` → resources app `/api/:path*` (newsletter) AND `/resources/:path*` → resources app `/resources/:path*` (pages + assets)
- **Content query pattern:** `queryCollection('resources').path('/resources' + route.path).first()` — must prepend base to `route.path` because Nuxt strips it
- **`NUXT_PUBLIC_API_PREFIX`:** `/api` in dev, `/resources-api` in Vercel production
- **Spec file:** `planning/resources-knowledge-base-spec.md` — full decision record
- **Plan file:** `planning/2026-03-30-resources-scaffold.md` — 15 tasks with complete code
