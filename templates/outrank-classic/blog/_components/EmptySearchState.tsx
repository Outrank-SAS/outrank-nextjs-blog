import Link from 'next/link';

import type { OutrankArticleSummary } from '../_types/blog';

const SUGGESTED_TAGS_LIMIT = 5;

type Props = {
  query: string;
  allArticles: OutrankArticleSummary[];
};

const titleCaseTag = (tag: string): string =>
  tag
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');

const collectPopularTags = (articles: OutrankArticleSummary[]): string[] => {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, SUGGESTED_TAGS_LIMIT)
    .map(([tag]) => tag);
};

const EmptySearchIllustration = () => (
  <svg
    viewBox="0 0 400 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-full w-full"
  >
    {/* Background blob */}
    <circle cx="210" cy="160" r="110" fill="rgb(var(--outrank-classic-accent) / 0.08)" />

    {/* Card 1 — tilted, top-left */}
    <g transform="rotate(-8 110 90)">
      <rect x="40" y="50" width="140" height="80" rx="8" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="52" y="62" width="40" height="40" rx="4" fill="rgb(var(--outrank-classic-accent) / 0.15)" />
      <line x1="100" y1="68" x2="168" y2="68" stroke="rgb(var(--outrank-classic-accent) / 0.6)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="80" x2="160" y2="80" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="92" x2="150" y2="92" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Card 2 — bottom-center */}
    <g transform="rotate(4 200 230)">
      <rect x="120" y="190" width="160" height="80" rx="8" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="132" y="202" width="32" height="32" rx="4" fill="rgb(var(--outrank-classic-accent) / 0.15)" />
      <line x1="172" y1="208" x2="248" y2="208" stroke="rgb(var(--outrank-classic-accent) / 0.6)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="172" y1="220" x2="240" y2="220" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="244" x2="268" y2="244" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="256" x2="220" y2="256" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Magnifying glass — front */}
    <g>
      <circle cx="240" cy="130" r="52" fill="white" stroke="rgb(var(--outrank-classic-accent))" strokeWidth="3" />
      <circle cx="240" cy="130" r="40" fill="rgb(var(--outrank-classic-accent) / 0.06)" />
      <line
        x1="278"
        y1="168"
        x2="312"
        y2="202"
        stroke="rgb(var(--outrank-classic-accent))"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line x1="316" y1="206" x2="320" y2="210" stroke="rgb(var(--outrank-classic-accent))" strokeWidth="8" strokeLinecap="round" />
    </g>

    {/* Sparkles — 4-point stars */}
    <g fill="rgb(var(--outrank-classic-accent))">
      <path d="M 50 208 C 51 215, 53 217, 60 218 C 53 219, 51 221, 50 228 C 49 221, 47 219, 40 218 C 47 217, 49 215, 50 208 Z" />
      <path d="M 340 70 C 341 76, 343 78, 349 79 C 343 80, 341 82, 340 88 C 339 82, 337 80, 331 79 C 337 78, 339 76, 340 70 Z" />
      <path d="M 340 272 C 341 278, 343 280, 349 281 C 343 282, 341 284, 340 290 C 339 284, 337 282, 331 281 C 337 280, 339 278, 340 272 Z" />
    </g>
    <g fill="none" stroke="rgb(var(--outrank-classic-accent) / 0.4)" strokeWidth="1.5">
      <circle cx="90" cy="180" r="4" />
      <circle cx="370" cy="160" r="3" />
      <circle cx="190" cy="290" r="3" />
    </g>
  </svg>
);

const EmptySearchState = ({ query, allArticles }: Props) => {
  const popularTags = collectPopularTags(allArticles);

  return (
    <section className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50/40 to-white p-6 md:p-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12">
        <div className="relative mx-auto aspect-[5/4] w-1/2 max-w-[240px] md:w-[85%] md:max-w-none">
          <EmptySearchIllustration />
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
            No articles found for <span className="text-outrank-classic-accent">“{query}”</span>
          </h3>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
            We searched high and low, but couldn’t find any matches. Try different keywords or
            explore popular topics.
          </p>
          <div className="mt-7">
            <Link
              href="/blog"
              className="inline-flex h-11 items-center justify-center rounded-md bg-outrank-classic-accent px-6 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Browse all articles
            </Link>
          </div>
          {popularTags.length > 0 ? (
            <div className="mt-8 border-t border-violet-100 pt-6">
              <p className="text-xs font-medium text-slate-500">Try searching for:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                  >
                    {titleCaseTag(tag)}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default EmptySearchState;
