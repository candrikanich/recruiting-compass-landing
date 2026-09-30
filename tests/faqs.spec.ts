import { describe, it, expect } from "vitest";
import { faqs, AVAILABILITY_LIVE, AVAILABILITY_PRE_LAUNCH } from "../data/faqs";
import { iosLive } from "../data/site";

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

  it("availability answer follows the iosLive launch switch", () => {
    const availability = faqs.find((f) => f.id === "availability")?.answer;
    expect(availability).toBe(
      iosLive ? AVAILABILITY_LIVE : AVAILABILITY_PRE_LAUNCH,
    );
  });
});
