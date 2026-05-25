'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './ArticleCard';
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
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.meta_description.toLowerCase().includes(normalizedQuery),
    );
  }, [isSearching, normalizedQuery, allArticles]);

  if (isSearching) {
    if (filteredResults.length === 0) {
      return (
        <div className="flex flex-col items-center bg-zinc-900 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-950 text-zinc-500">
            <FrownIcon />
          </div>
          <h3 className="mt-5 font-serif text-2xl font-black tracking-tight text-zinc-50">
            No matches for <span className="text-studio-dark-accent">“{trimmedQuery}”</span>
          </h3>
          <p className="mt-3 max-w-md text-base leading-7 text-zinc-400">
            Try different keywords, or jump back to the full blog.
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex items-center rounded-md bg-studio-dark-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-studio-dark-accent/90"
          >
            Show all articles
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center text-zinc-400">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
