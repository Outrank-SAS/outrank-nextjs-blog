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
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
      <header className="mb-10 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Outrank Blog</p>
            <p className="mt-1 text-sm font-medium text-slate-500">Fresh SEO playbooks for practical teams</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-1.5">Guides</span>
            <span className="rounded-full border border-slate-200 px-3 py-1.5">Research</span>
            <span className="rounded-full border border-slate-200 px-3 py-1.5">Growth</span>
          </div>
        </div>

        <div className="grid gap-8 px-5 py-8 md:grid-cols-[1.08fr_0.92fr] md:px-8 md:py-10">
          <div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Latest Articles
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Practical guides, comparisons, and actionable playbooks for smarter growth.
            </p>
          </div>
          <div className="grid content-end gap-3 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">Focus</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-teal-950">SEO systems that compound.</p>
            </div>
            <div className="rounded-lg border border-violet-100 bg-violet-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-800">Format</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-violet-950">Guides, teardown notes, and tactics.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Updated</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">Cached daily for fast pages.</p>
            </div>
          </div>
        </div>
      </header>

      {featuredArticle ? (
        <div className="space-y-7">
          <ArticleCard article={featuredArticle} featured />
          {remainingArticles.length ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No articles found.
        </div>
      )}

      <Pagination basePath="/blog" currentPage={currentPage} totalPages={total_pages} />
    </main>
  );
};

export default BlogPage;
