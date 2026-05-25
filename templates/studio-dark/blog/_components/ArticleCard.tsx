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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04] p-6 shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-studio-dark-accent/40 hover:bg-white/[0.07] md:p-8">
      {article.image_url ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
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
      <div className="flex flex-1 flex-col pt-5">
        <div className="relative z-10 mb-4 flex flex-wrap gap-2">
          {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="relative inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-xs font-medium text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-50"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h2 className="font-serif text-2xl font-black leading-tight text-zinc-50 transition group-hover:text-studio-dark-accent">
          <Link
            href={`/blog/${article.slug}`}
            className="underline-offset-4 decoration-studio-dark-accent/60 decoration-2 group-hover:underline after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h2>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-xs font-medium text-zinc-400">
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.reading_time_minutes} min read</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
