import type { Metadata } from 'next';

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
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-zinc-950 md:py-10">
      <header className="mb-10 border-y border-zinc-950 py-5">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-700">Tag archive</p>
        <div className="grid gap-8 pt-6 md:grid-cols-[0.78fr_1fr] md:items-end md:gap-12">
          <h1 className="font-serif text-6xl font-black leading-none text-zinc-950 md:text-8xl">#{tag}</h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600">
            {total} {total === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </header>

      {articles.length ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-600">
          No articles found.
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
