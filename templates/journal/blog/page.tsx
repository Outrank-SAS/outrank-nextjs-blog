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
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-10">
      <header className="mb-10 border-b border-slate-200 pb-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Field Notes</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-slate-950 md:text-7xl">
          Latest Articles
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Practical guides, comparisons, and actionable playbooks for smarter growth.
        </p>
      </header>

      {featuredArticle ? (
        <div className="space-y-3">
          <ArticleCard article={featuredArticle} featured />
          {remainingArticles.length ? (
            <div className="grid grid-cols-1 gap-3">
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
