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
 * A 404 is re-checked for ~60s before it counts: right after
 * `vercel deploy --prod` returns, the new HTML can be live before every new
 * asset is, which failed the deploys for #120, #126 and #123 although the
 * site was healthy. A stale-manifest asset never appears, so it still fails.
 *
 * Usage:
 *   node scripts/check-deployed-assets.mjs <base-url> [path ...]
 *
 * Paths default to /, /legal/privacy, /legal/terms. Exits 1 on any miss.
 */

import { pathToFileURL } from "node:url";

const DEFAULT_PATHS = ["/", "/legal/privacy", "/legal/terms"];
const ASSET_REF = /(?:href|src)="(\/_nuxt\/[^"]+)"/g;
const NOT_FOUND = 404;

const headRequest = (url) => fetch(url, { method: "HEAD" });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchStatus(url) {
  const res = await fetch(url, { headers: { "cache-control": "no-cache" } });
  return { status: res.status, body: await res.text() };
}

async function settledStatus(url, { fetchFn, attempts, delayMs, sleep }) {
  for (let attempt = 1; ; attempt++) {
    const { status } = await fetchFn(url);
    if (status !== NOT_FOUND || attempt >= attempts) return status;
    await sleep(delayMs);
  }
}

/**
 * @param {string} baseUrl
 * @param {Iterable<string>} assets
 * @param {{
 *   fetchFn?: (url: URL) => Promise<{ status: number }>,
 *   attempts?: number,
 *   delayMs?: number,
 *   sleep?: (ms: number) => Promise<void>,
 * }} [options]
 * @returns {Promise<string[]>}
 */
export async function findMissingAssets(
  baseUrl,
  assets,
  { fetchFn = headRequest, attempts = 13, delayMs = 5000, sleep = wait } = {},
) {
  const results = await Promise.all(
    [...assets].map(async (asset) => ({
      asset,
      status: await settledStatus(new URL(asset, baseUrl), {
        fetchFn,
        attempts,
        delayMs,
        sleep,
      }),
    })),
  );
  return results
    .filter(({ status }) => status !== 200)
    .map(({ asset, status }) => `asset ${asset} → ${status}`);
}

async function main() {
  const [baseUrl, ...rest] = process.argv.slice(2);
  if (!baseUrl) {
    console.error("Usage: check-deployed-assets.mjs <base-url> [path ...]");
    process.exit(2);
  }
  const paths = rest.length > 0 ? rest : DEFAULT_PATHS;

  const assets = new Set();
  const pageFailures = [];

  for (const path of paths) {
    const { status, body } = await fetchStatus(new URL(path, baseUrl));
    if (status !== 200) {
      pageFailures.push(`page ${path} → ${status}`);
      continue;
    }
    const refs = [...body.matchAll(ASSET_REF)].map((m) => m[1]);
    if (refs.length === 0)
      pageFailures.push(`page ${path} references no /_nuxt/ assets`);
    refs.forEach((ref) => assets.add(ref));
  }

  const failures = [
    ...pageFailures,
    ...(await findMissingAssets(baseUrl, assets)),
  ];

  if (failures.length > 0) {
    console.error(`✗ ${failures.length} problem(s) on ${baseUrl}:`);
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log(
    `✓ ${paths.length} page(s), ${assets.size} asset(s) OK on ${baseUrl}`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
