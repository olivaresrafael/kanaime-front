// src/utils/date.ts
const DATE_LOCALES: Record<string, string> = {
  es: "es-ES",
  en: "en-US",
};

interface FormatOptions {
  includeTime?: boolean;
  dateStyle?: "short" | "medium" | "long" | "full";
}

export function formatDate(
  date: Date,
  lang: "es" | "en" = "es",
  options: FormatOptions = {}
): string {
  const { includeTime = false, dateStyle = "medium" } = options;
  const locale = DATE_LOCALES[lang] || lang;

  const dateOpts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (includeTime) {
    dateOpts.hour = "2-digit";
    dateOpts.minute = "2-digit";
    dateOpts.hour12 = false;
  }

  return date.toLocaleDateString(locale, dateOpts);
}
