# Vercel Deployment Setup (Landing)

This guide sets up the same deploy flow as the web app: **develop** → test then staging, **main** → manual production deploy with approval.

## Pipeline Overview

| Branch / Action | Result |
|-----------------|--------|
| Push to **develop** | Run Test & Verify → if pass, deploy to **Staging** |
| PR **develop → main** | Run Test & Verify only |
| **Manual** "Deploy to Production" workflow | Deploy to **Production** (with confirmation) |

You still need to **create the Vercel projects** and add **GitHub secrets**. Steps below.

---

## 1. Create Vercel Projects

Create **two** Vercel projects (same GitHub repo, different project IDs).

### 1.1 Staging

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo: **recruiting-compass-landing** (this repo)
3. **Project Name:** `recruiting-compass-landing-staging`
4. **Framework Preset:** Nuxt
5. **Build Command:** leave default (Vercel will use `npm run build` for Nuxt)
6. Deploy once, then go to **Settings → General** and copy the **Project ID**

### 1.2 Production

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same** repo: **recruiting-compass-landing**
3. **Project Name:** `recruiting-compass-landing-prod`
4. **Framework Preset:** Nuxt
5. Deploy once, then copy the **Project ID** from Settings → General

**Environment variables:** In each Vercel project (staging and prod), go to **Settings → Environment Variables** and add the vars from `.env.example` (e.g. `TYPEFORM_FORM_ID`, `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_APP_URL`). They're needed at build time when the workflow runs `vercel deploy`.

You can turn off “Automatically deploy from Git” for both if you want **only** GitHub Actions to deploy (recommended so staging/prod stay in sync with the workflows).

---

## 2. GitHub Secrets

In the **recruiting-compass-landing** repo:

**Settings → Secrets and variables → Actions → New repository secret**

Add:

| Secret | Value |
|--------|--------|
| `VERCEL_TOKEN` | [Vercel Account → Tokens](https://vercel.com/account/tokens) – create a token (e.g. “GitHub Actions”) |
| `VERCEL_PROJECT_ID_STAGING` | Project ID of **recruiting-compass-landing-staging** |
| `VERCEL_PROJECT_ID_PROD` | Project ID of **recruiting-compass-landing-prod** |

For a **personal account** you do not need `VERCEL_ORG_ID`. For a **Vercel team**, add secret `VERCEL_ORG_ID` with your **team** ID (`team_xxx` from Team Settings); do not use your personal account ID or the CLI will error ("You cannot set your Personal Account as the scope").

Optional (Slack): add `SLACK_WEBHOOK_URL` for deploy notifications. If not set, Slack steps are no-ops (`continue-on-error: true`).

---

## 3. GitHub Environments (for approval on production)

1. Repo **Settings → Environments → New environment**
2. Create **staging** (no protection needed)
3. Create **production**
   - **Required reviewers:** add yourself (or whoever approves prod deploys)
   - Optionally restrict to branch **main**

---

## 4. Branch Setup

Ensure you have a **develop** branch and push it:

```bash
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop
```

---

## 5. Optional: Custom Domains

- **Staging:** e.g. `staging.therecruitingcompass.com` or `qa.therecruitingcompass.com` on the **staging** project → Settings → Domains.
- **Production:** e.g. `therecruitingcompass.com` on the **prod** project → Settings → Domains.

Configure DNS (CNAME/A/AAAA) as shown in Vercel.

---

## 6. How to Deploy

- **Staging:** push to `develop` → Test & Verify runs (Code Quality then Deploy to Staging on success).
- **Production:** in GitHub **Actions** tab, run **“Deploy to Production”** → enter `DEPLOY` when prompted → approve if you use required reviewers.

---

## Workflows in This Repo

| File | Trigger | Purpose |
|------|---------|---------|
| `test.yml` | Push to develop, PR to develop/main | Code Quality (lint & types); on push to develop, deploy to staging |
| `ci.yml` | Push/PR to main | Same checks on main |
| `deploy-prod.yml` | Manual (workflow_dispatch) | Deploy to production |

After creating the two Vercel projects and the four secrets, the pipeline is ready to use.
