import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import styles from '../_components/ArticleContent.module.css';
import { getArticle, getStaticArticles } from '../_lib/outrank';
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

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-10">
      <Link
        href="/blog"
        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-800"
      >
        Back to blog
      </Link>

      <article className="mt-8">
        <header className="mx-auto mb-10 max-w-4xl border-b border-slate-200 pb-10 text-left md:text-center">
          <div className="mb-5 flex flex-wrap justify-start gap-2 md:justify-center">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">{article.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:mx-auto md:text-xl">
            {article.meta_description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-start gap-3 text-sm font-bold text-slate-500 md:justify-center">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">/</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </header>

        {article.image_url ? (
          <div className="relative mx-auto mb-12 aspect-[16/9] max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-xl shadow-slate-200/70">
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

        <div className="mx-auto max-w-4xl">
          <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </article>
    </main>
  );
};

export default ArticlePage;
