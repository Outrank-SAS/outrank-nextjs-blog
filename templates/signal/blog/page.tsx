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
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
        <header className="mb-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-300">Signal Desk</p>
          </div>
          <div className="grid gap-8 px-5 py-8 md:grid-cols-[1fr_0.7fr] md:px-8 md:py-10">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-tight text-white md:text-6xl">Latest Articles</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                Practical guides, comparisons, and actionable playbooks for smarter growth.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Dispatch queue</p>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-zinc-300">Research</span>
                  <span className="text-sm font-black text-lime-300">Active</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-zinc-300">Publishing</span>
                  <span className="text-sm font-black text-cyan-300">Ready</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-zinc-300">Growth</span>
                  <span className="text-sm font-black text-violet-300">Tracked</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {featuredArticle ? (
          <div className="space-y-5">
            <ArticleCard article={featuredArticle} featured />
            {remainingArticles.length ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                {remainingArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.04] p-10 text-center text-zinc-300">
            No articles found.
          </div>
        )}

        <Pagination basePath="/blog" currentPage={currentPage} totalPages={total_pages} />
      </div>
    </main>
  );
};

export default BlogPage;
