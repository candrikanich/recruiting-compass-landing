import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { appStoreUrl, webSignupUrl, APP_STORE_ID } from "../data/site";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(join(dir, "..", p), "utf8");

const PAGE_FILES = [
  "components/sections/HeroSection.vue",
  "components/sections/CtaSection.vue",
  "components/sections/FooterSection.vue",
  "components/WaitlistForm.vue",
  "layouts/default.vue",
];

describe("launch copy", () => {
  it("no pre-launch survey or waitlist language remains", () => {
    for (const file of PAGE_FILES) {
      const src = read(file);
      expect(src, file).not.toContain("Take the Survey");
      expect(src, file).not.toContain("Coming Fall 2026");
      expect(src, file).not.toContain("Get notified when we launch");
      expect(src, file).not.toContain("openTypeform");
    }
  });

  it("hero prerenders a sport-neutral headline", () => {
    const hero = read("components/sections/HeroSection.vue");
    expect(hero).not.toContain('ref("Baseball ")');
    expect(hero).toContain('ref("College Athletic ")');
  });

  it("timeline PDF lead magnet is hosted at /timeline.pdf", () => {
    expect(existsSync(join(dir, "..", "public/timeline.pdf"))).toBe(true);
  });

  it("every signup link forwards inbound UTM tags", () => {
    for (const file of [
      "components/sections/HeroSection.vue",
      "components/sections/CtaSection.vue",
      "components/sections/FooterSection.vue",
      "layouts/default.vue",
    ]) {
      expect(read(file), file).toContain("useSignupUrl(");
    }
  });

  it("hero and CTA link to web signup", () => {
    expect(read("components/sections/HeroSection.vue")).toContain(
      'useSignupUrl("landing-hero")',
    );
    expect(read("components/sections/CtaSection.vue")).toContain(
      'useSignupUrl("landing-cta")',
    );
  });

  it("footer links every brand social account", () => {
    const footer = read("components/sections/FooterSection.vue");
    expect(footer).toContain("SOCIAL.instagram");
    expect(footer).toContain("SOCIAL.facebook");
    expect(footer).toContain("SOCIAL.x");
    expect(footer).toContain("SOCIAL.tiktok");
  });

  it("sports grid lists the canonical 19 sports", () => {
    const grid = read("components/sections/SportsGridSection.vue");
    for (const sport of [
      "Wrestling",
      "Rowing",
      "Water Polo",
      "Cross Country",
    ]) {
      expect(grid).toContain(sport);
    }
    expect(grid).not.toContain("(M)");
  });

  it("stats render real numbers without JavaScript", () => {
    expect(read("components/sections/StatsSection.vue")).not.toContain(
      "current: 0",
    );
  });
});

describe("site links", () => {
  it("App Store link carries the app id and campaign", () => {
    const url = new URL(appStoreUrl("landing-hero"));
    expect(url.pathname).toBe(`/app/id${APP_STORE_ID}`);
    expect(url.searchParams.get("ct")).toBe("landing-hero");
  });

  it("App Store campaign is capped at Apple's 40 characters", () => {
    const url = new URL(appStoreUrl("x".repeat(60)));
    expect(url.searchParams.get("ct")).toHaveLength(40);
  });

  it("web signup link carries UTM tags", () => {
    const url = new URL(webSignupUrl("landing-hero"));
    expect(url.origin + url.pathname).toBe(
      "https://myrecruitingcompass.com/signup",
    );
    expect(url.searchParams.get("utm_source")).toBe("landing");
    expect(url.searchParams.get("utm_campaign")).toBe("landing-hero");
  });

  it("inbound UTM tags win, with the placement kept as utm_content", () => {
    const url = new URL(
      webSignupUrl(
        "landing-hero",
        "?utm_source=tiktok&utm_medium=social&utm_campaign=bio&x=1",
      ),
    );
    expect(url.searchParams.get("utm_source")).toBe("tiktok");
    expect(url.searchParams.get("utm_medium")).toBe("social");
    expect(url.searchParams.get("utm_campaign")).toBe("bio");
    expect(url.searchParams.get("utm_content")).toBe("landing-hero");
    expect(url.searchParams.has("x")).toBe(false);
  });

  it("direct visits keep the landing attribution", () => {
    const url = new URL(webSignupUrl("landing-cta", ""));
    expect(url.searchParams.get("utm_source")).toBe("landing");
    expect(url.searchParams.get("utm_campaign")).toBe("landing-cta");
    expect(url.searchParams.has("utm_content")).toBe(false);
  });
});
