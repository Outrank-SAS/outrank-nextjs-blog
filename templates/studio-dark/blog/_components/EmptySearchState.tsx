import Link from 'next/link';

import type { OutrankArticleSummary } from '../_types/blog';

const SUGGESTED_TAGS_LIMIT = 5;
const QUERY_DISPLAY_MAX_LENGTH = 40;


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
const truncateQuery = (value: string): string =>
  value.length > QUERY_DISPLAY_MAX_LENGTH ? `${value.slice(0, QUERY_DISPLAY_MAX_LENGTH)}…` : value;


const EmptySearchIllustration = () => (
  <svg
    viewBox="0 0 400 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-full w-full"
  >
    {/* Background blob */}
    <circle cx="210" cy="160" r="110" fill="rgb(var(--studio-dark-accent) / 0.12)" />

    {/* Card 1 — tilted, top-left */}
    <g transform="rotate(-8 110 90)">
      <rect x="40" y="50" width="140" height="80" rx="8" fill="rgb(255 255 255 / 0.06)" stroke="rgb(255 255 255 / 0.15)" strokeWidth="1.5" />
      <rect x="52" y="62" width="40" height="40" rx="4" fill="rgb(var(--studio-dark-accent) / 0.25)" />
      <line x1="100" y1="68" x2="168" y2="68" stroke="rgb(var(--studio-dark-accent))" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="80" x2="160" y2="80" stroke="rgb(255 255 255 / 0.2)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="92" x2="150" y2="92" stroke="rgb(255 255 255 / 0.15)" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Card 2 — bottom-center */}
    <g transform="rotate(4 200 230)">
      <rect x="120" y="190" width="160" height="80" rx="8" fill="rgb(255 255 255 / 0.06)" stroke="rgb(255 255 255 / 0.15)" strokeWidth="1.5" />
      <rect x="132" y="202" width="32" height="32" rx="4" fill="rgb(var(--studio-dark-accent) / 0.25)" />
      <line x1="172" y1="208" x2="248" y2="208" stroke="rgb(var(--studio-dark-accent))" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="172" y1="220" x2="240" y2="220" stroke="rgb(255 255 255 / 0.2)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="244" x2="268" y2="244" stroke="rgb(255 255 255 / 0.12)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="256" x2="220" y2="256" stroke="rgb(255 255 255 / 0.12)" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Magnifying glass */}
    <g>
      <circle cx="240" cy="130" r="52" fill="none" stroke="rgb(var(--studio-dark-accent))" strokeWidth="3" />
      <circle cx="240" cy="130" r="47" fill="rgb(var(--studio-dark-accent) / 0.08)" />
      <line
        x1="278"
        y1="168"
        x2="312"
        y2="202"
        stroke="rgb(var(--studio-dark-accent))"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line x1="316" y1="206" x2="320" y2="210" stroke="rgb(var(--studio-dark-accent))" strokeWidth="8" strokeLinecap="round" />
    </g>

    {/* Sparkles — 4-point stars */}
    <g fill="rgb(var(--studio-dark-accent))">
      <path d="M 50 218 C 51 225, 53 227, 60 228 C 53 229, 51 231, 50 238 C 49 231, 47 229, 40 228 C 47 227, 49 225, 50 218 Z" />
      <path d="M 340 70 C 341 76, 343 78, 349 79 C 343 80, 341 82, 340 88 C 339 82, 337 80, 331 79 C 337 78, 339 76, 340 70 Z" />
      <path d="M 340 272 C 341 278, 343 280, 349 281 C 343 282, 341 284, 340 290 C 339 284, 337 282, 331 281 C 337 280, 339 278, 340 272 Z" />
    </g>

    {/* Outlined dots */}
    <g fill="none" stroke="rgb(var(--studio-dark-accent) / 0.5)" strokeWidth="1.5">
      <circle cx="90" cy="180" r="4" />
      <circle cx="370" cy="160" r="3" />
      <circle cx="190" cy="290" r="3" />
    </g>
  </svg>
);

const EmptySearchState = ({ query, allArticles }: Props) => {
  const popularTags = collectPopularTags(allArticles);

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 md:p-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
        <div className="relative mx-auto aspect-[5/4] w-1/3 max-w-[180px] lg:w-[85%] lg:max-w-none">
          <EmptySearchIllustration />
        </div>
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h3 className="break-words font-serif text-2xl font-black leading-tight tracking-tight text-zinc-50 md:text-4xl">
            No articles found for <span className="text-studio-dark-accent">“{truncateQuery(query)}”</span>
          </h3>
          <p className="mt-4 max-w-md text-base leading-7 text-zinc-400">
            {popularTags.length > 0 ? 'Try a different keyword or pick a popular topic below.' : 'Try a different keyword.'}
          </p>
          <div className="mt-7">
            <Link
              href="/blog"
              className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
            >
              Browse all articles
            </Link>
          </div>
          {popularTags.length > 0 ? (
            <div className="mt-8 w-full border-t border-white/[0.08] pt-6">
              <p className="text-xs font-medium text-zinc-500">Try searching for:</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-300 transition hover:border-white/30 hover:text-zinc-50"
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
