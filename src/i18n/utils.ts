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
 * /about → /es/about or /en/about
 */
export function localizePath(path: string, locale: string): string {
  const clean = path.replace(/^\//, "");
  return `/${locale}/${clean}`;
}
