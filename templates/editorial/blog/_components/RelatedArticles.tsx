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
    <section className="mx-auto mt-20 max-w-5xl border-t border-zinc-200 pt-14 md:mt-24 md:pt-16">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-700">
        {siteConfig.blog.relatedEyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-black leading-tight text-zinc-950 md:text-4xl">
        {siteConfig.blog.relatedTitle}
      </h2>

      <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-7">
        {articles.map((article) => {
          const visibleTags = article.tags.slice(0, BLOG_CARD_TAG_LIMIT);
          return (
            <article key={article.id} className="group relative flex h-full flex-col">
              {article.image_url ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 18rem, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.06]"
                  />
                </div>
              ) : null}
              {visibleTags.length > 0 ? (
                <p className="relative z-10 mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-serif text-sm italic text-zinc-500">
                  {visibleTags.map((tag, index) => (
                    <span key={tag} className="flex items-center gap-2">
                      {index > 0 ? <span aria-hidden="true">·</span> : null}
                      <Link
                        href={`/blog/tag/${encodeURIComponent(tag)}`}
                        className="underline-offset-2 transition hover:text-violet-700 hover:underline"
                      >
                        {tag}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
              <h3 className="mt-2 font-serif text-xl font-black leading-tight text-zinc-950 underline-offset-[6px] decoration-violet-700 decoration-2 transition group-hover:underline md:text-[1.375rem]">
                <Link
                  href={`/blog/${article.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {article.title}
                </Link>
              </h3>
              <div className="mt-auto flex items-center gap-3 pt-4 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
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
