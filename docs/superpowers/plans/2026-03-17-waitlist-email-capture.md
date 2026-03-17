# Waitlist Email Capture Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an email capture widget to the landing page hero that stores waitlist signups in a Resend Audience via a Nuxt serverless API route.

**Architecture:** A self-contained `WaitlistForm.vue` component in the hero manages its own `idle → loading → success/error` state and posts to a Nuxt server route `/api/waitlist`. The route validates input with Zod, calls the Resend Audiences API to store the contact, and returns structured JSON. Vercel deploys the server route as a Node.js serverless function alongside the static site.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, Zod (validation), Resend SDK (email audience), Vitest + `@nuxt/test-utils` (testing), Tailwind CSS.

---

## File Map

| File                            | Action | Responsibility                                                                    |
| ------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `package.json`                  | Modify | Add `resend`, `zod` (deps); `vitest`, `@nuxt/test-utils` (devDeps); `test` script |
| `vitest.config.ts`              | Create | Vitest config with Nuxt environment                                               |
| `nuxt.config.ts`                | Modify | Add `resendApiKey` + `resendAudienceId` to server `runtimeConfig`                 |
| `.env.example`                  | Modify | Document `NUXT_RESEND_API_KEY` and `NUXT_RESEND_AUDIENCE_ID`                      |
| `server/utils/waitlist.ts`      | Create | Pure business logic: validate email, call Resend — independently testable         |
| `server/api/waitlist.post.ts`   | Create | Thin POST handler: reads body, delegates to `server/utils/waitlist.ts`            |
| `tests/server/waitlist.test.ts` | Create | Unit tests for the business logic in `server/utils/waitlist.ts`                   |
| `components/WaitlistForm.vue`   | Create | Self-contained email capture widget with 4-state machine                          |
| `pages/index.vue`               | Modify | Mount `<WaitlistForm />` in hero, below existing CTA buttons                      |

---

## Chunk 1: Dependencies, Config, and API Route

### Task 1: Install dependencies

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install production dependencies**

```bash
npm install resend zod
```

Expected: `package.json` now lists `resend` and `zod` under `dependencies`.

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D vitest @nuxt/test-utils
```

Expected: `package.json` lists `vitest` and `@nuxt/test-utils` under `devDependencies`.

- [ ] **Step 3: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify install**

```bash
npm run type-check
```

Expected: no errors.

---

### Task 2: Configure Vitest

**Files:**

- Create: `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
  },
});
```

- [ ] **Step 2: Run tests to confirm runner starts (no tests yet)**

```bash
npm test
```

Expected: "No test files found" or exits 0.

---

### Task 3: Update environment config

**Files:**

- Modify: `nuxt.config.ts`
- Modify: `.env.example`

- [ ] **Step 1: Add server-side runtimeConfig keys to `nuxt.config.ts`**

Merge the two new keys into the existing `runtimeConfig` block. Do not replace or remove the existing `public` keys:

```ts
runtimeConfig: {
  resendApiKey: '',      // injected from NUXT_RESEND_API_KEY
  resendAudienceId: '',  // injected from NUXT_RESEND_AUDIENCE_ID
  public: {
    typeformFormId: process.env.TYPEFORM_FORM_ID,
    typeformUrl: 'https://alphabet.typeform.com/to/',
  },
},
```

- [ ] **Step 2: Add entries to `.env.example`**

Append to `.env.example`:

```
# Resend — Waitlist Email Capture
# Create an Audience in your Resend dashboard and paste its ID here
NUXT_RESEND_API_KEY=
NUXT_RESEND_AUDIENCE_ID=
```

- [ ] **Step 3: Add entries to local `.env`** ⚠️ HUMAN ACTION REQUIRED — do not automate

Add your actual Resend values to `.env` (never commit this file). Obtain them from the Resend dashboard:

```
NUXT_RESEND_API_KEY=re_your_api_key_here
NUXT_RESEND_AUDIENCE_ID=your_audience_id_here
```

- [ ] **Step 4: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

---

### Task 4: Business logic — write failing tests first

The core logic lives in `server/utils/waitlist.ts` as a plain async function — no H3 event context, no `readBody`. This makes it directly importable and testable without any event mock gymnastics. The API handler in `server/api/waitlist.post.ts` is a thin wrapper that just reads the body and delegates.

**Files:**

- Create: `tests/server/waitlist.test.ts`

- [ ] **Step 1: Create `tests/server/waitlist.test.ts`** with the full test suite

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createError } from "h3";

// Mock the Resend SDK before importing the module under test
const mockContactsCreate = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    contacts: { create: mockContactsCreate },
  })),
}));

const { addToWaitlist } = await import("../../server/utils/waitlist");

const validConfig = {
  resendApiKey: "test-key",
  resendAudienceId: "test-audience-id",
};

describe("addToWaitlist", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns success:true for a valid email", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: { id: "c-123" },
      error: null,
    });
    const result = await addToWaitlist("user@example.com", validConfig);
    expect(result).toEqual({ success: true });
    expect(mockContactsCreate).toHaveBeenCalledWith({
      audienceId: "test-audience-id",
      email: "user@example.com",
    });
  });

  it("trims whitespace from email before submitting", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: { id: "c-123" },
      error: null,
    });
    await addToWaitlist("  user@example.com  ", validConfig);
    expect(mockContactsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ email: "user@example.com" }),
    );
  });

  it("throws 400 for an invalid email format", async () => {
    await expect(
      addToWaitlist("not-an-email", validConfig),
    ).rejects.toMatchObject({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
    expect(mockContactsCreate).not.toHaveBeenCalled();
  });

  it("throws 400 for a whitespace-only email", async () => {
    await expect(addToWaitlist("   ", validConfig)).rejects.toMatchObject({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
  });

  it("throws 400 for missing email (undefined)", async () => {
    await expect(
      addToWaitlist(undefined as any, validConfig),
    ).rejects.toMatchObject({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
  });

  it("throws 500 when resendApiKey is empty", async () => {
    await expect(
      addToWaitlist("user@example.com", { ...validConfig, resendApiKey: "" }),
    ).rejects.toMatchObject({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
    expect(mockContactsCreate).not.toHaveBeenCalled();
  });

  it("throws 500 when resendAudienceId is empty", async () => {
    await expect(
      addToWaitlist("user@example.com", {
        ...validConfig,
        resendAudienceId: "",
      }),
    ).rejects.toMatchObject({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
    expect(mockContactsCreate).not.toHaveBeenCalled();
  });

  it("returns success:true for a duplicate email (already_exists treated as success)", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: null,
      error: { name: "already_exists", message: "Contact already exists" },
    });
    const result = await addToWaitlist("existing@example.com", validConfig);
    expect(result).toEqual({ success: true });
  });

  it("throws 500 when Resend returns an unexpected error", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: null,
      error: { name: "internal_server_error", message: "Resend is down" },
    });
    await expect(
      addToWaitlist("user@example.com", validConfig),
    ).rejects.toMatchObject({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
  });
});
```

- [ ] **Step 2: Run tests — confirm they ALL fail (file doesn't exist yet)**

```bash
npm test
```

Expected: import error — `../../server/utils/waitlist` not found.

---

### Task 5: Implement business logic and API handler

**Files:**

- Create: `server/utils/waitlist.ts`
- Create: `server/api/waitlist.post.ts`

- [ ] **Step 1: Create `server/utils/waitlist.ts`**

> **Note on duplicate email handling:** The Resend Contacts API may return `already_exists` for duplicate emails. Verify the exact `error.name` value before deploying by checking the [Resend API reference](https://resend.com/docs/api-reference/contacts/create-contact). Only `already_exists` is treated as success below — do not add other error names without verification.

```ts
import { createError } from "h3";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().trim().email();

interface WaitlistConfig {
  resendApiKey: string;
  resendAudienceId: string;
}

export async function addToWaitlist(rawEmail: unknown, config: WaitlistConfig) {
  if (!config.resendApiKey || !config.resendAudienceId) {
    throw createError({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
  }

  const parsed = emailSchema.safeParse(rawEmail);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
  }

  const resend = new Resend(config.resendApiKey);
  const { error } = await resend.contacts.create({
    audienceId: config.resendAudienceId,
    email: parsed.data,
  });

  if (error && error.name !== "already_exists") {
    throw createError({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
  }

  return { success: true };
}
```

- [ ] **Step 2: Create `server/api/waitlist.post.ts`** (thin handler — just reads body and delegates)

```ts
import { addToWaitlist } from "~/server/utils/waitlist";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { email } = await readBody(event);
  return addToWaitlist(email, {
    resendApiKey: config.resendApiKey as string,
    resendAudienceId: config.resendAudienceId as string,
  });
});
```

- [ ] **Step 3: Run tests — confirm all 8 tests pass**

```bash
npm test
```

Expected: all 8 tests PASS.

- [ ] **Step 4: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts nuxt.config.ts .env.example server/utils/waitlist.ts server/api/waitlist.post.ts tests/server/waitlist.test.ts
git commit -m "feat: add waitlist API route with Resend Audiences integration"
```

---

## Chunk 2: WaitlistForm Component and Hero Integration

### Task 6: Create `WaitlistForm.vue`

**Files:**

- Create: `components/WaitlistForm.vue`

- [ ] **Step 1: Create `components/WaitlistForm.vue`**

```vue
<template>
  <div class="w-full max-w-md mx-auto mt-6">
    <div
      v-if="state === 'success'"
      class="bg-white/10 backdrop-blur-sm border border-green-400/50 rounded-2xl px-6 py-4 text-center"
    >
      <p class="text-white font-medium">
        ✅ You're on the list! We'll email you the moment we launch.
      </p>
    </div>

    <div
      v-else
      class="bg-white/10 backdrop-blur-sm border border-green-400/50 rounded-2xl px-6 py-4"
    >
      <p class="text-green-200 text-sm text-center mb-3 font-medium">
        🔔 Get notified when we launch
      </p>
      <div class="flex gap-2">
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          :disabled="state === 'loading'"
          class="flex-1 bg-white/15 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-green-400/70 disabled:opacity-50"
          @keydown.enter="submit"
        />
        <button
          type="button"
          :disabled="!canSubmit"
          class="bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          @click="submit"
        >
          <span
            v-if="state === 'loading'"
            class="inline-flex items-center gap-1.5"
          >
            <svg
              class="animate-spin h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Sending...
          </span>
          <span v-else>Notify Me</span>
        </button>
      </div>
      <p v-if="errorMessage" class="text-red-300 text-xs mt-2 text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type State = "idle" | "loading" | "success" | "error";

const email = ref("");
const state = ref<State>("idle");
const errorMessage = ref("");

const canSubmit = computed(
  () => state.value !== "loading" && email.value.trim().length > 0,
);

async function submit() {
  if (!canSubmit.value) return;
  state.value = "loading";
  errorMessage.value = "";

  try {
    await $fetch("/api/waitlist", {
      method: "POST",
      body: { email: email.value.trim() },
    });
    state.value = "success";
  } catch (err: any) {
    state.value = "error";
    errorMessage.value =
      err?.data?.error ?? "Something went wrong. Please try again.";
  }
}
</script>
```

- [ ] **Step 2: Run type-check to verify the component has no type errors**

```bash
npm run type-check
```

Expected: no errors.

---

### Task 7: Wire `WaitlistForm` into the hero

**Files:**

- Modify: `pages/index.vue`

- [ ] **Step 1: Add `<WaitlistForm />` to `pages/index.vue`**

Locate the `fade-in delay-3` div containing the hero CTA buttons (around line 25–41). Add `<WaitlistForm />` immediately after the closing `</div>` of that flex container:

```vue
        <!-- existing CTA buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in delay-3">
          <button ...>Take Our Survey & Get Early Access</button>
          <button ...>Learn More</button>
        </div>

        <!-- waitlist capture — add this block -->
        <WaitlistForm class="fade-in delay-4" />

        <p class="mt-16 text-green-200 text-sm fade-in delay-5">
```

> Note: The existing `<p>` tag uses `delay-4`. Move it to `<WaitlistForm>` (above) and change the `<p>` to `delay-5`. Then add the `delay-5` rule to the `<style scoped>` block at the bottom of `index.vue`:
>
> ```css
> .fade-in.delay-5 {
>   animation-delay: 1.2s;
> }
> ```

- [ ] **Step 2: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Start dev server and manually verify the form**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:

- Widget appears below the two CTA buttons in the hero
- Entering an invalid email and clicking "Notify Me" shows "Please enter a valid email address." (requires local `.env` with real or test Resend keys)
- "Notify Me" is disabled when input is empty
- With a valid email + real Resend keys: success state shows "✅ You're on the list!"

- [ ] **Step 4: Run lint and format**

```bash
npm run lint:fix && npm run format
```

- [ ] **Step 5: Run full validation suite**

```bash
npm run type-check && npm run lint && npm test
```

Expected: all checks green.

- [ ] **Step 6: Commit**

```bash
git add components/WaitlistForm.vue pages/index.vue
git commit -m "feat: add WaitlistForm component to hero section"
```

---

## Post-Implementation Checklist

Before considering this done:

- [ ] `NUXT_RESEND_API_KEY` and `NUXT_RESEND_AUDIENCE_ID` added to Vercel project environment variables for both staging and production
- [ ] Create a "Launch Waitlist" Audience in the Resend dashboard and use its ID
- [ ] Deploy to staging (`develop` branch) and do a live end-to-end test: submit a real email, confirm it appears in the Resend Audience
- [ ] Verify the Resend duplicate-contact error name in the API response matches what's in `server/api/waitlist.post.ts` — update if needed
