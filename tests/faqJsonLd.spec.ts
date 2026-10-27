// @vitest-environment node
import { describe, it, expect, beforeAll } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dated =
  "Sibling families added to a founding family before December 31, 2026 are free for life too.";

// Reads the prerendered page so a rewrite anywhere between data/faqs.ts and the
// emitted JSON-LD (e.g. in pages/index.vue) is caught, not just the source data.
describe("prerendered FAQPage JSON-LD", () => {
  let jsonLd = "";

  beforeAll(() => {
    execFileSync("npx", ["nuxt", "build"], { cwd: root, stdio: "ignore" });
    const html = readFileSync(
      join(root, ".output/public/index.html"),
      "utf8",
    );
    jsonLd = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ]
      .map((m) => m[1])
      .join("\n");
  }, 180_000);

  it("has the dated founding-sibling sentence in a FAQPage acceptedAnswer", () => {
    expect(jsonLd).toContain("FAQPage");
    expect(jsonLd).toContain(dated);
  });

  it("has the per-family price sentence and no first-player/additional-sibling wording", () => {
    expect(jsonLd).toContain(
      "$99/year or $12.99/month for a player's family, and $49/year or $6.49/month for each sibling's family.",
    );
    expect(jsonLd).not.toMatch(/first player/i);
    expect(jsonLd).not.toMatch(/additional sibling/i);
  });

  it("does not contain the undated or 'players' wording", () => {
    expect(jsonLd).not.toContain("Sibling families you add to a founding family");
    expect(jsonLd).not.toContain("Sibling players added");
  });
});
