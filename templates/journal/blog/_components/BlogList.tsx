'use client';

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
          <div>
            {filteredResults.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                imageLoading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <EmptySearchState query={trimmedQuery} allArticles={allArticles} />
        )
      ) : paginatedArticles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No articles found.
        </div>
      ) : featuredArticle ? (
        <div>
          <ArticleCard article={featuredArticle} featured />
          {remainingArticles.length ? (
            <div className="mt-12 border-t border-slate-200 md:mt-16">
              {remainingArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  imageLoading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {remainingArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              imageLoading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      )}

      {showPagination ? <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} /> : null}
    </>
  );
};

export default BlogList;
