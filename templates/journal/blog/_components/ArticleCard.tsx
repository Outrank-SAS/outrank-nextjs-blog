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

  const tagList =
    visibleTags.length > 0 ? (
      <p className="relative z-10 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium text-slate-950">
        {visibleTags.map((tag, index) => (
          <span key={tag} className="flex items-center gap-3">
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="underline-offset-2 transition hover:underline"
            >
              {tag}
            </Link>
          </span>
        ))}
      </p>
    ) : null;

  if (featured) {
    return (
      <article className="group relative grid gap-7 md:grid-cols-[1.25fr_1fr] md:gap-12">
        {article.image_url ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 md:aspect-[3/2]">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              loading={resolvedLoading}
              sizes="(min-width: 768px) 38rem, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
        <div className="flex flex-col justify-center">
          {tagList}
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-slate-950 transition group-hover:text-journal-accent md:text-[2.75rem]">
            <Link
              href={`/blog/${article.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-5 line-clamp-3 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            {article.meta_description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs font-medium text-slate-600">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative grid gap-5 border-b border-slate-200 py-9 md:grid-cols-[1fr_24rem] md:gap-10 md:py-10">
      <div className="flex flex-col justify-center">
        {tagList}
        <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-slate-950 transition group-hover:text-journal-accent">
          <Link
            href={`/blog/${article.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 text-base leading-7 text-slate-600">{article.meta_description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs font-medium text-slate-600">
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.reading_time_minutes} min read</span>
        </div>
      </div>
      {article.image_url ? (
        <div className="relative order-first aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 md:order-none md:aspect-[16/9]">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            loading={resolvedLoading}
            sizes="(min-width: 768px) 24rem, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
    </article>
  );
};

export default ArticleCard;
