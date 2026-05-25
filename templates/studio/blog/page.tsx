import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './_components/ArticleCard';
import Pagination from './_components/Pagination';
import { getArticles } from './_lib/outrank';
import { BLOG_ARTICLES_PER_PAGE, BLOG_CARD_TAG_LIMIT } from './_lib/constants';
import { formatDate, getPageParam } from './_lib/format';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Blog',
  description: siteConfig.blog.indexMetaDescription,
};

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const BlogPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = getPageParam(resolvedSearchParams.page);
  const { articles, total_pages } = await getArticles({
    page: currentPage,
    limit: BLOG_ARTICLES_PER_PAGE,
  });

  const featuredArticle = currentPage === 1 ? articles[0] : null;
  const gridArticles = featuredArticle ? articles.slice(1) : articles;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
        <header className="mb-10 md:mb-14">
          <h1 className="font-serif text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {siteConfig.blog.indexTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{siteConfig.blog.indexDek}</p>
        </header>

        {articles.length ? (
          <>
            {featuredArticle ? (
              <article className="group relative mb-4 bg-studio-accent/[0.04] transition duration-200 hover:bg-studio-accent/[0.08] md:mb-8">
                <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12 md:p-8">
                  {featuredArticle.image_url ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={featuredArticle.image_url}
                        alt={featuredArticle.title}
                        fill
                        priority
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col">
                    <div className="relative z-10 mb-5 flex flex-wrap gap-2">
                      {featuredArticle.tags.slice(0, BLOG_CARD_TAG_LIMIT).map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${encodeURIComponent(tag)}`}
                          className="relative inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                    <h2 className="font-serif text-3xl font-black leading-tight text-slate-950 transition group-hover:text-studio-accent md:text-5xl">
                      <Link
                        href={`/blog/${featuredArticle.slug}`}
                        className="underline-offset-4 decoration-studio-accent/60 decoration-2 group-hover:underline after:absolute after:inset-0 after:content-['']"
                      >
                        {featuredArticle.title}
                      </Link>
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-slate-600">{featuredArticle.meta_description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                      <time dateTime={featuredArticle.created_at}>{formatDate(featuredArticle.created_at)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{featuredArticle.reading_time_minutes} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ) : null}

            {gridArticles.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {gridArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    imageLoading={index < 4 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            {siteConfig.blog.emptyState}
          </div>
        )}

        <Pagination basePath="/blog" currentPage={currentPage} totalPages={total_pages} />
      </div>
    </main>
  );
};

export default BlogPage;
