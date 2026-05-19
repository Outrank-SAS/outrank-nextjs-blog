import type { Metadata } from 'next';

import ArticleCard from './_components/ArticleCard';
import Pagination from './_components/Pagination';
import { getArticles } from './_lib/outrank';
import { BLOG_ARTICLES_PER_PAGE } from './_lib/constants';
import { getPageParam } from './_lib/format';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles.',
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
    <main className="min-h-screen bg-[#f8fbfa] text-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-14">
        <header className="mb-10 md:mb-14">
          <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-[0.74fr_1.26fr] md:items-end md:pb-12">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Outrank Studio</p>
              <p className="mt-3 max-w-sm text-base leading-7 text-slate-600">Fresh SEO playbooks for practical teams.</p>
            </div>

            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-none text-slate-950 md:text-7xl">
                Latest Articles
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Practical guides, comparisons, and actionable playbooks for smarter growth.
              </p>
            </div>
          </div>
        </header>

        {articles.length ? (
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                articleNumber={index + 1}
                imageLoading={index < 3 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            No articles found.
          </div>
        )}

        <Pagination basePath="/blog" currentPage={currentPage} totalPages={total_pages} />
      </div>
    </main>
  );
};

export default BlogPage;
