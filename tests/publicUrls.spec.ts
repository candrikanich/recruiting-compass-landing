import { describe, it, expect, vi } from "vitest";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// URLs that live outside this repo: indexed by search engines, linked from the
// App Store listing (legal pages), and pinned in social bios (/links). Removing
// or renaming one breaks those links silently, so each must keep a page or get
// an explicit redirect. Add to this list when a new URL ships; never remove one.
const mustKeepUrls = ["/", "/legal/privacy", "/legal/terms", "/links"];

type RouteRules = Record<string, { redirect?: unknown }>;

async function loadRouteRules(): Promise<RouteRules> {
  vi.stubGlobal("defineNuxtConfig", <T>(config: T) => config);
  const { default: config } = await import("../nuxt.config");
  return (config.routeRules ?? {}) as RouteRules;
}

function pageFileExists(url: string): boolean {
  const path = url === "/" ? "index" : url.slice(1);
  return (
    existsSync(join(root, "pages", `${path}.vue`)) ||
    existsSync(join(root, "pages", path, "index.vue"))
  );
}

describe("public URLs", () => {
  it.each(mustKeepUrls)("%s still has a page or a redirect", async (url) => {
    const routeRules = await loadRouteRules();
    const served = pageFileExists(url) || Boolean(routeRules[url]?.redirect);
    expect(served, `${url} has no page and no routeRules redirect`).toBe(true);
  });
});
