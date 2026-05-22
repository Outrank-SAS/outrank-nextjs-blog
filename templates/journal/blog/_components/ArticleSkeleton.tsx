const ArticleSkeleton = () => {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
      <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
      <article className="mt-10">
        <header className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mx-auto h-3 w-48 animate-pulse rounded-full bg-slate-200" />
          <div className="mx-auto mt-5 h-10 w-11/12 animate-pulse rounded-lg bg-slate-200 md:h-14" />
          <div className="mx-auto mt-3 h-10 w-3/4 animate-pulse rounded-lg bg-slate-200 md:h-14" />
          <div className="mx-auto mt-6 h-5 w-3/5 animate-pulse rounded-lg bg-slate-200" />
          <div className="mx-auto mt-6 h-4 w-44 animate-pulse rounded-full bg-slate-200" />
        </header>

        <div className="relative mx-auto mb-14 aspect-[16/9] max-w-4xl animate-pulse overflow-hidden rounded-xl bg-slate-200" />

        <div className="mx-auto max-w-3xl space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-4 animate-pulse rounded-lg bg-slate-200"
              style={{ width: `${88 - (index % 4) * 6}%` }}
            />
          ))}
        </div>
      </article>
    </main>
  );
};

export default ArticleSkeleton;
