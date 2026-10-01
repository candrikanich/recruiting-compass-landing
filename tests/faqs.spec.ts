import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { faqs, availabilityAnswer } from "../data/faqs";
import { iosLive } from "../data/site";

const dir = dirname(fileURLToPath(import.meta.url));

// Mirrors the Canonical FAQ (web repo docs/marketing/customer-questions.md);
// in-app help on web and iOS uses the same ids and text.
const canonicalIds = [
  "cost",
  "availability",
  "web-vs-ios",
  "sports",
  "calendars",
  "templates",
  "recruiting-service",
  "family",
  "privacy",
  "too-early",
  "different",
  "why-no-athletic-fit",
];

describe("landing FAQ", () => {
  it("matches the canonical FAQ ids and order", () => {
    expect(faqs.map((f) => f.id)).toEqual(canonicalIds);
  });

  it("does not reintroduce claims the product contradicts", () => {
    const allText = faqs.map((f) => f.answer).join(" ");
    // Public profiles are crawlable (web robots.txt allows /p/).
    expect(allText).not.toMatch(/not indexed|not searchable/i);
    // Contact-window logic swaps templates; it never blocks a send.
    expect(allText).not.toMatch(/prevent[s]? you from sending/i);
    expect(allText).not.toMatch(/launching in fall 2026/i);
  });

  it("availability answer follows the iosLive switch", () => {
    const availability = faqs.find((f) => f.id === "availability");
    expect(availability?.answer).toBe(availabilityAnswer(iosLive));
  });

  it("availability has canonical pre-launch and live wording", () => {
    expect(availabilityAnswer(false)).toBe(
      "Right now on the web at myrecruitingcompass.com, on any computer, tablet, or phone browser. The iPhone and iPad app is on its way to the App Store.",
    );
    expect(availabilityAnswer(true)).toBe(
      "On the web at myrecruitingcompass.com and on iPhone and iPad — download it from the App Store. Same account and data everywhere.",
    );
  });
});

describe("contact email", () => {
  it("footer uses hello@ (info@ is retired)", () => {
    const footer = readFileSync(
      join(dir, "..", "components/sections/FooterSection.vue"),
      "utf8",
    );
    expect(footer).toContain("hello@therecruitingcompass.com");
    expect(footer).not.toContain("info@therecruitingcompass.com");
  });
});
