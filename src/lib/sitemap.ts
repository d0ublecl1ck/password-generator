import { absoluteUrl } from "./site";

export const PUBLIC_PATHS = ["/", "/about", "/privacy"] as const;

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export function buildSitemap(now: Date = new Date()): SitemapEntry[] {
  return PUBLIC_PATHS.map((pathname) => {
    const isHome = pathname === "/";
    return {
      url: absoluteUrl(pathname),
      lastModified: now,
      changeFrequency: isHome ? "weekly" : "monthly",
      priority: isHome ? 1 : 0.4,
    };
  });
}

