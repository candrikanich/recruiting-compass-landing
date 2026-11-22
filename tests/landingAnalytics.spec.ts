import { describe, it, expect } from "vitest";
import { appStoreUrl, webSignupUrl, WEB_APP_URL } from "../data/site";
import {
  classifyCtaHref,
  earlyCtaEvent,
  isLocalHost,
  shouldEnableAnalytics,
  withSignupHandoff,
} from "../utils/landingAnalytics";

describe("earlyCtaEvent", () => {
  it("builds a self-contained capture payload for a click before the SDK loads", () => {
    const payload = earlyCtaEvent({
      key: "phc_test",
      distinctId: "anon-1",
      url: "https://www.therecruitingcompass.com/?utm_source=tiktok",
      click: { destination: "web_signup", placement: "landing-hero" },
    });
    expect(payload).toEqual({
      api_key: "phc_test",
      event: "landing_cta_clicked",
      distinct_id: "anon-1",
      properties: {
        destination: "web_signup",
        placement: "landing-hero",
        platform: "landing",
        early: true,
        $current_url: "https://www.therecruitingcompass.com/?utm_source=tiktok",
        $process_person_profile: false,
      },
    });
  });
});

describe("classifyCtaHref", () => {
  it("reads the placement from a plain landing signup link", () => {
    expect(classifyCtaHref(webSignupUrl("landing-hero"))).toEqual({
      destination: "web_signup",
      placement: "landing-hero",
    });
  });

  it("reads the placement from utm_content when inbound UTMs were carried", () => {
    const href = webSignupUrl(
      "landing-cta",
      "utm_source=tiktok&utm_medium=social&utm_campaign=spring",
    );
    expect(classifyCtaHref(href)).toEqual({
      destination: "web_signup",
      placement: "landing-cta",
    });
  });

  it("reads the placement from the App Store campaign token", () => {
    expect(classifyCtaHref(appStoreUrl("landing-footer"))).toEqual({
      destination: "app_store",
      placement: "landing-footer",
    });
  });

  it("treats other web app links as web_app with no placement", () => {
    expect(classifyCtaHref(`${WEB_APP_URL}/login`)).toEqual({
      destination: "web_app",
      placement: null,
    });
  });

  it("ignores links that are not conversions", () => {
    expect(classifyCtaHref("/legal/privacy")).toBeNull();
    expect(classifyCtaHref("#faq")).toBeNull();
    expect(
      classifyCtaHref("https://www.tiktok.com/@therecruitingcompass"),
    ).toBeNull();
    expect(classifyCtaHref("mailto:hello@example.com")).toBeNull();
    expect(classifyCtaHref("not a url")).toBeNull();
  });

  it("does not mistake a lookalike host for the web app", () => {
    expect(
      classifyCtaHref("https://myrecruitingcompass.com.evil.test/signup"),
    ).toBeNull();
  });
});

describe("shouldEnableAnalytics", () => {
  const on = { key: "phc_test", gpc: false, dev: false, local: false };

  it("is on in production with a key", () => {
    expect(shouldEnableAnalytics(on)).toBe(true);
  });

  it("is off without a key", () => {
    expect(shouldEnableAnalytics({ ...on, key: "" })).toBe(false);
  });

  it("honors Global Privacy Control", () => {
    expect(shouldEnableAnalytics({ ...on, gpc: true })).toBe(false);
  });

  it("stays off in local dev so test traffic never reaches the project", () => {
    expect(shouldEnableAnalytics({ ...on, dev: true })).toBe(false);
  });

  it("stays off on a local production preview", () => {
    expect(shouldEnableAnalytics({ ...on, local: true })).toBe(false);
  });
});

describe("isLocalHost", () => {
  it("recognises loopback and .local hosts", () => {
    for (const host of ["localhost", "127.0.0.1", "[::1]", "chris-mac.local"]) {
      expect(isLocalHost(host)).toBe(true);
    }
  });

  it("does not flag the real site or a lookalike", () => {
    expect(isLocalHost("www.therecruitingcompass.com")).toBe(false);
    expect(isLocalHost("localhost.evil.test")).toBe(false);
  });
});

describe("withSignupHandoff", () => {
  const id = "019a2b3c-4d5e-7f60-8a1b-2c3d4e5f6a7b";

  it("puts the visitor's PostHog id in the fragment so web signup can continue it", () => {
    const href = webSignupUrl("landing-hero");
    const out = new URL(withSignupHandoff(href, id));
    expect(out.hash).toBe(`#ph_did=${id}`);
    expect(out.search).toBe(new URL(href).search);
    expect(out.pathname).toBe("/signup");
  });

  it("replaces an id left over from an earlier click", () => {
    const first = withSignupHandoff(webSignupUrl("landing-cta"), "old");
    expect(withSignupHandoff(first, id)).toMatch(new RegExp(`#ph_did=${id}$`));
  });

  it("leaves an unparseable href alone", () => {
    expect(withSignupHandoff("not a url", id)).toBe("not a url");
  });
});
