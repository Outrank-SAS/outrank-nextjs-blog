const ARTICLE_SKELETON_PARAGRAPH_ROWS = 8;
const ARTICLE_SKELETON_WIDTH_MAX = 88;
const ARTICLE_SKELETON_WIDTH_STEP = 6;
const ARTICLE_SKELETON_WIDTH_CYCLE = 4;

const ArticleSkeleton = () => {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-14">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

        <article className="mt-8">
          <header className="mx-auto mb-10 max-w-5xl border-b border-slate-200 pb-8 text-center md:pb-12">
            <div className="mx-auto h-5 w-48 animate-pulse rounded-full bg-slate-200" />
            <div className="mx-auto mt-6 h-10 w-11/12 animate-pulse rounded bg-slate-200 md:h-14" />
            <div className="mx-auto mt-3 h-10 w-3/4 animate-pulse rounded bg-slate-200 md:h-14" />
            <div className="mx-auto mt-6 h-5 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="mx-auto mt-6 h-4 w-48 animate-pulse rounded bg-slate-200" />
          </header>

          <div className="relative mx-auto mb-12 aspect-[16/9] max-w-5xl animate-pulse bg-slate-200" />

          <div className="mx-auto max-w-3xl space-y-4">
            {Array.from({ length: ARTICLE_SKELETON_PARAGRAPH_ROWS }).map((_, index) => (
              <div
                key={index}
                className="h-4 animate-pulse rounded bg-slate-200"
                style={{
                  width: `${ARTICLE_SKELETON_WIDTH_MAX - (index % ARTICLE_SKELETON_WIDTH_CYCLE) * ARTICLE_SKELETON_WIDTH_STEP}%`,
                }}
              />
            ))}
          </div>
        </article>
      </div>
    </main>
  );
};

export default ArticleSkeleton;
