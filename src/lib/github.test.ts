import test from "node:test";
import assert from "node:assert/strict";

import { getGithubUrl, normalizeGithubUrl } from "./github";

test("normalizeGithubUrl returns null for empty values", () => {
  assert.equal(normalizeGithubUrl(undefined), null);
  assert.equal(normalizeGithubUrl("   "), null);
});

test("normalizeGithubUrl accepts full https URL", () => {
  assert.equal(
    normalizeGithubUrl("https://github.com/d0ublecl1ck/password-generator"),
    "https://github.com/d0ublecl1ck/password-generator",
  );
});

test("normalizeGithubUrl accepts github.com/<owner>/<repo> without scheme", () => {
  assert.equal(
    normalizeGithubUrl("github.com/d0ublecl1ck/password-generator"),
    "https://github.com/d0ublecl1ck/password-generator",
  );
});

test("normalizeGithubUrl accepts <owner>/<repo> shorthand", () => {
  assert.equal(
    normalizeGithubUrl("d0ublecl1ck/password-generator"),
    "https://github.com/d0ublecl1ck/password-generator",
  );
});

test("normalizeGithubUrl converts git@github.com:<owner>/<repo>.git", () => {
  assert.equal(
    normalizeGithubUrl("git@github.com:d0ublecl1ck/password-generator.git"),
    "https://github.com/d0ublecl1ck/password-generator",
  );
});

test("normalizeGithubUrl rejects non-http(s) protocols", () => {
  assert.equal(normalizeGithubUrl("javascript:alert(1)"), null);
});

test("getGithubUrl reads NEXT_PUBLIC_GITHUB_URL", () => {
  const prev = process.env.NEXT_PUBLIC_GITHUB_URL;
  process.env.NEXT_PUBLIC_GITHUB_URL = "d0ublecl1ck/password-generator";

  try {
    assert.equal(getGithubUrl(), "https://github.com/d0ublecl1ck/password-generator");
  } finally {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_GITHUB_URL;
    else process.env.NEXT_PUBLIC_GITHUB_URL = prev;
  }
});

test("getGithubUrl falls back to default when NEXT_PUBLIC_GITHUB_URL is not set", () => {
  const prev = process.env.NEXT_PUBLIC_GITHUB_URL;
  delete process.env.NEXT_PUBLIC_GITHUB_URL;

  try {
    assert.equal(getGithubUrl(), "https://github.com/d0ublecl1ck/password-generator");
  } finally {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_GITHUB_URL;
    else process.env.NEXT_PUBLIC_GITHUB_URL = prev;
  }
});
