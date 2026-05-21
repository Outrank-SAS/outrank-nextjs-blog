import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
      <Link
        href="/blog"
        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
      >
        Back to blog
      </Link>

      <article className="mt-8">
        <header className="mx-auto mb-10 max-w-4xl">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="rounded-full border border-teal-700 px-3 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-50"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">{article.title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            {article.meta_description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-500">
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span aria-hidden="true">/</span>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </header>

        {article.image_url ? (
          <div className="relative mx-auto mb-12 max-w-4xl aspect-[16/9] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-200/70">
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

        <div className="mx-auto max-w-5xl">
          <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </article>

      <RelatedArticles articles={relatedArticles} />
    </main>
  );
};

export default ArticlePage;
