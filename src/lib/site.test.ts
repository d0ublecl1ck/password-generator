import test from "node:test";
import assert from "node:assert/strict";

import { absoluteUrl, getSiteUrl, normalizeSiteUrl } from "./site";

test("normalizeSiteUrl falls back to localhost", () => {
  assert.equal(normalizeSiteUrl(undefined).origin, "http://localhost:3000");
  assert.equal(normalizeSiteUrl("   ").origin, "http://localhost:3000");
});

test("normalizeSiteUrl accepts a full URL", () => {
  assert.equal(normalizeSiteUrl("https://example.com").origin, "https://example.com");
});

test("normalizeSiteUrl adds https scheme for bare domains", () => {
  assert.equal(normalizeSiteUrl("example.com").origin, "https://example.com");
});

test("getSiteUrl reads NEXT_PUBLIC_SITE_URL and absoluteUrl respects it", () => {
  const prevPublic = process.env.NEXT_PUBLIC_SITE_URL;
  const prevSite = process.env.SITE_URL;

  process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  delete process.env.SITE_URL;

  try {
    assert.equal(getSiteUrl().origin, "https://example.com");
    assert.equal(absoluteUrl("/sitemap.xml"), "https://example.com/sitemap.xml");
  } finally {
    if (prevPublic === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = prevPublic;
    if (prevSite === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = prevSite;
  }
});

