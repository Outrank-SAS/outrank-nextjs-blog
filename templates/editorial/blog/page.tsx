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
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-zinc-950 md:py-10">
      <header className="mb-10 border-y border-zinc-950 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-700">{siteConfig.blog.indexEyebrow}</p>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Strategy / SEO / Growth</p>
        </div>
        <div className="grid gap-8 pt-8 md:grid-cols-[0.78fr_1fr] md:items-end md:gap-12">
          <h1 className="font-serif text-6xl font-black leading-none text-zinc-950 md:text-8xl">
            {siteConfig.blog.indexTitle}
          </h1>
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
