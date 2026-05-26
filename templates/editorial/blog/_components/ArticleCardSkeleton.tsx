const ArticleCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="relative aspect-[16/9] animate-pulse bg-zinc-200" />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
        <div className="mt-4 h-7 w-11/12 animate-pulse rounded bg-zinc-200 md:h-8" />
        <div className="mt-2 h-7 w-3/4 animate-pulse rounded bg-zinc-200 md:h-8" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-zinc-200" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-200" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <div className="h-3 w-24 animate-pulse rounded bg-zinc-200" />
          <div className="h-3 w-20 animate-pulse rounded bg-zinc-200" />
        </div>
      </div>
    </article>
  );
};

export default ArticleCardSkeleton;
