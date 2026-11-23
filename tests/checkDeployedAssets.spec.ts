import { describe, it, expect, vi } from "vitest";
import { findMissingAssets } from "../scripts/check-deployed-assets.mjs";

const base = "https://example.com";
const noSleep = () => Promise.resolve();

function headResponses(statusesByAsset: Record<string, number[]>) {
  const calls: Record<string, number> = {};
  const fetchFn = vi.fn(async (url: URL) => {
    const path = url.pathname;
    const statuses = statusesByAsset[path] ?? [200];
    const i = calls[path] ?? 0;
    calls[path] = i + 1;
    return { status: statuses[Math.min(i, statuses.length - 1)] ?? 200 };
  });
  return { fetchFn, calls };
}

describe("findMissingAssets", () => {
  it("passes an asset that 404s during cutover and then appears", async () => {
    const { fetchFn } = headResponses({ "/_nuxt/a.js": [404, 404, 200] });

    const missing = await findMissingAssets(base, ["/_nuxt/a.js"], {
      fetchFn,
      attempts: 5,
      sleep: noSleep,
    });

    expect(missing).toEqual([]);
  });

  it("fails an asset that never appears, so a stale manifest still blocks the deploy", async () => {
    const { fetchFn, calls } = headResponses({ "/_nuxt/gone.js": [404] });

    const missing = await findMissingAssets(base, ["/_nuxt/gone.js"], {
      fetchFn,
      attempts: 5,
      sleep: noSleep,
    });

    expect(missing).toEqual(["asset /_nuxt/gone.js → 404"]);
    expect(calls["/_nuxt/gone.js"]).toBe(5);
  });

  it("checks a present asset only once", async () => {
    const { fetchFn, calls } = headResponses({});

    await findMissingAssets(base, ["/_nuxt/ok.js"], {
      fetchFn,
      attempts: 5,
      sleep: noSleep,
    });

    expect(calls["/_nuxt/ok.js"]).toBe(1);
  });

  it("reports a non-404 error without waiting it out", async () => {
    const { fetchFn, calls } = headResponses({ "/_nuxt/err.js": [500] });

    const missing = await findMissingAssets(base, ["/_nuxt/err.js"], {
      fetchFn,
      attempts: 5,
      sleep: noSleep,
    });

    expect(missing).toEqual(["asset /_nuxt/err.js → 500"]);
    expect(calls["/_nuxt/err.js"]).toBe(1);
  });
});
