import Image from 'next/image';
import Link from 'next/link';

import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_CARD_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';

type Props = {
  article: OutrankArticleSummary;
};

const FeaturedArticle = ({ article }: Props) => {
  return (
    <article className="group relative mb-4 bg-studio-accent/[0.04] transition duration-200 hover:bg-studio-accent/[0.08] md:mb-8">
      <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:gap-12 md:p-8">
        {article.image_url ? (
          <div className="relative aspect-[21/9] overflow-hidden bg-slate-100">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
        <div className="flex flex-col">
          <div className="relative z-10 mb-5 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="relative inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h2 className="font-serif text-3xl font-black leading-tight text-slate-950 transition group-hover:text-studio-accent md:text-4xl">
            <Link
              href={`/blog/${article.slug}`}
              className="underline-offset-4 decoration-studio-accent/60 decoration-2 group-hover:underline after:absolute after:inset-0 after:content-['']"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 line-clamp-2 text-base leading-7 text-slate-600">
            {article.meta_description}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-xs font-medium text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
