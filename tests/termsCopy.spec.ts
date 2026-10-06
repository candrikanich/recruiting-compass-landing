import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(dir, "../pages/legal/terms.vue"), "utf8");

// Prettier re-wraps template text, so compare on the rendered wording only.
const termsText = source
  .slice(source.indexOf("<template>"), source.lastIndexOf("</template>"))
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/\s+/g, " ");

// The web app (recruiting-compass-web) and the iOS app (TermsOfServiceView.swift)
// carry their own copies of this contact block — keep them identical.
describe("terms of service contact block", () => {
  it("shows the company mailing address", () => {
    expect(termsText).toContain(
      "The Recruiting Compass LLC 34125 Center Ridge Rd #1012 North Ridgeville, OH 44039",
    );
  });

  it("no longer shows the placeholder address", () => {
    expect(source).not.toContain("Olmsted Township");
  });
});
