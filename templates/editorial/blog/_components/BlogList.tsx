'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import ArticleCard from './ArticleCard';
import EmptySearchState from './EmptySearchState';
import Pagination from './Pagination';
import type { OutrankArticleSummary } from '../_types/blog';

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
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.meta_description.toLowerCase().includes(normalizedQuery),
    );
  }, [isSearching, normalizedQuery, allArticles]);

  if (isSearching) {
    if (filteredResults.length === 0) {
      return <EmptySearchState query={trimmedQuery} allArticles={allArticles} />;
    }

    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredResults.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            imageLoading={index < 2 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {paginatedArticles.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              imageLoading={index < 2 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-600">
          No articles found.
        </div>
      )}
      {totalPages > 1 ? (
        <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
      ) : null}
    </>
  );
};

export default BlogList;
