type Props = {
  featured?: boolean;
};

const ArticleCardSkeleton = ({ featured = false }: Props) => {
  if (featured) {
    return (
      <article className="grid gap-7 md:grid-cols-[1.15fr_1fr] md:gap-12">
        <div className="relative aspect-[4/3] animate-pulse overflow-hidden rounded-2xl bg-slate-200" />
        <div className="flex flex-col justify-center">
          <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-9 w-11/12 animate-pulse rounded-lg bg-slate-200 md:h-12" />
          <div className="mt-3 h-9 w-3/4 animate-pulse rounded-lg bg-slate-200 md:h-12" />
          <div className="mt-6 h-4 w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-6 h-3 w-40 animate-pulse rounded-full bg-slate-200" />
        </div>
      </article>
    );
  }

  return (
    <article className="grid gap-5 border-b border-journal-accent/30 py-9 md:grid-cols-[1fr_24rem] md:gap-10 md:py-10">
      <div className="flex flex-col justify-center">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-6 w-11/12 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-4 h-3 w-40 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="relative order-first aspect-[16/10] animate-pulse overflow-hidden rounded-xl bg-slate-200 md:order-none md:aspect-[3/2]" />
    </article>
  );
};

export default ArticleCardSkeleton;
