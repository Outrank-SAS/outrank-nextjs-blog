'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import ArticleCard from './ArticleCard';
import EmptySearchState from './EmptySearchState';
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
          <EmptySearchState query={trimmedQuery} allArticles={allArticles} />
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
