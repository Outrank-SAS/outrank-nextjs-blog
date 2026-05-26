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
    <main className="mx-auto w-full max-w-7xl px-4 py-12 text-zinc-950 md:py-20">
      <header className="mb-14 md:mb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-12">
          <div>
            <h1 className="font-serif text-5xl font-black leading-[1.05] text-zinc-950 md:text-7xl">
              {siteConfig.blog.indexTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{siteConfig.blog.indexDek}</p>
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
