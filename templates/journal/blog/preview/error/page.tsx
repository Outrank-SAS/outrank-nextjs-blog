import Link from 'next/link';

import { siteConfig } from '@/app/_config/siteConfig';

import ErrorBoundaryTrigger from './ErrorBoundaryTrigger';

export const metadata = {
  title: 'Preview — Error state',
  robots: { index: false, follow: false },
};

const ErrorPreview = () => {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center px-4 py-24 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-journal-accent">
        {siteConfig.blog.errorEyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl">
        {siteConfig.blog.errorTitle}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{siteConfig.blog.errorDek}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white opacity-70"
        >
          {siteConfig.blog.errorRetry}
        </button>
        <Link
          href="/blog"
          className="text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-journal-accent hover:underline"
        >
          {siteConfig.blog.backToBlog}
        </Link>
      </div>
      {process.env.NODE_ENV !== 'production' ? <ErrorBoundaryTrigger /> : null}
    </main>
  );
};

export default ErrorPreview;
