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
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
      <header className="mb-14 md:mb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{siteConfig.blog.tagEyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
          #{tag}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {total} {total === 1 ? 'article' : 'articles'}
        </p>
      </header>

      {featuredArticle ? (
        <div>
          <ArticleCard article={featuredArticle} featured />
          {remainingArticles.length ? (
            <div className="mt-14 border-t border-slate-200 md:mt-20">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : null}
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
