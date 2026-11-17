import { WEB_APP_URL } from "~/data/site";

export type CtaDestination = "web_signup" | "web_app" | "app_store";

export interface CtaClick {
  destination: CtaDestination;
  placement: string | null;
}

const WEB_APP_HOST = new URL(WEB_APP_URL).host;

// Placement is already encoded in every conversion link (see data/site.ts):
// utm_content when inbound UTMs were carried through, else utm_campaign, and
// `ct` on App Store links. Reading it back from the href means a new CTA is
// tracked the moment it uses those helpers, with no per-button wiring.
export function classifyCtaHref(href: string): CtaClick | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  if (url.host === "apps.apple.com") {
    return {
      destination: "app_store",
      placement: url.searchParams.get("ct"),
    };
  }

  if (url.host !== WEB_APP_HOST) return null;

  if (url.pathname === "/signup") {
    return {
      destination: "web_signup",
      placement:
        url.searchParams.get("utm_content") ??
        url.searchParams.get("utm_campaign"),
    };
  }

  return { destination: "web_app", placement: null };
}

export const POSTHOG_HOST = "https://us.i.posthog.com";

// A tap that lands before the lazy SDK chunk loads (slow mobile, which is most
// campaign traffic) would otherwise be lost with the page. This payload goes
// straight to the capture endpoint by beacon. `early` marks these so they can
// be told apart: their anonymous id is throwaway and won't match the
// pageview's, and no person profile is created for it.
export function earlyCtaEvent(input: {
  key: string;
  distinctId: string;
  url: string;
  click: CtaClick;
}) {
  return {
    api_key: input.key,
    event: "landing_cta_clicked",
    distinct_id: input.distinctId,
    properties: {
      ...input.click,
      platform: "landing",
      early: true,
      $current_url: input.url,
      $process_person_profile: false,
    },
  };
}

// A production build served locally (`npm run preview`, Playwright) is not
// `dev`, yet must never send to the live project: two test page-leaves did.
export function isLocalHost(hostname: string): boolean {
  return (
    ["localhost", "127.0.0.1", "[::1]"].includes(hostname) ||
    hostname.endsWith(".local")
  );
}

export function shouldEnableAnalytics(env: {
  key: string;
  gpc: boolean;
  dev: boolean;
  local: boolean;
}): boolean {
  return Boolean(env.key) && !env.gpc && !env.dev && !env.local;
}
