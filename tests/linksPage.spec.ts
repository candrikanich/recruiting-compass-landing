import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { appStoreCampaign, appStoreUrl, isAppleMobile } from "../data/site";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(join(dir, "..", p), "utf8");

describe("/links page", () => {
  it("is prerendered and kept out of search", () => {
    const config = read("nuxt.config.ts");
    expect(config).toContain('"/links"');
    expect(config).toMatch(/"\/links": \{ robots: false \}/);
  });

  it("links web signup and the App Store with tracked helpers", () => {
    const page = read("pages/links.vue");
    expect(page).toContain('useSignupUrl("links")');
    expect(page).toContain('useAppStoreUrl("links")');
    expect(page).toContain("/timeline.pdf");
  });
});

describe("App Store campaign", () => {
  it("adds the inbound utm_source to the placement", () => {
    expect(appStoreCampaign("links", "?utm_source=instagram")).toBe(
      "links-instagram",
    );
  });

  it("falls back to the placement on a direct visit", () => {
    expect(appStoreCampaign("links", "")).toBe("links");
  });

  it("strips characters Apple doesn't allow", () => {
    expect(appStoreCampaign("links", "?utm_source=Face Book!")).toBe(
      "links-facebook",
    );
  });

  it("lands in the App Store link's ct", () => {
    const url = new URL(
      appStoreUrl(appStoreCampaign("links", "utm_source=tiktok")),
    );
    expect(url.searchParams.get("ct")).toBe("links-tiktok");
  });
});

describe("isAppleMobile", () => {
  it("matches iPhone and iPad", () => {
    expect(
      isAppleMobile({
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15",
      }),
    ).toBe(true);
    expect(
      isAppleMobile({
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        platform: "MacIntel",
        maxTouchPoints: 5,
      }),
    ).toBe(true);
  });

  it("leaves Android and desktop Macs alone", () => {
    expect(
      isAppleMobile({ userAgent: "Mozilla/5.0 (Linux; Android 15; Pixel 9)" }),
    ).toBe(false);
    expect(
      isAppleMobile({
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        platform: "MacIntel",
        maxTouchPoints: 0,
      }),
    ).toBe(false);
  });
});
