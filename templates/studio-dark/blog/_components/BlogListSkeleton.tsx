import ArticleCardSkeleton from './ArticleCardSkeleton';
import { BLOG_ARTICLES_PER_PAGE } from '../_lib/constants';

const BlogListSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
        <header className="mb-10 grid gap-8 md:mb-14 md:grid-cols-[1fr_20rem] md:items-end md:gap-12">
          <div className="animate-pulse">
            <div className="h-12 w-3/4 rounded bg-zinc-800 md:h-16" />
            <div className="mt-3 h-12 w-1/2 rounded bg-zinc-800 md:h-16" />
            <div className="mt-6 h-5 w-2/3 rounded bg-zinc-800" />
          </div>
          <div className="h-12 w-full animate-pulse rounded-md bg-zinc-800" />
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: BLOG_ARTICLES_PER_PAGE }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogListSkeleton;
