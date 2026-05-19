import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { BlogClient, type Article } from 'outrank-next-js-blog';

import {
  BLOG_ARTICLES_PER_PAGE,
  BLOG_ARTICLES_REQUEST_ERROR,
  BLOG_ARTICLE_REQUEST_ERROR,
  BLOG_ALL_ARTICLES_REQUEST_ERROR,
  BLOG_DEFAULT_PAGE,
  BLOG_REVALIDATE_SECONDS,
  BLOG_SITEMAP_PAGE_SIZE,
  OUTRANK_ENV_ERROR_PATTERN,
} from './constants';

type GetArticlesParams = {
  page?: number;
  limit?: number;
  tag?: string;
};

const getOutrankApiKey = () => {
  const apiKey = process.env.OUTRANK_BLOG_API_KEY;

  if (!apiKey) {
    throw new Error('OUTRANK_BLOG_API_KEY is not set');
  }

  return apiKey;
};

const OUTRANK_API_BASE_URL = 'https://outrank.so';

const getClient = cache(
  () =>
    new BlogClient(getOutrankApiKey(), {
      baseUrl: OUTRANK_API_BASE_URL,
    }),
);

const isOutrankConfigurationError = (error: unknown): boolean =>
  error instanceof Error && error.message.includes(OUTRANK_ENV_ERROR_PATTERN);

const runOutrankRequest = async <Response>(
  request: () => Promise<Response>,
  errorMessage: string,
): Promise<Response> => {
  try {
    return await request();
  } catch (error) {
    if (isOutrankConfigurationError(error)) {
      throw error;
    }

    throw new Error(errorMessage);
  }
};

const getArticlesByParams = unstable_cache(
  async (page: number, limit: number, tag: string) => {
    const client = getClient();

    return runOutrankRequest(
      () => (tag ? client.getTagArticles(tag, page, limit) : client.getArticles(page, limit)),
      BLOG_ARTICLES_REQUEST_ERROR,
    );
  },
  ['outrank-blog-articles'],
  { revalidate: BLOG_REVALIDATE_SECONDS },
);

export const getArticles = async ({
  page = BLOG_DEFAULT_PAGE,
  limit = BLOG_ARTICLES_PER_PAGE,
  tag,
}: GetArticlesParams = {}) => {
  return getArticlesByParams(page, limit, tag || '');
};

export const getArticle = unstable_cache(
  async (slug: string): Promise<Article | null> =>
    runOutrankRequest(() => getClient().getArticle(slug), BLOG_ARTICLE_REQUEST_ERROR),
  ['outrank-blog-article'],
  { revalidate: BLOG_REVALIDATE_SECONDS },
);

export const getAllArticles = unstable_cache(
  async (): Promise<Article[]> =>
    runOutrankRequest(() => getClient().getAllArticles(BLOG_SITEMAP_PAGE_SIZE), BLOG_ALL_ARTICLES_REQUEST_ERROR),
  ['outrank-blog-all-articles'],
  { revalidate: BLOG_REVALIDATE_SECONDS },
);

export const getStaticArticles = async (): Promise<Article[]> => {
  try {
    return await getAllArticles();
  } catch (error) {
    if (isOutrankConfigurationError(error)) {
      throw error;
    }

    return [];
  }
};
