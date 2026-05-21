import type { Metadata } from 'next';

import BlogList from './_components/BlogList';
import { getAllArticleSummaries, getArticles } from './_lib/outrank';
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
  const [{ articles, total_pages }, allArticles] = await Promise.all([
    getArticles({
      page: currentPage,
      limit: BLOG_ARTICLES_PER_PAGE,
    }),
    getAllArticleSummaries(),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Blog</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Latest Articles</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Practical guides, comparisons, and actionable playbooks for smarter growth.
        </p>
      </header>

      <BlogList
        paginatedArticles={articles}
        allArticles={allArticles}
        currentPage={currentPage}
        totalPages={total_pages}
      />
    </main>
  );
};

export default BlogPage;
