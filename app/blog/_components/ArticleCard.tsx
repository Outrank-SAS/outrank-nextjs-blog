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
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
        {article.image_url ? (
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            {imageLoading === 'eager' ? (
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <span key={tag} className="rounded-full border border-teal-400 px-3 py-1 text-xs font-semibold text-teal-700">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold leading-tight text-slate-950 transition group-hover:text-violet-700">
            {article.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.meta_description}</p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-medium text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
