<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Kanaimé Astro (hybrid) project. The following changes were made:

- **`src/components/posthog.astro`** (new): PostHog JS client-side snippet, initialized from environment variables and included in every page via the base layout.
- **`src/lib/posthog-server.ts`** (new): Singleton PostHog Node.js client for server-side event tracking in API routes.
- **`src/layouts/BaseLayout.astro`**: Imported and rendered the `<PostHog />` component inside `<head>` so all pages initialize analytics.
- **`src/pages/api/subscribe.ts`**: Added server-side `newsletter_subscribed` and `newsletter_subscription_failed` events with session/distinct ID correlation headers.
- **`public/scripts/newsletter.js`**: Added client-side `newsletter_form_submitted` capture and forwards PostHog session/distinct ID headers to the subscribe API.
- **`public/scripts/global-search.js`**: Added `search_performed` (on Enter key and search button) and `search_tag_filtered` events.
- **`src/components/SponsorCard.astro`**: Added `sponsor_link_clicked` event with sponsor name, URL, and category properties.
- **`src/pages/sponsors.astro`**: Added `sponsor_contact_clicked` event on the "Escríbenos" mailto link.
- **`src/components/LanguageSwitcher.astro`**: Added `language_switched` event with `from`/`to` language properties on the inactive language link.
- **`src/pages/autor/[slug].astro`**: Added `author_social_clicked` event with author name and platform properties on social links.
- **`src/layouts/BlogPost.astro`**: Added `article_tag_clicked` event with tag name, article slug, and language on post tag links.
- **`.env`**: Added `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` environment variables.
- **`package.json`**: Added `posthog-js` and `posthog-node` dependencies.

| Event | Description | File |
|---|---|---|
| `newsletter_form_submitted` | User submits the newsletter signup form (client-side) | `public/scripts/newsletter.js` |
| `newsletter_subscribed` | Successful newsletter subscription via MailerLite (server-side) | `src/pages/api/subscribe.ts` |
| `newsletter_subscription_failed` | Newsletter subscription failure — MailerLite API error or server error (server-side) | `src/pages/api/subscribe.ts` |
| `sponsor_link_clicked` | User clicks a sponsor's external URL | `src/components/SponsorCard.astro` |
| `sponsor_contact_clicked` | User clicks the "Escríbenos" contact link on the sponsors page | `src/pages/sponsors.astro` |
| `search_performed` | User performs a search query | `public/scripts/global-search.js` |
| `search_tag_filtered` | User filters search results by tag | `public/scripts/global-search.js` |
| `language_switched` | User switches between ES/EN languages | `src/components/LanguageSwitcher.astro` |
| `author_social_clicked` | User clicks an author's social link (website, Twitter, Instagram) | `src/pages/autor/[slug].astro` |
| `article_tag_clicked` | User clicks a tag link within a blog post | `src/layouts/BlogPost.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/391614/dashboard/1515631
- **Newsletter Subscription Funnel**: https://us.posthog.com/project/391614/insights/zg77osfT
- **Newsletter Subscriptions Over Time**: https://us.posthog.com/project/391614/insights/2bU0xI0J
- **Top Search Queries**: https://us.posthog.com/project/391614/insights/YBUOGJ3Z
- **Language Switches by Direction**: https://us.posthog.com/project/391614/insights/sA0m1s6J
- **Sponsor & Content Engagement**: https://us.posthog.com/project/391614/insights/grozJRkR

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
