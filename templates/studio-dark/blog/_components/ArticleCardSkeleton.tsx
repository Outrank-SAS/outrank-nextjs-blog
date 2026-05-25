const ArticleCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col p-6 md:p-8">
      <div className="relative aspect-[16/10] animate-pulse bg-zinc-800" />
      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="h-5 w-14 animate-pulse rounded-full bg-zinc-800" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-zinc-800" />
        </div>
        <div className="h-7 w-11/12 animate-pulse rounded bg-zinc-800 md:h-8" />
        <div className="mt-2 h-7 w-3/4 animate-pulse rounded bg-zinc-800 md:h-8" />
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </article>
  );
};

export default ArticleCardSkeleton;
