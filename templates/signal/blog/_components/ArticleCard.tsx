import Image from 'next/image';
import Link from 'next/link';

import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_CARD_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';

type Props = {
  article: OutrankArticleSummary;
  featured?: boolean;
  imageLoading?: 'eager' | 'lazy';
};

const ArticleCard = ({ article, featured = false, imageLoading }: Props) => {
  const resolvedLoading = imageLoading ?? (featured ? 'eager' : 'lazy');
  const visibleTags = article.tags.slice(0, BLOG_CARD_TAG_LIMIT);
  const hasImage = Boolean(article.image_url);
  const isFeaturedWithImage = featured && hasImage;

  return (
    <article
      className={
        isFeaturedWithImage
          ? 'group relative grid h-full overflow-hidden rounded-lg border border-signal-accent/30 bg-white/[0.07] shadow-2xl shadow-black/30 transition duration-200 hover:-translate-y-1 hover:border-signal-accent/60 md:grid-cols-[1.05fr_0.95fr]'
          : featured
            ? 'group relative flex h-full flex-col overflow-hidden rounded-lg border border-signal-accent/30 bg-white/[0.07] shadow-2xl shadow-black/30 transition duration-200 hover:-translate-y-1 hover:border-signal-accent/60'
            : 'group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-signal-accent/40 hover:bg-white/[0.08]'
      }
    >
      {article.image_url ? (
        <div
          className={
            featured
              ? 'relative aspect-[16/10] overflow-hidden bg-white/[0.05] md:aspect-auto md:min-h-full'
              : 'relative aspect-[16/9] overflow-hidden bg-white/[0.05]'
          }
        >
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            loading={resolvedLoading}
            sizes={featured ? '(min-width: 768px) 52vw, 100vw' : '(min-width: 1280px) 25vw, 100vw'}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className={featured ? 'flex flex-1 flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-5'}>
        {visibleTags.length > 0 ? (
          <div className="relative z-10 mb-4 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="inline-flex items-center rounded-full border border-signal-accent/30 bg-signal-accent/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-signal-accent transition hover:border-signal-accent/60 hover:bg-signal-accent/20 hover:text-signal-accent"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}
        <h2
          className={
            featured
              ? 'text-3xl font-black leading-tight text-white transition group-hover:text-signal-accent md:text-5xl'
              : 'text-xl font-black leading-tight text-white transition group-hover:text-signal-accent'
          }
        >
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h2>
        <p
          className={
            featured
              ? 'mt-4 line-clamp-4 text-base leading-7 text-zinc-300'
              : 'mt-3 line-clamp-3 text-sm leading-6 text-zinc-300'
          }
        >
          {article.meta_description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-bold text-zinc-400">
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
          <span>{article.reading_time_minutes} min read</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
