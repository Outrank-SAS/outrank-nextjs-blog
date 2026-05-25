import type { Metadata } from 'next';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './_components/ArticleCard';
import Pagination from './_components/Pagination';
import { getArticles } from './_lib/outrank';
import { BLOG_ARTICLES_PER_PAGE } from './_lib/constants';
import { getPageParam } from './_lib/format';

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

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-14">
        <header className="mb-10 md:mb-14">
          <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-[0.74fr_1.26fr] md:items-end md:pb-12">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-studio-accent">{siteConfig.blog.indexEyebrow}</p>
              {siteConfig.brandTagline ? (
                <p className="mt-3 max-w-sm text-base leading-7 text-slate-600">{siteConfig.brandTagline}</p>
              ) : null}
            </div>

            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-none text-slate-950 md:text-7xl">
                {siteConfig.blog.indexTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{siteConfig.blog.indexDek}</p>
            </div>
          </div>
        </header>

        {articles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                imageLoading={index < 4 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
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
