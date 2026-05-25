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

  return (
    <article
      className={
        featured
          ? 'group relative grid h-full overflow-hidden rounded-lg border border-zinc-950 bg-white shadow-xl shadow-zinc-200/80 md:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1fr)]'
          : 'group relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition duration-200 hover:border-zinc-300'
      }
    >
      {article.image_url ? (
        <div
          className={
            featured
              ? 'relative aspect-[16/9] overflow-hidden bg-zinc-100 md:aspect-auto md:min-h-full'
              : 'relative aspect-[16/9] overflow-hidden bg-zinc-100'
          }
        >
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            loading={resolvedLoading}
            sizes={featured ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 1024px) 50vw, 100vw'}
            className="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
        </div>
      ) : null}
      <div className={featured ? 'flex flex-1 flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-6 md:p-7'}>
        {visibleTags.length > 0 ? (
          <p className="relative z-10 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-serif text-sm italic text-zinc-500">
            {visibleTags.map((tag, index) => (
              <span key={tag} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                <Link
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="underline-offset-2 transition hover:text-editorial-accent hover:underline"
                >
                  {tag}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
        <h2
          className={
            featured
              ? 'font-serif text-4xl font-black leading-none text-zinc-950 underline-offset-[6px] decoration-editorial-accent decoration-2 transition group-hover:underline md:text-5xl'
              : 'font-serif text-[1.75rem] font-black leading-tight text-zinc-950 underline-offset-[6px] decoration-editorial-accent decoration-2 transition group-hover:underline'
          }
        >
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h2>
        <p
          className={
            featured
              ? 'mt-5 line-clamp-4 text-base leading-7 text-zinc-600'
              : 'mt-4 line-clamp-3 text-sm leading-6 text-zinc-600'
          }
        >
          {article.meta_description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
          <span>{article.reading_time_minutes} min read</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
