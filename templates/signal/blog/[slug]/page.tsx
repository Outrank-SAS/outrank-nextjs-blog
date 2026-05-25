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
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 underline-offset-4 transition hover:text-signal-accent hover:underline"
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
            {article.tags.length > 0 ? (
              <div className="mb-6 flex flex-wrap justify-center gap-1.5">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border border-signal-accent/30 bg-signal-accent/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-signal-accent transition hover:border-signal-accent/60 hover:bg-signal-accent/20 hover:text-signal-accent"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
            <h1 className="text-4xl font-black leading-[1.1] text-white md:text-6xl">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
              {article.meta_description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">
              <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
              <span aria-hidden="true">/</span>
              <span>{article.reading_time_minutes} min read</span>
            </div>
          </header>

          {article.image_url ? (
            <div className="relative mx-auto mb-14 aspect-[16/9] max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
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

          <div className="relative mx-auto max-w-3xl">
            {hasTableOfContents ? (
              <aside className="absolute -left-32 top-0 hidden w-28 xl:block">
                <div className="sticky top-24">
                  <ArticleSidebar items={tocItems} />
                </div>
              </aside>
            ) : null}
            <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: articleHtml }} />
          </div>
        </article>

        <RelatedArticles articles={relatedArticles} />
        <BackToTop />
      </div>
    </main>
  );
};

export default ArticlePage;
