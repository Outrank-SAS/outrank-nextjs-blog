import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design preview',
  robots: { index: false, follow: false },
};

type PreviewCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
};

const PREVIEW_CARDS: PreviewCard[] = [
  {
    title: 'Blog list — Loading skeleton',
    description: 'How /blog looks while articles are being fetched. The same skeleton renders on tag pages.',
    href: '/blog/preview/loading',
    badge: 'Loading',
  },
  {
    title: 'Article — Loading skeleton',
    description: 'How a single article page looks while content is being fetched.',
    href: '/blog/preview/article-loading',
    badge: 'Loading',
  },
  {
    title: 'Error state',
    description: 'How the blog renders when something throws — data fetch fails, server error, etc.',
    href: '/blog/preview/error',
    badge: 'Error',
  },
  {
    title: '404 — Article not found',
    description: 'How a missing article page looks. Visiting any non-existent article slug triggers it.',
    href: '/blog/this-article-does-not-exist',
    badge: '404',
  },
];

const BADGE_STYLES: Record<string, string> = {
  Loading: 'bg-slate-100 text-slate-700',
  Error: 'bg-red-50 text-red-700',
  '404': 'bg-amber-50 text-amber-700',
};

const PreviewIndex = () => {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 md:py-16">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong className="font-semibold">Design preview.</strong> These pages render UI states for QA only. They are
        not linked from the real blog and should be removed (or kept under a feature flag) before deploying to
        production.
      </div>

      <header className="mt-12 mb-12 md:mt-16 md:mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Preview</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl">
          Blog UI states
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Click a card to inspect each state. Refresh after editing the corresponding component to see updates.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {PREVIEW_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300"
          >
            <span
              className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                BADGE_STYLES[card.badge] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {card.badge}
            </span>
            <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-slate-950 transition group-hover:text-blue-800">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
            <span className="mt-auto pt-4 text-sm font-medium text-blue-700">View →</span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default PreviewIndex;
