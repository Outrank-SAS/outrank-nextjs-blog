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
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
        <header className="mb-10 grid gap-8 md:mb-14 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-12">
          <div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
              {siteConfig.blog.indexTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{siteConfig.blog.indexDek}</p>
          </div>
          <BlogSearchField />
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
