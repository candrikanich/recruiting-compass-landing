#!/usr/bin/env node
/**
 * Post-deploy smoke check: fetches each page and confirms every /_nuxt/
 * asset it references actually exists on the deployment.
 *
 * Guards against the Oct 2026 outage where Vercel's restored build cache left
 * the server renderer with a stale client manifest — pages linked
 * entry.<old-hash>.css/js that the deploy never contained, so the site
 * rendered with no CSS while the deploy itself reported READY.
 *
 * Usage:
 *   node scripts/check-deployed-assets.mjs <base-url> [path ...]
 *
 * Paths default to /, /legal/privacy, /legal/terms. Exits 1 on any miss.
 */

const DEFAULT_PATHS = ["/", "/legal/privacy", "/legal/terms"];
const ASSET_REF = /(?:href|src)="(\/_nuxt\/[^"]+)"/g;

async function fetchStatus(url) {
  const res = await fetch(url, { headers: { "cache-control": "no-cache" } });
  return { status: res.status, body: await res.text() };
}

async function main() {
  const [baseUrl, ...rest] = process.argv.slice(2);
  if (!baseUrl) {
    console.error("Usage: check-deployed-assets.mjs <base-url> [path ...]");
    process.exit(2);
  }
  const paths = rest.length > 0 ? rest : DEFAULT_PATHS;

  const assets = new Set();
  const failures = [];

  for (const path of paths) {
    const { status, body } = await fetchStatus(new URL(path, baseUrl));
    if (status !== 200) {
      failures.push(`page ${path} → ${status}`);
      continue;
    }
    const refs = [...body.matchAll(ASSET_REF)].map((m) => m[1]);
    if (refs.length === 0)
      failures.push(`page ${path} references no /_nuxt/ assets`);
    refs.forEach((ref) => assets.add(ref));
  }

  for (const asset of assets) {
    const res = await fetch(new URL(asset, baseUrl), { method: "HEAD" });
    if (res.status !== 200) failures.push(`asset ${asset} → ${res.status}`);
  }

  if (failures.length > 0) {
    console.error(`✗ ${failures.length} problem(s) on ${baseUrl}:`);
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log(
    `✓ ${paths.length} page(s), ${assets.size} asset(s) OK on ${baseUrl}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
