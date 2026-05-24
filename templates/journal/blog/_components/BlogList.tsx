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
          <div>
            {filteredResults.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FrownIcon />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
              No matches for <span className="text-journal-accent">“{trimmedQuery}”</span>
            </h3>
            <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
              Try different keywords, or jump back to the full blog.
            </p>
            <Link
              href="/blog"
              className="mt-7 inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Show all articles
            </Link>
          </div>
        )
      ) : paginatedArticles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No articles found.
        </div>
      ) : featuredArticle ? (
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
        <div>
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
