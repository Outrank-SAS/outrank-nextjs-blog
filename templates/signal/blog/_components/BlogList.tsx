'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_DEFAULT_PAGE } from '../_lib/constants';

const SEARCH_PARAM = 'q';

type Props = {
  paginatedArticles: OutrankArticleSummary[];
  allArticles: OutrankArticleSummary[];
  currentPage: number;
  totalPages: number;
};

const FrownIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const BlogList = ({ paginatedArticles, allArticles, currentPage, totalPages }: Props) => {
  const searchParams = useSearchParams();
  const trimmedQuery = (searchParams.get(SEARCH_PARAM) ?? '').trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const filteredResults = useMemo(() => {
    if (!isSearching) return [];
    return allArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.meta_description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [isSearching, normalizedQuery, allArticles]);

  const isFirstPage = currentPage === BLOG_DEFAULT_PAGE;
  const featuredArticle = isFirstPage ? paginatedArticles[0] : undefined;
  const remainingArticles = isFirstPage ? paginatedArticles.slice(1) : paginatedArticles;
  const showPagination = !isSearching && totalPages > 1;

  return (
    <>
      {isSearching ? (
        filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredResults.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-16 text-center shadow-2xl shadow-black/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-400">
              <FrownIcon />
            </div>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-white">
              No matches for <span className="text-signal-accent">“{trimmedQuery}”</span>
            </h3>
            <p className="mt-3 max-w-md text-base leading-7 text-zinc-300">
              Try different keywords, or jump back to the full blog.
            </p>
            <Link
              href="/blog"
              className="mt-7 inline-flex items-center rounded-full bg-signal-accent px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-signal-accent"
            >
              Show all articles
            </Link>
          </div>
        )
      ) : paginatedArticles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.04] p-10 text-center text-zinc-300">
          No articles found.
        </div>
      ) : featuredArticle ? (
        <div className="space-y-5">
          <ArticleCard article={featuredArticle} featured />
          {remainingArticles.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {remainingArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {showPagination ? <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} /> : null}
    </>
  );
};

export default BlogList;
