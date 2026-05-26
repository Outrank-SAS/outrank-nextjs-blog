'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './ArticleCard';
import EmptySearchState from './EmptySearchState';
import FeaturedArticle from './FeaturedArticle';
import Pagination from './Pagination';
import type { OutrankArticleSummary } from '../_types/blog';
import { BLOG_DEFAULT_PAGE } from '../_lib/constants';

const SEARCH_PARAM = 'q';
const EAGER_IMAGE_LIMIT = 4;

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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResults.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            imageLoading={index < EAGER_IMAGE_LIMIT ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    );
  }

  if (paginatedArticles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
        {siteConfig.blog.emptyState}
      </div>
    );
  }

  const isFirstPage = currentPage === BLOG_DEFAULT_PAGE;
  const featuredArticle = isFirstPage ? paginatedArticles[0] : undefined;
  const gridArticles = featuredArticle ? paginatedArticles.slice(1) : paginatedArticles;
  const showPagination = totalPages > 1;

  return (
    <>
      {featuredArticle ? <FeaturedArticle article={featuredArticle} /> : null}
      {gridArticles.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              imageLoading={index < EAGER_IMAGE_LIMIT ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      ) : null}
      {showPagination ? <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} /> : null}
    </>
  );
};

export default BlogList;
