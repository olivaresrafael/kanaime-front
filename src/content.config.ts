import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      coverImage: image().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      photo: image().optional(),
      social: z.object({
        twitter: z.string().optional(),
        website: z.string().optional(),
        instagram: z.string().optional(),
      }).optional(),
    }),
});

export const collections = { blog, authors };
