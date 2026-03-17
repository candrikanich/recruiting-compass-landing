# Waitlist Email Capture — Design Spec

**Date:** 2026-03-16
**Status:** Approved

---

## Overview

Add a simple email capture widget to the landing page hero so visitors can join a waitlist and be notified when the app goes live. Emails are stored in a Resend Audience via a Nuxt serverless API route.

---

## Placement

The widget sits inside the hero section (`/pages/index.vue`), below the existing CTA buttons ("Take Our Survey & Get Early Access" and "Learn More"). It is implemented as a standalone `WaitlistForm.vue` component dropped into that location.

---

## Component: `WaitlistForm.vue`

**Location:** `components/WaitlistForm.vue`

The component manages its own state machine:

| State     | UI                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idle`    | Email input + "Notify Me" button                                                                                                                  |
| `loading` | Button shows spinner, input disabled                                                                                                              |
| `success` | Form replaced with "✅ You're on the list! We'll email you the moment we launch."                                                                 |
| `error`   | Inline error message below the input (see Error Handling table for message text); form remains active and clears the error on next submit attempt |

The `error` state is recoverable — the user can edit their email and retry without a page reload.

**Fields:** Email address only (no name field).

**Styling:** Matches the hero — translucent dark background (`bg-white/10 backdrop-blur-sm`), green border (`border-green-400/50`), rounded corners. Consistent with the existing hero CTA aesthetic.

**No props required.** Self-contained — submits to `/api/waitlist`, handles all states internally.

**Client-side validation:** No client-side format validation — the form submits on click and surfaces format errors via the server 400 response. The submit button is enabled when `email.trim().length > 0`, disabled otherwise.

**Client-side error parsing:** Read the error message from `error.data?.error`. If `error.data?.error` is absent or the response is non-JSON (e.g., a Vercel 502 or timeout), display the generic fallback: `"Something went wrong. Please try again."`

---

## API Route: `POST /api/waitlist`

**Location:** `server/api/waitlist.post.ts`

Deployed as a Vercel serverless function alongside the static site. Vercel auto-detects Nuxt and deploys files under `server/` as Node.js serverless functions — no additional `nuxt.config.ts` preset or `vercel.json` changes required. Only the `/` route is prerendered; the `/api/waitlist` route is never prerendered.

### Request

```json
{ "email": "user@example.com" }
```

### Validation

Uses Zod to validate the request body:

- `email`: required, valid email format

Returns `400` with `{ error: "Please enter a valid email address." }` if validation fails.

### Logic

1. Parse and validate request body
2. Call Resend Audiences API to add the contact to the configured audience
3. Treat any Resend error response whose body indicates "already exists" or "contact already in audience" as a success — map it to `{ success: true }` so the user sees the confirmation state. Verify the exact Resend error shape at implementation time against current Resend API docs.
4. Call `useRuntimeConfig()` and guard against empty `config.resendApiKey` or `config.resendAudienceId` — if either is an empty string, return a `500` with the generic error message immediately without attempting the Resend call

### Response

**Success (200):**

```json
{ "success": true }
```

**Validation error (400):**

```json
{ "error": "Please enter a valid email address." }
```

**Server error (500):**

```json
{ "error": "Something went wrong. Please try again." }
```

---

## Environment Variables

| Variable                  | Scope       | Purpose                                             |
| ------------------------- | ----------- | --------------------------------------------------- |
| `NUXT_RESEND_API_KEY`     | Server-only | Authenticates Resend API calls                      |
| `NUXT_RESEND_AUDIENCE_ID` | Server-only | Identifies which Resend Audience to add contacts to |

Both variables are server-side only — no `NUXT_PUBLIC_` prefix. Never exposed to the client.

Both variables must be declared in `nuxt.config.ts` under `runtimeConfig` (not `runtimeConfig.public`) so Nuxt's server runtime injects them via `useRuntimeConfig()`. Merge alongside the existing `public` block — do not replace it:

```ts
runtimeConfig: {
  resendApiKey: '',      // injected from NUXT_RESEND_API_KEY
  resendAudienceId: '',  // injected from NUXT_RESEND_AUDIENCE_ID
  public: {
    // existing keys preserved here (typeformFormId, typeformUrl, etc.)
  }
}
```

Must also be added to:

- `.env` (local development, using `NUXT_RESEND_API_KEY` and `NUXT_RESEND_AUDIENCE_ID` naming convention)
- `.env.example` (documentation)
- Vercel project environment variables (staging + production)

---

## Error Handling

| Scenario                            | Behaviour                                                                |
| ----------------------------------- | ------------------------------------------------------------------------ |
| Empty or whitespace email submitted | Inline error: "Please enter a valid email address." (server returns 400) |
| Invalid email format                | Inline error: "Please enter a valid email address." (server returns 400) |
| Duplicate email                     | Treated as success — UI shows confirmation state                         |
| Resend API failure                  | Inline error: "Something went wrong. Please try again."                  |
| Network error or non-JSON response  | Inline error: "Something went wrong. Please try again."                  |

---

## Rate Limiting

Out of scope for this implementation. Known risk: the unauthenticated POST endpoint could be flooded by bots, consuming Resend API quota. Acceptable for an early-stage waitlist — revisit if abuse is observed. Vercel's built-in edge rate limiting can be added later without changing the route logic.

---

## Out of Scope

- Confirmation/welcome email to the subscriber
- Name field
- Analytics events on submission
- Unsubscribe flow (handled by Resend)
- Admin view of collected emails (use Resend dashboard)
