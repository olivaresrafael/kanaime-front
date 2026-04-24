# AGENTS.md — Kanaimé

## Project Overview

Bilingual (ES/EN) digital magazine built with Astro 6, Tailwind CSS, and Cloudflare.

## Architecture

- **Framework**: Astro 6.x with MDX support
- **Styling**: Tailwind CSS 4
- **Adapter**: `@astrojs/cloudflare` (static output)
- **i18n**: Manual routing via `src/pages/[lang]/` with `getStaticPaths()`
- **Content**: Astro Content Collections (`src/content/blog/`, `src/content/authors/`)

## Key Patterns

### i18n
- Routes: `/es/` and `/en/` prefixes
- UI strings: `src/i18n/ui.ts`
- Tag translations: `src/i18n/tags.ts`
- Never rely on `Astro.currentLocale`; use `Astro.params.lang`

### Sidebar Widgets
- Modular component at `src/components/sidebar/Sidebar.astro`
- Activatable widgets: `authors`, `recent`, `tags`, `featured`, `related`, `random`, `archive`
- Two modes per widget: `simple` | `detail`
- Used in both Home and BlogPost layouts

### Images
- Hero images: referenced from `src/assets/` (processed by Astro)
- Inline article images: placed in `public/images/`
- Cover image vs hero image: `coverImage` for post hero, `heroImage` for list thumbnails

## MailerLite Newsletter Integration

### Setup

1. Get your API key from [MailerLite Dashboard → Integrations → API](https://dashboard.mailerlite.com/integrations/api)
2. (Optional) Create a group in MailerLite and copy its ID
3. Set environment variables:

#### Local Development

Create a `.env` file in the project root:

```bash
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=your_group_id_here  # optional
```

Restart the dev server after creating `.env`.

#### Cloudflare Production

For Cloudflare Workers/Pages, environment variables are accessed at runtime. Use one of these methods:

**Option 1: Wrangler secrets (recommended for API keys)**

```bash
wrangler secret put MAILERLITE_API_KEY
# Enter your API key when prompted

wrangler secret put MAILERLITE_GROUP_ID
# Enter your group ID when prompted (optional)
```

**Option 2: Cloudflare Dashboard**

Go to your Worker/Pages project → Settings → Environment Variables and add:
- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_ID` (optional)

### How It Works

- Frontend: `src/components/NewsletterSignup.astro` renders the form
- Backend: `src/pages/api/subscribe.ts` receives POST requests and calls MailerLite API
- The endpoint reads `MAILERLITE_API_KEY` from `import.meta.env` (Vite) in development, and from Cloudflare runtime env vars in production
- The endpoint is serverless (`export const prerender = false`) and runs on Cloudflare Workers

### API Endpoint

```
POST /api/subscribe
Content-Type: application/json

{ "email": "user@example.com" }
```

Response on success:
```json
{ "success": true, "subscriberId": "123456789" }
```

### Troubleshooting

| Issue | Solution |
|---|---|
| "API key not configured" | Check `MAILERLITE_API_KEY` env var is set |
| Build fails with API errors | The endpoint is serverless; errors only appear at runtime |
| CORS errors | Not applicable — same-origin fetch |

## Build Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Content Structure

```
src/content/blog/
  ├── *.mdx          # Spanish posts (lang: "es")
  └── *.md           # English posts (lang: "en", translationOf: "slug")

src/content/authors/
  └── *.md           # Author profiles
```

## Important Notes

- Clear `.astro/` cache if content changes don't appear: `rm -rf .astro/`
- The site uses `output: 'static'` — pages are pre-rendered at build time
- Serverless endpoints (like `/api/subscribe`) work via `export const prerender = false`
- Image paths in frontmatter must be relative: `../../assets/filename.png`
