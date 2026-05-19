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
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
      <header className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Blog</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Latest Articles</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Practical guides, comparisons, and actionable playbooks for smarter growth.
        </p>
      </header>

      {articles.length ? (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} imageLoading={index < 3 ? 'eager' : 'lazy'} />
          ))}
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
