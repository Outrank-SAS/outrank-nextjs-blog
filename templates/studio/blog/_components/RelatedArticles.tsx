import { siteConfig } from '@/app/_config/siteConfig';

import ArticleCard from './ArticleCard';
import type { OutrankArticleSummary } from '../_types/blog';

type Props = {
  articles: OutrankArticleSummary[];
};

const RelatedArticles = ({ articles }: Props) => {
  if (articles.length === 0) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl border-t border-slate-200 pt-14 md:mt-24 md:pt-16">
      <h2 className="font-serif text-3xl font-black leading-tight text-slate-950 md:text-4xl">
        {siteConfig.blog.relatedTitle}
      </h2>

      <div className="mt-4 grid grid-cols-1 md:mt-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
