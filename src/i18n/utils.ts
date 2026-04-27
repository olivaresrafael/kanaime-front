import { ui, useTranslations, type UILanguage, type UIKey } from "./ui";
import { tagTranslations, getTagDisplay, getAllTags } from "./tags";

export { ui, useTranslations, tagTranslations, getTagDisplay, getAllTags };
export type { UILanguage, UIKey };

/**
 * Returns the other locale (for language switching).
 */
export function getOtherLocale(current: string): "es" | "en" {
  return current === "es" ? "en" : "es";
}

/**
 * Build a localized path.
 * Spanish (default) has no prefix: /about
 * English uses /en prefix: /en/about
 */
export function localizePath(path: string, locale: string): string {
  const clean = path.replace(/^\//, "");
  if (locale === "es") {
    return clean ? `/${clean}` : "/";
  }
  return `/${locale}/${clean}`;
}
