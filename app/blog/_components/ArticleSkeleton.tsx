const SKELETON_TAG_COUNT = 3;
const SKELETON_PARAGRAPH_COUNT = 8;

const ArticleSkeleton = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
      <div className="h-10 w-32 animate-pulse rounded-full bg-slate-200" />

      <article className="mt-8 animate-pulse">
        <header className="mx-auto mb-10 max-w-4xl">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {Array.from({ length: SKELETON_TAG_COUNT }).map((_, index) => (
              <div key={index} className="h-6 w-16 rounded-full bg-slate-200" />
            ))}
          </div>
          <div className="mx-auto h-12 w-11/12 max-w-3xl rounded bg-slate-200 md:h-16" />
          <div className="mx-auto mt-4 h-10 w-9/12 max-w-3xl rounded bg-slate-200 md:h-14" />
          <div className="mx-auto mt-6 space-y-2 max-w-3xl">
            <div className="h-5 rounded bg-slate-200" />
            <div className="h-5 w-10/12 rounded bg-slate-200" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-200" />
          </div>
        </header>

        <div className="relative mx-auto mb-12 aspect-[16/9] max-w-4xl rounded-lg bg-slate-200" />

        <div className="mx-auto max-w-3xl space-y-4">
          {Array.from({ length: SKELETON_PARAGRAPH_COUNT }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 rounded bg-slate-200" />
              <div className="h-4 w-11/12 rounded bg-slate-200" />
              <div className="h-4 w-9/12 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </article>
    </main>
  );
};

export default ArticleSkeleton;
