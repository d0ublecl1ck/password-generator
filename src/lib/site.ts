const DEFAULT_SITE_URL = "http://localhost:3000";

export function normalizeSiteUrl(raw?: string): URL {
  const value = (raw ?? "").trim();
  if (!value) return new URL(DEFAULT_SITE_URL);

  try {
    return new URL(value);
  } catch {
    // Allow values like "example.com" without scheme.
  }

  try {
    return new URL(`https://${value}`);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function getSiteUrl(): URL {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL,
  );
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, base).toString();
}

