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
          aria-label="Email address"
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
      <p v-if="state === 'error'" class="text-red-300 text-xs mt-2 text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FetchError } from "ofetch";

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
  } catch (err) {
    state.value = "error";
    const fetchErr = err as FetchError;
    errorMessage.value =
      fetchErr?.data?.error ?? "Something went wrong. Please try again.";
  }
}
</script>
