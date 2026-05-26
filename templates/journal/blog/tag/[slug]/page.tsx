import Link from 'next/link';
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
    <main className="mx-auto w-full max-w-6xl px-4 pt-16 pb-6 md:pt-24 md:pb-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-journal-accent hover:underline"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {siteConfig.blog.allArticles}
      </Link>

      <header className="mb-14 mt-10 md:mb-20">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
            #{tag}
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {total} {total === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </header>

      {articles.length > 0 ? (
        <div>
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              imageLoading={index === 0 ? 'eager' : 'lazy'}
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
    </main>
  );
};

export default TagPage;
