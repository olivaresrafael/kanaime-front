// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://tu-blog.pages.dev',
  output: 'static',
  integrations: [mdx(), sitemap(), markdoc()],
  adapter: cloudflare(),
 image: {
   service: passthroughImageService(),
 },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      force: true,
    },
    ssr: {
      noExternal: ['astro'],
    },
  },
});
