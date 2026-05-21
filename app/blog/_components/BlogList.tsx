'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import type { OutrankArticleSummary } from '../_types/blog';

const SEARCH_PARAM = 'q';
const PAGE_PARAM = 'page';
const SEARCH_DEBOUNCE_MS = 150;
const TAG_CHIP_LIMIT = 12;
const EAGER_IMAGE_COUNT = 3;

type Props = {
  paginatedArticles: OutrankArticleSummary[];
  allArticles: OutrankArticleSummary[];
  currentPage: number;
  totalPages: number;
};

const collectTags = (articles: OutrankArticleSummary[]): string[] => {
  const tagCounts = new Map<string, number>();
  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagCounts.entries())
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([tag]) => tag);
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
    const trimmed = debouncedQuery.trim();
    if (trimmed) {
      params.set(SEARCH_PARAM, trimmed);
      params.delete(PAGE_PARAM);
    } else {
      params.delete(SEARCH_PARAM);
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedQuery, pathname, router]);

  const allTags = useMemo(() => collectTags(allArticles), [allArticles]);

  const trimmedQuery = debouncedQuery.trim();
  const isSearching = trimmedQuery.length > 0;
  const normalizedQuery = trimmedQuery.toLowerCase();

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return allArticles.filter((article) => {
      const title = article.title.toLowerCase();
      const description = article.meta_description.toLowerCase();
      return title.includes(normalizedQuery) || description.includes(normalizedQuery);
    });
  }, [isSearching, normalizedQuery, allArticles]);

  const displayedArticles = isSearching ? searchResults : paginatedArticles;
  const showPagination = !isSearching && totalPages > 1;

  return (
    <>
      <div className="mb-10 space-y-5">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-12 text-base text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ClearIcon />
            </button>
          ) : null}
        </div>

        {allTags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Browse by tag</span>
            {allTags.slice(0, TAG_CHIP_LIMIT).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {isSearching ? (
        <p className="mb-6 text-sm text-slate-600">
          {displayedArticles.length === 1
            ? '1 result'
            : `${displayedArticles.length} results`}{' '}
          for &ldquo;{trimmedQuery}&rdquo;
        </p>
      ) : null}

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
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          {isSearching ? (
            <>
              No articles match &ldquo;{trimmedQuery}&rdquo;.{' '}
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="font-semibold text-teal-700 underline-offset-2 hover:underline"
              >
                Clear search
              </button>
            </>
          ) : (
            'No articles found.'
          )}
        </div>
      )}

      {showPagination ? <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} /> : null}
    </>
  );
};

export default BlogList;
