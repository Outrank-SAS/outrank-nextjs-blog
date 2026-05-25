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
  const relatedArticles = await getRelatedArticles(article.slug, article.tags);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="bg-outrank-classic-accent">
        <div className="mx-auto w-full max-w-7xl px-4 pb-40 pt-12 md:pb-56 md:pt-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 underline-offset-4 transition hover:text-white hover:underline"
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

          <div className="mx-auto mt-8 max-w-5xl text-center md:mt-12">
            {article.tags.length > 0 ? (
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/60 hover:bg-white/20"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              {article.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-violet-100 md:text-xl">
              {article.meta_description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-violet-200">
              <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.reading_time_minutes} min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
        <article>
          {article.image_url ? (
            <div className="relative mx-auto -mt-40 mb-12 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl border border-violet-100 bg-slate-100 md:-mt-56 md:mb-16">
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

          <div className="mx-auto max-w-7xl xl:grid xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-12">
            {hasTableOfContents ? (
              <aside className="hidden xl:block">
                <div className="sticky top-24">
                  <ArticleSidebar items={tocItems} />
                </div>
              </aside>
            ) : (
              <div className="hidden xl:block" />
            )}
            <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: articleHtml }} />
          </div>
        </article>

        <RelatedArticles articles={relatedArticles} />
      </div>
      <BackToTop />
    </main>
  );
};

export default ArticlePage;
