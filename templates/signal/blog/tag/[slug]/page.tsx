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
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 underline-offset-4 transition hover:text-lime-300 hover:underline"
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

        <header className="mb-10 mt-10 rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 md:p-8">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">#{tag}</h1>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
              {total} {total === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </header>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.04] p-10 text-center text-zinc-300">
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
