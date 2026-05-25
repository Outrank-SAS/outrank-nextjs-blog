import Image from 'next/image';
import Link from 'next/link';

import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_CARD_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';

type Props = {
  article: OutrankArticleSummary;
  imageLoading?: 'eager' | 'lazy';
};

const ArticleCard = ({ article, imageLoading = 'lazy' }: Props) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/60 to-white p-6 transition duration-200 hover:border-violet-200 md:p-8">
      <div className="relative z-10 mb-5 flex flex-wrap gap-2">
        {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag)}`}
            className="relative inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            {tag}
          </Link>
        ))}
      </div>
      {article.image_url ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            loading={imageLoading}
            sizes="(min-width: 768px) 28rem, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col pt-6">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 transition group-hover:text-outrank-classic-accent">
          <Link
            href={`/blog/${article.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {article.meta_description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold text-outrank-classic-accent underline-offset-4 group-hover:underline">
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
    </article>
  );
};

export default ArticleCard;
