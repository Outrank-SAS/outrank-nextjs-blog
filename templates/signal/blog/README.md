# Outrank Signal Blog Template

Signal is a dark, dashboard-inspired Outrank blog template with a featured article slot and compact article cards.
Copy this entire folder into a Next.js App Router project as `app/blog` after installing the `outrank-next-js-blog@^0.1.2`
package. For a fresh default setup, also copy the shared starter folders `app/_config` and `app/_components`.

Required server-side environment variable:

```env
OUTRANK_BLOG_API_KEY=your_outrank_blog_api_key
```

This folder includes:

- `/blog`
- `/blog/[slug]`
- `/blog/tag/[slug]`
- `/blog/sitemap.xml`
- local components, styles, types, constants, formatting helpers, and the Outrank API wrapper

This template is a complete replacement for the default `app/blog` folder. The API/data layer matches the default
template; the differences are layout, component markup, and styling.

Styling uses Tailwind utility classes, so the target app must have Tailwind configured to scan `app/**/*.{ts,tsx}`.

## Cache Behavior

This folder uses Next.js caching for article lists, article pages, tag pages, and sitemap data.

- In production, blog content revalidates once per day.
- In development, blog content revalidates almost immediately.
- Outrank clears its API cache when articles are published, but your deployed Next.js site can still take up to one day
  to show changes because it has its own cache.
- Redeploy the site or add on-demand revalidation if you need updates sooner.
