import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  if (total === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 underline-offset-4 transition hover:text-studio-dark-accent hover:underline"
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
          {siteConfig.blog.backToBlog}
        </Link>
        <header className="mb-10 mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-zinc-800 pb-8 md:mb-14 md:pb-12">
          <h1 className="font-serif text-4xl font-black leading-tight text-zinc-50 md:text-6xl">#{tag}</h1>
          <p className="text-lg leading-8 text-zinc-400">
            {total} {total === 1 ? 'article' : 'articles'}
          </p>
        </header>

        {articles.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                imageLoading={index < 4 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center text-zinc-400">
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
