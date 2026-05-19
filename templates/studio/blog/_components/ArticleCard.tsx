import Image from 'next/image';
import Link from 'next/link';

import type { OutrankArticle } from '../_types/blog';
import { BLOG_CARD_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';

type Props = {
  article: OutrankArticle;
  featured?: boolean;
};

const ArticleCard = ({ article, featured = false }: Props) => {
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article
        className={
          featured
            ? 'grid h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 transition duration-200 hover:-translate-y-1 hover:border-teal-200 md:grid-cols-[1.02fr_0.98fr]'
            : 'flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl'
        }
      >
        {article.image_url ? (
          <div
            className={
              featured
                ? 'relative aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-auto md:min-h-full'
                : 'relative aspect-[16/9] overflow-hidden bg-slate-100'
            }
          >
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              loading={featured ? 'eager' : 'lazy'}
              sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className={featured ? 'flex flex-1 flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-6'}>
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2
            className={
              featured
                ? 'text-3xl font-black leading-tight text-slate-950 transition group-hover:text-teal-800 md:text-4xl'
                : 'text-xl font-black leading-tight text-slate-950 transition group-hover:text-teal-800'
            }
          >
            {article.title}
          </h2>
          <p
            className={
              featured
                ? 'mt-4 line-clamp-4 text-base leading-7 text-slate-600'
                : 'mt-3 line-clamp-3 text-sm leading-6 text-slate-600'
            }
          >
            {article.meta_description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-bold text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
