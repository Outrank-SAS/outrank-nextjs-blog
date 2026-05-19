# Outrank Next.js Blog

A native Next.js App Router starter for publishing Outrank articles on your own site with cached static rendering.

## Overview

This starter connects to the Outrank Next.js Blog API, fetches published articles with a private server-side API key,
and renders a production-ready blog with cached article pages, tag pages, pagination, metadata, and a dynamic sitemap.
The default copyable blog lives in `app/blog`, and alternate complete blog templates live under `templates/`. An
existing App Router project can install the package, copy one `blog` folder, set the API key, and run.

## Prerequisites

- Node.js installed locally
- An Outrank account with a product configured
- A Next.js Blog integration API key from Outrank
- Tailwind CSS configured in the target app if you are copying a blog folder into an existing project

## Environment Setup

Create a Next.js Blog integration in Outrank, copy the API key, then create a `.env.local` file:

```env
OUTRANK_BLOG_API_KEY=your_outrank_blog_api_key
```

## API Client Package

This starter uses the published `outrank-next-js-blog` package from npm. You can install it in any Next.js site:

```bash
npm install outrank-next-js-blog
```

```typescript
import { BlogClient } from 'outrank-next-js-blog';

const client = new BlogClient(process.env.OUTRANK_BLOG_API_KEY!);
const { articles } = await client.getArticles(1, 12);
const article = await client.getArticle('your-article-slug');
```

This repo uses the published package:

```json
"outrank-next-js-blog": "^0.1.1"
```

## Add This Blog To An Existing App

Install the API package, copy this repo's default `app/blog` folder into your Next.js App Router project, and set the
server-side API key:

```env
OUTRANK_BLOG_API_KEY=your_outrank_blog_api_key
```

```bash
npm install outrank-next-js-blog
cp -R app/blog ../my-next-app/app/blog
```

The copied folder includes the blog routes, article pages, tag pages, sitemap, Outrank API wrapper, local components,
types, constants, formatting helpers, pagination, and article content styles.

The UI uses Tailwind utility classes. This starter already includes Tailwind, but an existing app needs Tailwind set up
and configured to scan `app/**/*.{ts,tsx}`.

## Choose A Template

This repo includes multiple theme folders under `templates/`. They all render the same Outrank blog integration; only
the UI changes. Each template is just a replacement `blog` folder.

The shared API/data files are kept the same as the default `app/blog` folder. Template differences should stay limited
to route markup, component styling, layout, and CSS.

| Template | Path | Best For |
| --- | --- | --- |
| Default | `app/blog` | A clean, neutral blog that is easy to customize. |
| Studio | `templates/studio/blog` | Product teams that want a bright, structured editorial index. |
| Editorial | `templates/editorial/blog` | Magazine-style sites with high-contrast typography. |
| Signal | `templates/signal/blog` | Dark, dashboard-like growth or operations blogs. |
| Journal | `templates/journal/blog` | Minimal, readable long-form article libraries. |

To use a template in this starter, replace `app/blog` with the template's `blog` folder. In an existing app, copy the
chosen template directly into that app's `app/blog` route:

```bash
cp -R templates/signal/blog ../my-next-app/app/blog
```

If your app already has an `app/blog` route, move or remove the old folder before copying the template.

## Running the Development Server

Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/blog`. Production builds require `OUTRANK_BLOG_API_KEY` because article and tag pages are
prebuilt from your Outrank content.

## Routes

- `/blog` renders the paginated article list.
- `/blog/[slug]` renders a server-side article page with metadata.
- `/blog/tag/[slug]` renders a tag-filtered article list.
- `/blog/sitemap.xml` generates a dynamic blog sitemap.

## Editing the Blog Design

Customize the blog by editing files under `app/blog`. Support code lives alongside the routes in private folders:
`app/blog/_components`, `app/blog/_lib`, and `app/blog/_types`.

## Cache and Updates

The starter is designed for fast static rendering. Article lists, article pages, tag pages, and sitemap data are cached
with Next.js server caching.

- Production blog data revalidates once per day.
- Development blog data revalidates almost immediately so local testing stays fast.
- Outrank API responses are cached server-side for fast reads and are cleared when articles are published through
  Outrank.
- Your deployed Next.js site still has its own cache, so normal content changes can take up to one day to appear on the
  public blog.
- Redeploy the site or add on-demand revalidation in your app if you need published changes to appear sooner.

## Sitemap Configuration for SEO

This starter includes a standalone `blog/sitemap.xml` generated from published Outrank articles. Submit it in Google
Search Console, or merge it into your existing sitemap if your main website already has one.

## Instructions for AI Coding Agents

Use the existing App Router structure and keep every Outrank API call on the server. The only required environment
variable is:

```env
OUTRANK_BLOG_API_KEY=your_outrank_blog_api_key
```

Key implementation details:

- Use `BlogClient` from the `outrank-next-js-blog` package.
- Fetch data from Server Components or server utilities only.
- Render article HTML with `dangerouslySetInnerHTML`.
- Do not expose `OUTRANK_BLOG_API_KEY` to Client Components or browser-visible JavaScript.
- Keep `/blog`, article pages, tag pages, and `/blog/sitemap.xml` cached with daily revalidation.

## Deploy

Set `OUTRANK_BLOG_API_KEY` in your hosting provider and deploy the app.

Before shipping, run:

```bash
npm run lint
npm run build
```

Production builds require access to your Outrank API key because article pages, tag pages, and the blog sitemap are
generated from published Outrank content.
