import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(dir, "../pages/legal/privacy.vue"), "utf8");

// Prettier re-wraps template text, so compare on the rendered wording only.
const policyText = source
  .slice(source.indexOf("<template>"), source.lastIndexOf("</template>"))
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/\s+/g, " ");

// The web app (recruiting-compass-web, the source of truth) and the iOS app
// (PrivacyPolicyView.swift) carry their own copies of this policy. These are
// the sentences that have drifted or been dropped before — if one changes
// here, change it in the other copies too.
describe("privacy policy copy", () => {
  it.each([
    "Sensitive Information",
    "Marketing Emails",
    "Residents of Other States",
    "Global Privacy Control (GPC)",
  ])('keeps the "%s" subsection', (heading) => {
    expect(source).toMatch(new RegExp(`<h3[^>]*>\\s*${escapeRegExp(heading)}`));
  });

  it.each([
    "We do not sell or share your personal information with third parties for their own advertising or marketing purposes.",
    "Only adult account holders can opt in: parents, and players who are 18 or older.",
    "Users under 18 are not offered marketing email and do not receive it.",
    "We do not use open or click tracking in our emails.",
    "If you enter your email address there, we add it to our email list and send you that email until you unsubscribe.",
    "We share your email address and subscription status with Resend for that purpose only.",
    "We do not send marketing email to users under 18.",
  ])("states: %s", (sentence) => {
    expect(policyText).toContain(sentence);
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
