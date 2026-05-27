import ArticleCardSkeleton from './ArticleCardSkeleton';

const GRID_PLACEHOLDER_COUNT = 4;

const BlogListSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
        <header className="mb-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] px-5 py-8 shadow-2xl shadow-black/30 md:px-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-12">
            <div>
              <div className="h-3 w-20 animate-pulse rounded bg-white/[0.08]" />
              <div className="mt-4 h-10 w-3/4 animate-pulse rounded-lg bg-white/[0.08] md:h-14" />
              <div className="mt-3 hidden h-10 w-1/2 animate-pulse rounded-lg bg-white/[0.08] md:block md:h-14" />
              <div className="mt-5 h-5 w-2/3 animate-pulse rounded bg-white/[0.08]" />
            </div>
            <div className="h-12 w-full animate-pulse rounded-full bg-white/[0.06]" />
          </div>
        </header>

        <div className="flex flex-col gap-5">
          <ArticleCardSkeleton featured />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: GRID_PLACEHOLDER_COUNT }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogListSkeleton;
