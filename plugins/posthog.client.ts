import type { PostHog } from "posthog-js";
import {
  classifyCtaHref,
  earlyCtaEvent,
  isLocalHost,
  POSTHOG_HOST,
  shouldEnableAnalytics,
} from "~/utils/landingAnalytics";

type Capture = (event: string, properties?: Record<string, unknown>) => void;

export default defineNuxtPlugin(() => {
  const key = useRuntimeConfig().public.posthogKey;
  const gpc = Boolean(
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl,
  );
  const noop: Capture = () => {};

  const local = isLocalHost(location.hostname);
  if (!shouldEnableAnalytics({ key, gpc, dev: import.meta.dev, local })) {
    return { provide: { analytics: { capture: noop } } };
  }

  // Lazy import keeps ~100 KB gzip out of the entry chunk; events fired
  // before it resolves wait on the promise (CTA clicks excepted, see below).
  let loaded: PostHog | null = null;
  const ready = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: POSTHOG_HOST,
        defaults: "2026-01-30",
        // $pageview/$pageleave (not the web app's custom page_view) so
        // PostHog's Web analytics dashboard breaks campaign traffic down by
        // UTM, referrer and channel without any extra wiring.
        capture_pageview: "history_change",
        capture_pageleave: true,
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
        capture_dead_clicks: false,
        capture_heatmaps: false,
        capture_exceptions: false,
        capture_performance: false,
        // No remote-config switch can pull extra scripts onto the page.
        disable_external_dependency_loading: true,
        advanced_disable_flags: true,
      });
      // Shared project with web and iOS; this splits every funnel by surface.
      posthog.register({ platform: "landing" });
      loaded = posthog;
      return posthog;
    })
    .catch(() => null); // ad-blocked or offline: analytics are best-effort

  const capture: Capture = (event, properties) => {
    void ready.then((posthog) => posthog?.capture(event, properties));
  };

  // One delegated listener instead of per-button handlers: every conversion
  // link already carries its placement in the href (see classifyCtaHref).
  // Both paths use a beacon because the click navigates away, and a normal
  // request can be cancelled with the page.
  document.addEventListener(
    "click",
    (event) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      const click =
        anchor && classifyCtaHref((anchor as HTMLAnchorElement).href);
      if (!click) return;
      if (loaded) {
        loaded.capture(
          "landing_cta_clicked",
          { ...click },
          {
            transport: "sendBeacon",
          },
        );
        return;
      }
      const payload = earlyCtaEvent({
        key,
        distinctId: crypto.randomUUID(),
        url: location.href,
        click,
      });
      navigator.sendBeacon(`${POSTHOG_HOST}/i/v0/e/`, JSON.stringify(payload));
    },
    { capture: true },
  );

  return { provide: { analytics: { capture } } };
});
