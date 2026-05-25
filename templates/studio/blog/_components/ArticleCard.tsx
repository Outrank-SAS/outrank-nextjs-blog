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
    <article className="group relative flex h-full flex-col p-6 transition duration-200 hover:bg-studio-accent/5 md:p-8">
      {article.image_url ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
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
              className="inline-flex items-center rounded-full border border-studio-accent/20 bg-studio-accent/5 px-2.5 py-0.5 text-xs font-medium text-studio-accent transition hover:border-studio-accent/50 hover:bg-studio-accent/15"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h2 className="font-serif text-2xl font-black leading-tight text-slate-950 transition group-hover:text-studio-accent">
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h2>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-xs font-medium text-slate-500">
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.reading_time_minutes} min read</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
