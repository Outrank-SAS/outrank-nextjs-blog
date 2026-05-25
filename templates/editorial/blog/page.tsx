import type { Metadata } from 'next';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './_components/ArticleCard';
import Pagination from './_components/Pagination';
import { getArticles } from './_lib/outrank';
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
  const { articles, total_pages } = await getArticles({
    page: currentPage,
    limit: BLOG_ARTICLES_PER_PAGE,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 text-zinc-950 md:py-20">
      <header className="mb-14 md:mb-20">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
          <div>
            <h1 className="font-serif text-5xl font-black leading-[1.05] text-zinc-950 md:text-7xl">
              {siteConfig.blog.indexTitle}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600">{siteConfig.blog.indexDek}</p>
        </div>
      </header>

      {articles.length ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} imageLoading={index < 2 ? 'eager' : 'lazy'} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-600">
          {siteConfig.blog.emptyState}
        </div>
      )}

      <Pagination basePath="/blog" currentPage={currentPage} totalPages={total_pages} />
    </main>
  );
};

export default BlogPage;
