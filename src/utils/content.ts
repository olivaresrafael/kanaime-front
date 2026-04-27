// src/utils/content.ts
import { getCollection, type CollectionEntry } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  return await getCollection("blog");
}

export function getPostsByLang(
  posts: CollectionEntry<"blog">[],
  lang: "es" | "en"
): CollectionEntry<"blog">[] {
  return posts.filter((p) => p.data.lang === lang);
}

export function sortPostsByDate(
  posts: CollectionEntry<"blog">[]
): CollectionEntry<"blog">[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getSortedPostsByLang(
  posts: CollectionEntry<"blog">[],
  lang: "es" | "en"
): CollectionEntry<"blog">[] {
  return sortPostsByDate(getPostsByLang(posts, lang));
}

export async function getAuthors(): Promise<CollectionEntry<"authors">[]> {
  return await getCollection("authors");
}

export function getPostsByAuthor(
  posts: CollectionEntry<"blog">[],
  authorName: string,
  lang?: "es" | "en"
): CollectionEntry<"blog">[] {
  const filtered = posts.filter(
    (p) => p.data.author?.toLowerCase() === authorName.toLowerCase()
  );
  if (lang) {
    return sortPostsByDate(filtered.filter((p) => p.data.lang === lang));
  }
  return sortPostsByDate(filtered);
}
