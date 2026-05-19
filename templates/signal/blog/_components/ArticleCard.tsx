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
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article
        className={
          featured
            ? 'grid h-full overflow-hidden rounded-lg border border-lime-300/30 bg-white/[0.07] shadow-2xl shadow-black/30 transition duration-200 hover:-translate-y-1 hover:border-lime-300/60 md:grid-cols-[1.05fr_0.95fr]'
            : 'flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-lime-300/40 hover:bg-white/[0.08]'
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
            {(imageLoading ?? (featured ? 'eager' : 'lazy')) === 'eager' ? (
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                loading="eager"
                sizes={featured ? '(min-width: 768px) 52vw, 100vw' : '(min-width: 1280px) 25vw, 100vw'}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                loading="lazy"
                sizes={featured ? '(min-width: 768px) 52vw, 100vw' : '(min-width: 1280px) 25vw, 100vw'}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ) : null}
        <div className={featured ? 'flex flex-1 flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-5'}>
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-bold text-lime-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2
            className={
              featured
                ? 'text-3xl font-black leading-tight text-white transition group-hover:text-lime-200 md:text-5xl'
                : 'text-xl font-black leading-tight text-white transition group-hover:text-lime-200'
            }
          >
            {article.title}
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
    </Link>
  );
};

export default ArticleCard;
