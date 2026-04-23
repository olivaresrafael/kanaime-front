/**
 * Tag translations between Spanish and English.
 * Maps a tag in one language to the other.
 */
export const tagTranslations: Record<string, Record<string, string>> = {
  es: {
    nature: "naturaleza",
    exploration: "exploración",
    culture: "cultura",
    photography: "fotografía",
    profiles: "perfiles",
  },
  en: {
    naturaleza: "nature",
    exploración: "exploration",
    cultura: "culture",
    fotografía: "photography",
    perfiles: "profiles",
  },
};

/**
 * Get the display name of a tag in a given language.
 * If the tag is already in the target language, returns it as-is.
 */
export function getTagDisplay(tag: string, lang: "es" | "en"): string {
  const map = tagTranslations[lang];
  return map[tag] || tag;
}

/**
 * Get all tags for a given language.
 */
export function getAllTags(lang: "es" | "en"): string[] {
  return Object.values(tagTranslations[lang]);
}
