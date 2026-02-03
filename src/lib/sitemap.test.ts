import test from "node:test";
import assert from "node:assert/strict";

import { buildSitemap, PUBLIC_PATHS } from "./sitemap";

test("PUBLIC_PATHS includes core pages", () => {
  assert.deepEqual(PUBLIC_PATHS, ["/", "/about", "/privacy"]);
});

test("buildSitemap returns absolute URLs for each public path", () => {
  const prev = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

  try {
    const now = new Date("2026-02-03T00:00:00.000Z");
    const entries = buildSitemap(now);

    assert.equal(entries.length, PUBLIC_PATHS.length);
    assert.equal(entries[0]?.url, "https://example.com/");
    assert.equal(entries[1]?.url, "https://example.com/about");
    assert.equal(entries[2]?.url, "https://example.com/privacy");

    for (const entry of entries) {
      assert.equal(entry.lastModified.toISOString(), now.toISOString());
    }
  } finally {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = prev;
  }
});

