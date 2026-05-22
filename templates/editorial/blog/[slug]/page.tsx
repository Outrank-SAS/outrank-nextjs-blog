import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/app/_config/siteConfig';

import BackToTop from '../_components/BackToTop';
import RelatedArticles from '../_components/RelatedArticles';
import styles from '../_components/ArticleContent.module.css';
import { getArticle, getRelatedArticles, getStaticArticles } from '../_lib/outrank';
import { formatDate } from '../_lib/format';

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

  const relatedArticles = await getRelatedArticles(article.slug, article.tags);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 text-zinc-950 md:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-700 underline-offset-4 transition hover:text-violet-800 hover:underline"
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
            <p className="mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-serif text-sm italic text-zinc-500">
              {article.tags.map((tag, index) => (
                <span key={tag} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <Link
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="underline-offset-2 transition hover:text-violet-700 hover:underline"
                  >
                    {tag}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
          <h1 className="font-serif text-4xl font-black leading-[1.05] text-zinc-950 md:text-6xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">
            {article.meta_description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-zinc-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">/</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </header>

        {article.image_url ? (
          <div className="relative mx-auto mb-14 aspect-[16/9] max-w-5xl overflow-hidden rounded-lg bg-zinc-100">
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

        <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: article.html }} />
      </article>

      <RelatedArticles articles={relatedArticles} />
      <BackToTop />
    </main>
  );
};

export default ArticlePage;
