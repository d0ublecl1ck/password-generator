const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_PROD_SITE_URL = "https://genpasswd.vercel.app";

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
  const explicit = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (explicit) return normalizeSiteUrl(explicit);

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return normalizeSiteUrl(`https://${vercelUrl}`);

  if (process.env.NODE_ENV === "production") {
    return normalizeSiteUrl(DEFAULT_PROD_SITE_URL);
  }

  return normalizeSiteUrl(DEFAULT_SITE_URL);
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, base).toString();
}
