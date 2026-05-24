import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/app/_config/siteConfig';

import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_CARD_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';

type Props = {
  articles: OutrankArticleSummary[];
};

const RelatedArticles = ({ articles }: Props) => {
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto mt-20 max-w-5xl border-t border-slate-200 pt-14 md:mt-24 md:pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-journal-accent">{siteConfig.blog.relatedEyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
        {siteConfig.blog.relatedTitle}
      </h2>

      <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-7">
        {articles.map((article) => {
          const visibleTags = article.tags.slice(0, BLOG_CARD_TAG_LIMIT);
          return (
            <article key={article.id} className="group relative flex h-full flex-col">
              {article.image_url ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 18rem, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ) : null}
              {visibleTags.length > 0 ? (
                <p className="relative z-10 mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium text-slate-950">
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
              ) : null}
              <h3 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-slate-950 transition group-hover:text-journal-accent md:text-[1.375rem]">
                <Link
                  href={`/blog/${article.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {article.title}
                </Link>
              </h3>
              <div className="mt-auto flex items-center gap-3 pt-4 text-xs font-medium text-slate-600">
                <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
                <span aria-hidden="true">·</span>
                <span>{article.reading_time_minutes} min read</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedArticles;
