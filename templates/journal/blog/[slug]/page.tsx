import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-blue-800 hover:underline"
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
        Back to blog
      </Link>

      <article className="mt-10">
        <header className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mb-5 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            {article.tags.map((tag, index) => (
              <span key={tag} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true" className="text-slate-300">·</span> : null}
                <Link
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="transition hover:text-blue-900 hover:underline"
                >
                  {tag}
                </Link>
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-6xl">
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
          <div className="relative mx-auto mb-14 aspect-[16/9] max-w-4xl overflow-hidden rounded-xl bg-slate-100">
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
