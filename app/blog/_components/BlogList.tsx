'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import type { OutrankArticleSummary } from '../_types/blog';

const SEARCH_PARAM = 'q';
const TAG_PARAM = 'tag';
const PAGE_PARAM = 'page';
const SEARCH_DEBOUNCE_MS = 150;
const EAGER_IMAGE_COUNT = 3;
const FADE_EDGE_TOLERANCE_PX = 96;

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

const ChipClearIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const EmptySearchIllustration = () => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <g transform="rotate(-8 100 100)">
      <circle cx="82" cy="82" r="46" strokeWidth="3" />
      <path d="M 60 68 L 74 62" strokeWidth="2.8" />
      <path d="M 92 62 L 106 68" strokeWidth="2.8" />
      <path d="M 62 82 Q 68 88 74 82" strokeWidth="2.4" />
      <path d="M 92 82 Q 98 88 104 82" strokeWidth="2.4" />
      <path d="M 70 102 Q 83 93 96 102" strokeWidth="2.4" />
      <line x1="115" y1="115" x2="155" y2="155" strokeWidth="7" />
    </g>
  </svg>
);

const BlogList = ({ paginatedArticles, allArticles, currentPage, totalPages }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQuery = searchParams.get(SEARCH_PARAM) || '';
  const initialTag = searchParams.get(TAG_PARAM) || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [scrollMode, setScrollMode] = useState<'start' | 'middle' | 'end' | 'none'>('start');
  const tagScrollerRef = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLButtonElement>(null);

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

    if (selectedTag) {
      params.set(TAG_PARAM, selectedTag);
    } else {
      params.delete(TAG_PARAM);
    }

    if (trimmedQuery || selectedTag) {
      params.delete(PAGE_PARAM);
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedQuery, selectedTag, pathname, router]);

  const allTags = useMemo(() => collectTags(allArticles), [allArticles]);

  useEffect(() => {
    const scroller = tagScrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scroller;
      if (scrollWidth <= clientWidth + 1) {
        setScrollMode('none');
        return;
      }
      const atStart = scrollLeft <= FADE_EDGE_TOLERANCE_PX;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - FADE_EDGE_TOLERANCE_PX;
      if (atStart && atEnd) {
        setScrollMode('none');
        return;
      }
      if (atStart) {
        setScrollMode('start');
        return;
      }
      if (atEnd) {
        setScrollMode('end');
        return;
      }
      setScrollMode('middle');
    };

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      scroller.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [allTags.length]);

  useEffect(() => {
    if (!selectedTag || !activeChipRef.current) return;
    activeChipRef.current.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  }, [selectedTag]);

  const tagScrollerMaskImage = (() => {
    switch (scrollMode) {
      case 'start':
        return 'linear-gradient(to right, black 92%, transparent 100%)';
      case 'end':
        return 'linear-gradient(to right, transparent 0%, black 8%)';
      case 'middle':
        return 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)';
      default:
        return undefined;
    }
  })();

  const trimmedQuery = debouncedQuery.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  const isSearching = trimmedQuery.length > 0;
  const isTagFiltering = selectedTag.length > 0;
  const isFiltering = isSearching || isTagFiltering;

  const filteredResults = useMemo(() => {
    if (!isFiltering) return [];
    return allArticles.filter((article) => {
      const matchesQuery =
        !isSearching ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.meta_description.toLowerCase().includes(normalizedQuery);
      const matchesTag = !isTagFiltering || article.tags.includes(selectedTag);
      return matchesQuery && matchesTag;
    });
  }, [isFiltering, isSearching, isTagFiltering, normalizedQuery, selectedTag, allArticles]);

  const displayedArticles = isFiltering ? filteredResults : paginatedArticles;
  const showPagination = !isFiltering && totalPages > 1;

  const handleTagToggle = (tag: string) => {
    setSelectedTag((current) => (current === tag ? '' : tag));
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
  };

  return (
    <>
      <div className="mb-8 space-y-5">
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
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-12 text-base text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
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
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Browse by tag</span>
              {isTagFiltering ? (
                <button
                  type="button"
                  onClick={() => setSelectedTag('')}
                  className="text-xs font-semibold text-teal-700 transition hover:text-teal-900"
                >
                  Show all
                </button>
              ) : null}
            </div>
            <div
              ref={tagScrollerRef}
              style={
                tagScrollerMaskImage
                  ? { maskImage: tagScrollerMaskImage, WebkitMaskImage: tagScrollerMaskImage }
                  : undefined
              }
              className="flex gap-2 overflow-x-auto pb-1 scroll-px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {allTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    ref={isActive ? activeChipRef : undefined}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    aria-pressed={isActive}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      isActive
                        ? 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {tag}
                    {isActive ? <ChipClearIcon /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
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
      ) : isFiltering ? (
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="text-slate-400">
            <EmptySearchIllustration />
          </div>
          <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Nothing matched your search</h3>
          <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
            Try different keywords, browse a tag, or jump back to the full blog.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-7 inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Show all articles
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No articles found.
        </div>
      )}

      {showPagination ? <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} /> : null}
    </>
  );
};

export default BlogList;
