const ArticleSkeleton = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 text-zinc-950 md:py-20">
      <div className="h-4 w-28 animate-pulse rounded bg-zinc-200" />

      <article className="mt-10">
        <header className="mx-auto mb-12 max-w-5xl text-center">
          <div className="mx-auto h-4 w-64 animate-pulse rounded bg-zinc-200" />
          <div className="mx-auto mt-6 h-10 w-11/12 animate-pulse rounded bg-zinc-200 md:h-14" />
          <div className="mx-auto mt-3 h-10 w-3/4 animate-pulse rounded bg-zinc-200 md:h-14" />
          <div className="mx-auto mt-6 h-5 w-2/3 animate-pulse rounded bg-zinc-200" />
          <div className="mx-auto mt-6 h-4 w-48 animate-pulse rounded bg-zinc-200" />
        </header>

        <div className="relative mx-auto mb-14 aspect-[16/9] max-w-5xl animate-pulse rounded-lg bg-zinc-200" />

        <div className="mx-auto max-w-3xl space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-4 animate-pulse rounded bg-zinc-200"
              style={{ width: `${88 - (index % 4) * 6}%` }}
            />
          ))}
        </div>
      </article>
    </main>
  );
};

export default ArticleSkeleton;
