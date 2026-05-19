import Link from 'next/link';

import {
  BLOG_DEFAULT_PAGE,
  BLOG_PAGINATION_SIBLING_COUNT,
  BLOG_PAGINATION_VISIBLE_PAGE_GAP,
} from '../_lib/constants';

type Props = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

type PaginationItem =
  | {
      type: 'page';
      page: number;
    }
  | {
      type: 'ellipsis';
      key: string;
    };

const PAGINATION_ITEM_PAGE = 'page';
const PAGINATION_ITEM_ELLIPSIS = 'ellipsis';
const PAGINATION_START_ELLIPSIS_KEY = 'start-ellipsis';
const PAGINATION_END_ELLIPSIS_KEY = 'end-ellipsis';

const getPageHref = (basePath: string, page: number) => {
  return page === BLOG_DEFAULT_PAGE ? basePath : `${basePath}?page=${page}`;
};

const getPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  const pages = new Set<number>([BLOG_DEFAULT_PAGE, totalPages]);

  for (
    let page = currentPage - BLOG_PAGINATION_SIBLING_COUNT;
    page <= currentPage + BLOG_PAGINATION_SIBLING_COUNT;
    page += BLOG_DEFAULT_PAGE
  ) {
    if (page > BLOG_DEFAULT_PAGE && page < totalPages) {
      pages.add(page);
    }
  }

  return Array.from(pages)
    .sort((firstPage, secondPage) => firstPage - secondPage)
    .reduce<PaginationItem[]>((items, page, index, sortedPages) => {
      const previousPage = sortedPages[index - BLOG_DEFAULT_PAGE];

      if (previousPage && page - previousPage > BLOG_PAGINATION_VISIBLE_PAGE_GAP) {
        items.push({
          type: PAGINATION_ITEM_ELLIPSIS,
          key: previousPage === BLOG_DEFAULT_PAGE ? PAGINATION_START_ELLIPSIS_KEY : PAGINATION_END_ELLIPSIS_KEY,
        });
      }

      items.push({ type: PAGINATION_ITEM_PAGE, page });

      return items;
    }, []);
};

const Pagination = ({ basePath, currentPage, totalPages }: Props) => {
  if (totalPages <= 1) return null;

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={getPageHref(basePath, currentPage - 1)}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
        >
          Previous
        </Link>
      ) : null}
      {paginationItems.map((item) =>
        item.type === PAGINATION_ITEM_ELLIPSIS ? (
          <span key={item.key} className="px-2 text-sm text-zinc-500" aria-hidden="true">
            ...
          </span>
        ) : (
          <Link
            key={item.page}
            href={getPageHref(basePath, item.page)}
            aria-current={item.page === currentPage ? 'page' : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-bold shadow-sm transition ${
              item.page === currentPage
                ? 'border-rose-700 bg-rose-700 text-white'
                : 'border-zinc-300 bg-white text-zinc-950 hover:border-rose-300 hover:bg-rose-50'
            }`}
          >
            {item.page}
          </Link>
        ),
      )}
      {currentPage < totalPages ? (
        <Link
          href={getPageHref(basePath, currentPage + 1)}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
};

export default Pagination;
