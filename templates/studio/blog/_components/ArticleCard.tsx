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
    <Link
      href={`/blog/${article.slug}`}
      className="group block h-full focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-accent"
    >
      <article className="flex h-full flex-col">
        {article.image_url ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
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
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-black leading-tight text-slate-950 transition group-hover:text-studio-accent">
            {article.title}
          </h2>
          <p className="mt-3 line-clamp-2 text-base leading-7 text-slate-600">
            {article.meta_description}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">/</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
