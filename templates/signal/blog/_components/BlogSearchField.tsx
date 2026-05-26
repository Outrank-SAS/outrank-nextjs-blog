'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SEARCH_PARAM = 'q';
const PAGE_PARAM = 'page';
const SEARCH_DEBOUNCE_MS = 150;

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClearIcon = () => (
  <svg
    width="14"
    height="14"
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

const BlogSearchField = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlQuery = searchParams.get(SEARCH_PARAM) || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(searchQuery), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery) {
      params.set(SEARCH_PARAM, trimmedQuery);
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

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    if (urlQuery !== debouncedQuery) {
      setSearchQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
  }, [urlQuery]);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search articles…"
        aria-label="Search articles"
        className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.06] pl-12 pr-12 text-base text-white placeholder:text-zinc-500 transition focus:border-signal-accent/40 focus:outline-none focus:ring-2 focus:ring-signal-accent/15 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />
      {searchQuery ? (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <ClearIcon />
        </button>
      ) : null}
    </div>
  );
};

export default BlogSearchField;
