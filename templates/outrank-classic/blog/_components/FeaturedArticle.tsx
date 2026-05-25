import Image from 'next/image';
import Link from 'next/link';

import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_CARD_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';

type Props = {
  article: OutrankArticleSummary;
};

const FeaturedArticle = ({ article }: Props) => {
  return (
    <article className="group relative mb-6 overflow-hidden rounded-2xl bg-outrank-classic-accent transition duration-200 hover:-translate-y-1 hover:bg-violet-700 md:mb-10">
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-10 md:p-8">
        <div className="flex flex-col">
          <div className="relative z-10 mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="relative inline-flex items-center rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/60 hover:bg-white/20"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            <Link
              href={`/blog/${article.slug}`}
              className="decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-['']"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-violet-100 md:text-base">
            {article.meta_description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-violet-200">
              <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.reading_time_minutes} min read</span>
            </div>
            <span className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 group-hover:underline">
              Read article
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition duration-200 group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
        {article.image_url ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-violet-700">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default FeaturedArticle;
