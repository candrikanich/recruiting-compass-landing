import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(join(dir, "..", p), "utf8");

describe("pricing copy is consistent", () => {
  const faqAnswer =
    "It's free right now. Every family that signs up during our founding period keeps full access free for life — no card, no catch. Sibling players added to a founding family before December 31, 2026 are free for life too. After the founding window closes, new families get a 30-day free trial, then pricing is per player: $99/year or $12.99/month for the first player, and $49/year or $6.49/month for each additional sibling.";

  it("FAQ answer is the shared canonical copy", () => {
    expect(read("data/faqs.ts")).toContain(faqAnswer);
  });

  it("founding-sibling promise is dated and the undated wording is gone", () => {
    const stale =
      "Sibling families you add to a founding family are free for life too.";
    const dated =
      "Sibling players added to a founding family before December 31, 2026 are free for life too.";
    for (const file of [
      "data/faqs.ts",
      "pages/index.vue",
      "components/sections/CtaSection.vue",
      "components/sections/FaqSection.vue",
    ]) {
      expect(read(file)).not.toContain(stale);
    }
    expect(read("data/faqs.ts")).toContain(dated);
  });

  it("no stale pricing lines remain", () => {
    for (const file of [
      "pages/index.vue",
      "data/faqs.ts",
      "components/sections/FaqSection.vue",
      "components/sections/CtaSection.vue",
    ]) {
      const src = read(file);
      expect(src).not.toContain("still finalizing pricing");
      expect(src).not.toContain(
        "Special pricing for early survey participants",
      );
      expect(src).not.toContain('price: "0"');
    }
  });

  it("pricing is per player and no copy says one account tracks several athletes", () => {
    for (const file of ["data/faqs.ts", "components/sections/CtaSection.vue"]) {
      const src = read(file);
      expect(src).not.toContain("for the whole family");
      expect(src).not.toMatch(/more than one athlete\.|can also track more than one athlete/);
    }
  });

  it("CTA card advertises free for life", () => {
    expect(read("components/sections/CtaSection.vue")).toContain(
      "Free for Life",
    );
  });
});
