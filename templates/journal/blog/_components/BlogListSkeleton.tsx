import ArticleCardSkeleton from './ArticleCardSkeleton';

const COMPACT_PLACEHOLDERS = Array.from({ length: 4 });

const BlogListSkeleton = () => {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
      <header className="mb-14 md:mb-20">
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-5 h-12 w-3/4 animate-pulse rounded-lg bg-slate-200 md:h-16" />
        <div className="mt-6 h-5 w-2/3 animate-pulse rounded-lg bg-slate-200" />
      </header>

      <ArticleCardSkeleton featured />
      <div className="mt-14 border-t border-journal-accent/30 md:mt-20">
        {COMPACT_PLACEHOLDERS.map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};

export default BlogListSkeleton;
