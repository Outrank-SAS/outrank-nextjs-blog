const SKELETON_PARAGRAPH_COUNT = 8;
const SKELETON_TOC_ITEM_COUNT = 5;

const ArticleSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-20">
        <div className="h-5 w-28 animate-pulse rounded bg-white/[0.06]" />

        <article className="mt-10">
          <header className="mx-auto mb-12 max-w-5xl text-center">
            <div className="mb-6 flex flex-wrap justify-center gap-1.5">
              <div className="h-5 w-12 animate-pulse rounded-full bg-white/[0.06]" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />
              <div className="h-5 w-14 animate-pulse rounded-full bg-white/[0.06]" />
            </div>
            <div className="mx-auto h-12 w-11/12 max-w-4xl animate-pulse rounded bg-white/[0.06] md:h-16" />
            <div className="mx-auto mt-3 h-12 w-8/12 max-w-3xl animate-pulse rounded bg-white/[0.06] md:h-16" />
            <div className="mx-auto mt-6 max-w-3xl space-y-2">
              <div className="h-5 animate-pulse rounded bg-white/[0.06]" />
              <div className="mx-auto h-5 w-10/12 animate-pulse rounded bg-white/[0.06]" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
              <div className="h-4 w-20 animate-pulse rounded bg-white/[0.06]" />
            </div>
          </header>

          <div className="relative mx-auto mb-14 aspect-[16/9] max-w-5xl animate-pulse overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]" />

          <div className="mx-auto max-w-5xl xl:grid xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
            <div className="hidden xl:block">
              <div className="sticky top-24 space-y-3">
                <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
                {Array.from({ length: SKELETON_TOC_ITEM_COUNT }).map((_, index) => (
                  <div key={index} className="h-4 w-11/12 animate-pulse rounded bg-white/[0.06]" />
                ))}
              </div>
            </div>
            <div className="mx-auto w-full max-w-3xl space-y-4 xl:mx-0 xl:max-w-none">
              {Array.from({ length: SKELETON_PARAGRAPH_COUNT }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-4 w-9/12 animate-pulse rounded bg-white/[0.06]" />
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default ArticleSkeleton;
