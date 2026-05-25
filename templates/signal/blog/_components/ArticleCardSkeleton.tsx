type Props = {
  featured?: boolean;
};

const ArticleCardSkeleton = ({ featured = false }: Props) => {
  if (featured) {
    return (
      <article className="grid h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative aspect-[16/10] animate-pulse bg-white/[0.06] md:aspect-auto md:min-h-full" />
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="mb-4 flex flex-wrap gap-1.5">
            <div className="h-5 w-12 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />
          </div>
          <div className="h-8 w-full animate-pulse rounded bg-white/[0.06] md:h-12" />
          <div className="mt-3 h-8 w-10/12 animate-pulse rounded bg-white/[0.06] md:h-12" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/[0.06]" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-4 w-9/12 animate-pulse rounded bg-white/[0.06]" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-6">
            <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-xl shadow-black/20">
      <div className="relative aspect-[16/9] animate-pulse bg-white/[0.06]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap gap-1.5">
          <div className="h-5 w-12 animate-pulse rounded-full bg-white/[0.06]" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-white/[0.06]" />
        </div>
        <div className="h-5 w-11/12 animate-pulse rounded bg-white/[0.06]" />
        <div className="mt-2 h-5 w-9/12 animate-pulse rounded bg-white/[0.06]" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3 w-11/12 animate-pulse rounded bg-white/[0.06]" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
        </div>
      </div>
    </article>
  );
};

export default ArticleCardSkeleton;
