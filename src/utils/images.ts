// src/utils/images.ts
/**
 * Extrae la URL src de una imagen de Astro (ImageMetadata) o devuelve el string.
 */
export function getImageSrc(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === "object" && image !== null && "src" in image) {
    return (image as { src: string }).src;
  }
  if (typeof image === "string") return image;
  return undefined;
}
