import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/app/_config/siteConfig';

import ArticleSidebar from '../_components/ArticleSidebar';
import BackToTop from '../_components/BackToTop';
import RelatedArticles from '../_components/RelatedArticles';
import styles from '../_components/ArticleContent.module.css';
import { getArticle, getRelatedArticles, getStaticArticles } from '../_lib/outrank';
import { BLOG_ARTICLE_HEADER_TAG_LIMIT } from '../_lib/constants';
import { formatDate } from '../_lib/format';
import { ensureHeadingIds } from '../_lib/toc';

export const revalidate = 86400;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  const articles = await getStaticArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article not found',
    };
  }

  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      images: article.image_url ? [{ url: article.image_url }] : undefined,
    },
  };
};

const ArticlePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { html: articleHtml, tocItems } = ensureHeadingIds(article.html);
  const hasTableOfContents = tocItems.length > 0;
  const visibleTags = article.tags.slice(0, BLOG_ARTICLE_HEADER_TAG_LIMIT);
  const relatedArticles = await getRelatedArticles(article.slug, article.tags);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-16 pb-6 md:pt-24 md:pb-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-journal-accent hover:underline"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {siteConfig.blog.backToBlog}
      </Link>

      <article className="mt-10">
        <header className="mx-auto mb-12 max-w-5xl text-center">
          {visibleTags.length > 0 ? (
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {visibleTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full border border-journal-accent/20 bg-journal-accent/5 px-2.5 py-0.5 text-xs font-medium text-journal-accent transition hover:border-journal-accent/50 hover:bg-journal-accent/15"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            {article.meta_description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-600">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </header>

        {article.image_url ? (
          <div className="relative mx-auto mb-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              loading="eager"
              sizes="(min-width: 768px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="mx-auto max-w-5xl xl:grid xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
          {hasTableOfContents ? (
            <aside className="hidden xl:block">
              <div className="sticky top-24">
                <ArticleSidebar items={tocItems} />
              </div>
            </aside>
          ) : (
            <div className="hidden xl:block" />
          )}
          <div className="mx-auto w-full max-w-3xl xl:mx-0 xl:max-w-none">
            <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: articleHtml }} />
          </div>
        </div>
      </article>

      <RelatedArticles articles={relatedArticles} />
      <BackToTop />
    </main>
  );
};

export default ArticlePage;
