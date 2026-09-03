import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(join(dir, "..", p), "utf8");

describe("pricing copy is consistent", () => {
  const faqAnswer =
    "It's free right now. Every family that signs up during our founding period keeps full access free for life — no card, no catch. After the founding window closes, new families get a 30-day free trial, then $99/year or $12.99/month for the whole family.";

  it("FAQ answer matches in both copies", () => {
    expect(read("components/sections/FaqSection.vue")).toContain(faqAnswer);
    expect(read("pages/index.vue")).toContain(faqAnswer);
  });

  it("no stale pricing lines remain", () => {
    for (const file of [
      "pages/index.vue",
      "components/sections/FaqSection.vue",
      "components/sections/CtaSection.vue",
    ]) {
      const src = read(file);
      expect(src).not.toContain("still finalizing pricing");
      expect(src).not.toContain("Special pricing for early survey participants");
      expect(src).not.toContain('price: "0"');
    }
  });

  it("CTA card advertises free for life", () => {
    expect(read("components/sections/CtaSection.vue")).toContain("Free for Life");
  });
});
