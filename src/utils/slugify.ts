/**
 * Normaliza un string para usarlo como slug/URL.
 * Elimina acentos, convierte a minúsculas, reemplaza espacios por guiones.
 * "Exploración" → "exploracion", "fotografía" → "fotografia"
 */
export function slugify(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos (acentos)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // espacios → guiones
    .replace(/[^a-z0-9\-]/g, ""); // solo alfanumérico y guiones
}

/**
 * Compara dos strings ignorando acentos (para búsquedas).
 * "exploración" === "exploracion" → true
 */
export function matchAccentInsensitive(a: string, b: string): boolean {
  return slugify(a) === slugify(b);
}
