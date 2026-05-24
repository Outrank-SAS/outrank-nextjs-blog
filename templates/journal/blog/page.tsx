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
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
      <header className="mb-14 border-b border-slate-200 pb-10 md:mb-20 md:pb-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-journal-accent">
              {siteConfig.blog.indexEyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
              {siteConfig.blog.indexTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{siteConfig.blog.indexDek}</p>
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
    </main>
  );
};

export default BlogPage;
