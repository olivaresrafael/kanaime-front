// src/types.ts
import type { CollectionEntry } from "astro:content";

/**
 * Tipo resumido de un post usado por widgets del sidebar.
 */
export type PostSummary = Pick<
  CollectionEntry<"blog">,
  "id"
> & {
  data: Pick<
    CollectionEntry<"blog">["data"],
    "title" | "description" | "pubDate" | "heroImage" | "author" | "tags" | "lang"
  >;
};

/**
 * Props comunes para widgets del sidebar que reciben posts.
 */
export interface SidebarWidgetProps {
  lang: "es" | "en";
  mode?: "simple" | "detail";
  posts: PostSummary[];
  currentPostId?: string;
}
