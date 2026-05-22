import ArticleCardSkeleton from './ArticleCardSkeleton';
import { BLOG_ARTICLES_PER_PAGE } from '../_lib/constants';

type Props = {
  titleWidthClass?: string;
};

const DEFAULT_TITLE_WIDTH_CLASS = 'w-2/3';

const BlogListSkeleton = ({ titleWidthClass = DEFAULT_TITLE_WIDTH_CLASS }: Props) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
      <header className="mx-auto mb-12 max-w-3xl animate-pulse text-center">
        <div className={`mx-auto h-12 rounded bg-slate-200 md:h-16 ${titleWidthClass}`} />
        <div className="mx-auto mt-5 h-5 w-full max-w-2xl rounded bg-slate-200" />
        <div className="mx-auto mt-2 h-5 w-10/12 max-w-2xl rounded bg-slate-200" />
      </header>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: BLOG_ARTICLES_PER_PAGE }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};

export default BlogListSkeleton;
