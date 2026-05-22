'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import type { OutrankArticleSummary } from '../_types/blog';

const SEARCH_PARAM = 'q';
const PAGE_PARAM = 'page';
const SEARCH_DEBOUNCE_MS = 150;
const EAGER_IMAGE_COUNT = 3;

type Props = {
  paginatedArticles: OutrankArticleSummary[];
  allArticles: OutrankArticleSummary[];
  currentPage: number;
  totalPages: number;
};

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ClearIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const FrownIcon = () => (
  <svg
    width="36"
    height="36"
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
  const router = useRouter();
  const pathname = usePathname();

  const initialQuery = searchParams.get(SEARCH_PARAM) || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(searchQuery), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery) {
      params.set(SEARCH_PARAM, trimmedQuery);
    } else {
      params.delete(SEARCH_PARAM);
    }

    if (trimmedQuery) {
      params.delete(PAGE_PARAM);
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedQuery, pathname, router]);

  const trimmedQuery = debouncedQuery.trim();
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

  const displayedArticles = isSearching ? filteredResults : paginatedArticles;
  const showPagination = !isSearching && totalPages > 1;

  return (
    <>
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="relative">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="h-14 w-full rounded-full border border-slate-200 bg-white pl-14 pr-14 text-base text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ClearIcon />
            </button>
          ) : null}
        </div>
      </div>

      {displayedArticles.length ? (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {displayedArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              imageLoading={index < EAGER_IMAGE_COUNT ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      ) : isSearching ? (
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <FrownIcon />
          </div>
          <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Nothing matched your search</h3>
          <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
            Try different keywords, or jump back to the full blog.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-7 inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Show all articles
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          {siteConfig.blog.emptyState}
        </div>
      )}

      {showPagination ? <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} /> : null}
    </>
  );
};

export default BlogList;
