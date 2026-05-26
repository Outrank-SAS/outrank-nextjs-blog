import ArticleCardSkeleton from './ArticleCardSkeleton';
import { BLOG_ARTICLES_PER_PAGE } from '../_lib/constants';

type Props = {
  titleWidthClass?: string;
};

const DEFAULT_TITLE_WIDTH_CLASS = 'w-3/4';

const BlogListSkeleton = ({ titleWidthClass = DEFAULT_TITLE_WIDTH_CLASS }: Props) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 text-zinc-950 md:py-20">
      <header className="mb-14 border-b border-zinc-200 pb-12 md:mb-20 md:pb-16">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
          <div className="animate-pulse">
            <div className="h-3 w-16 rounded bg-zinc-200" />
            <div className={`mt-4 h-12 rounded bg-zinc-200 md:h-16 ${titleWidthClass}`} />
            <div className={`mt-3 h-12 rounded bg-zinc-200 md:h-16 ${titleWidthClass}`} />
          </div>
          <div className="animate-pulse">
            <div className="h-5 w-full max-w-2xl rounded bg-zinc-200" />
            <div className="mt-2 h-5 w-10/12 max-w-2xl rounded bg-zinc-200" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {Array.from({ length: BLOG_ARTICLES_PER_PAGE }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};

export default BlogListSkeleton;
