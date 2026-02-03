const GITHUB_HOST = "github.com";
const DEFAULT_GITHUB_URL = "https://github.com/d0ublecl1ck/password-generator";

function stripGitSuffix(value: string): string {
  return value.endsWith(".git") ? value.slice(0, -4) : value;
}

export function normalizeGithubUrl(raw?: string): string | null {
  const value = (raw ?? "").trim();
  if (!value) return null;

  let candidate = value;

  if (candidate.startsWith("git@github.com:")) {
    candidate = `https://${GITHUB_HOST}/${stripGitSuffix(candidate.slice("git@github.com:".length))}`;
  } else if (candidate.startsWith("ssh://git@github.com/")) {
    candidate = `https://${GITHUB_HOST}/${stripGitSuffix(candidate.slice("ssh://git@github.com/".length))}`;
  } else if (candidate.startsWith(`${GITHUB_HOST}/`)) {
    candidate = `https://${candidate}`;
  } else if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(candidate)) {
    candidate = `https://${GITHUB_HOST}/${candidate}`;
  }

  candidate = stripGitSuffix(candidate);

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    // Allow values like "example.com" without scheme.
  }

  try {
    const url = new URL(`https://${candidate}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getGithubUrl(): string | null {
  const explicit = process.env.NEXT_PUBLIC_GITHUB_URL;
  if (explicit !== undefined) return normalizeGithubUrl(explicit);
  return normalizeGithubUrl(DEFAULT_GITHUB_URL);
}
