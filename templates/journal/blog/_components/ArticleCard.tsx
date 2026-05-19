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
            ? 'grid h-full rounded-lg border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:border-blue-200 hover:bg-white md:grid-cols-[18rem_1fr] md:gap-7'
            : 'grid h-full rounded-lg border border-transparent bg-white p-5 transition duration-200 hover:border-slate-200 hover:bg-slate-50 md:grid-cols-[8rem_1fr] md:gap-5'
        }
      >
        {article.image_url ? (
          <div
            className={
              featured
                ? 'relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-slate-100 md:mb-0 md:aspect-[4/3]'
                : 'relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-slate-100 md:mb-0 md:aspect-square'
            }
          >
            {(imageLoading ?? (featured ? 'eager' : 'lazy')) === 'eager' ? (
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                loading="eager"
                sizes={featured ? '(min-width: 768px) 18rem, 100vw' : '(min-width: 768px) 8rem, 100vw'}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                loading="lazy"
                sizes={featured ? '(min-width: 768px) 18rem, 100vw' : '(min-width: 768px) 8rem, 100vw'}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col">
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2
            className={
              featured
                ? 'text-3xl font-black leading-tight text-slate-950 transition group-hover:text-blue-800 md:text-4xl'
                : 'text-xl font-black leading-tight text-slate-950 transition group-hover:text-blue-800'
            }
          >
            {article.title}
          </h2>
          <p
            className={
              featured
                ? 'mt-3 line-clamp-3 text-base leading-7 text-slate-600'
                : 'mt-2 line-clamp-2 text-sm leading-6 text-slate-600'
            }
          >
            {article.meta_description}
          </p>
          <div className="mt-auto flex items-center justify-start gap-3 pt-4 text-xs font-bold text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
