import ArticleCardSkeleton from './ArticleCardSkeleton';
import { BLOG_ARTICLES_PER_PAGE } from '../_lib/constants';

type Props = {
  eyebrow?: string;
  titleWidthClass?: string;
};

const DEFAULT_EYEBROW = 'Blog';
const DEFAULT_TITLE_WIDTH_CLASS = 'w-2/3';

const BlogListSkeleton = ({
  eyebrow = DEFAULT_EYEBROW,
  titleWidthClass = DEFAULT_TITLE_WIDTH_CLASS,
}: Props) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
      <header className="mb-12 max-w-3xl animate-pulse">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">{eyebrow}</p>
        <div className={`mt-4 h-12 rounded bg-slate-200 md:h-16 ${titleWidthClass}`} />
        <div className="mt-5 h-5 w-full max-w-2xl rounded bg-slate-200" />
        <div className="mt-2 h-5 w-10/12 max-w-2xl rounded bg-slate-200" />
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
