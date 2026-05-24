import type { Metadata } from 'next';

import { siteConfig } from '@/app/_config/siteConfig';

import BlogList from './_components/BlogList';
import BlogSearchField from './_components/BlogSearchField';
import { getAllArticleSummaries, getArticles } from './_lib/outrank';
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
  const [{ articles, total_pages }, allArticles] = await Promise.all([
    getArticles({
      page: currentPage,
      limit: BLOG_ARTICLES_PER_PAGE,
    }),
    getAllArticleSummaries(),
  ]);

  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
        <header className="mb-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] px-5 py-8 shadow-2xl shadow-black/30 md:px-8 md:py-10">
          <div className="grid gap-8 md:grid-cols-[1fr_20rem] md:items-end md:gap-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-300">
                {siteConfig.blog.indexEyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
                {siteConfig.blog.indexTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">{siteConfig.blog.indexDek}</p>
            </div>
            <BlogSearchField />
          </div>
        </header>

        <BlogList
          paginatedArticles={articles}
          allArticles={allArticles}
          currentPage={currentPage}
          totalPages={total_pages}
        />
      </div>
    </main>
  );
};

export default BlogPage;
