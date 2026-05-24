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
    <section className="mx-auto mt-20 max-w-5xl border-t border-white/10 pt-14 md:mt-24 md:pt-16">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-300">
        {siteConfig.blog.relatedEyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
        {siteConfig.blog.relatedTitle}
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {articles.map((article) => {
          const visibleTags = article.tags.slice(0, BLOG_CARD_TAG_LIMIT);
          return (
            <article
              key={article.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 transition duration-200 hover:border-lime-300/40 hover:bg-white/[0.06]"
            >
              {article.image_url ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.05]">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 18rem, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
                {visibleTags.length > 0 ? (
                  <div className="relative z-10 mb-3 flex flex-wrap gap-1.5">
                    {visibleTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-lime-200 transition hover:border-lime-300/60 hover:bg-lime-300/20 hover:text-lime-100"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                ) : null}
                <h3 className="text-lg font-black leading-snug text-white transition group-hover:text-lime-200">
                  <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {article.title}
                  </Link>
                </h3>
                <div className="mt-auto flex items-center gap-3 pt-4 text-xs font-bold text-zinc-400">
                  <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.reading_time_minutes} min read</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedArticles;
