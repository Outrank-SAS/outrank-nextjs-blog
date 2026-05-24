import type { Metadata } from 'next';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from '../../_components/ArticleCard';
import Pagination from '../../_components/Pagination';
import { getArticles, getStaticArticles } from '../../_lib/outrank';
import { BLOG_ARTICLES_PER_PAGE } from '../../_lib/constants';
import { getPageParam } from '../../_lib/format';

export const revalidate = 86400;

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export const generateStaticParams = async () => {
  const articles = await getStaticArticles();
  const tags = new Set(articles.flatMap((article) => article.tags));

  return Array.from(tags).map((tag) => ({
    slug: encodeURIComponent(tag),
  }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.slug);

  return {
    title: `#${tag}`,
    description: `Articles tagged with ${tag}.`,
  };
};

const TagPage = async ({ params, searchParams }: Props) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const currentPage = getPageParam(resolvedSearchParams.page);
  const tag = decodeURIComponent(resolvedParams.slug);
  const { articles, total, total_pages } = await getArticles({
    page: currentPage,
    limit: BLOG_ARTICLES_PER_PAGE,
    tag,
  });

  return (
    <main className="min-h-screen bg-[#f8fbfa] text-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-14">
        <header className="mb-10 border-b border-slate-200 pb-8 md:mb-14 md:pb-12">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-studio-accent">{siteConfig.blog.tagEyebrow}</p>
          <h1 className="mt-5 text-5xl font-black leading-none text-slate-950 md:text-7xl">#{tag}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {total} {total === 1 ? 'article' : 'articles'}
          </p>
        </header>

        {articles.length ? (
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                articleNumber={index + 1}
                imageLoading={index < 3 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            {siteConfig.blog.emptyState}
          </div>
        )}

        <Pagination
          basePath={`/blog/tag/${encodeURIComponent(tag)}`}
          currentPage={currentPage}
          totalPages={total_pages}
        />
      </div>
    </main>
  );
};

export default TagPage;
