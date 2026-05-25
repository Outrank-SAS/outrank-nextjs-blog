'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { siteConfig } from '@/app/_config/siteConfig';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorBoundary = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      data-component="blog-error"
      className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24 text-slate-950 md:py-32"
    >
      <p className="text-xs font-black uppercase tracking-[0.24em] text-outrank-classic-accent">
        {siteConfig.blog.errorEyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
        {siteConfig.blog.errorTitle}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{siteConfig.blog.errorDek}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center rounded-md bg-outrank-classic-accent px-5 text-sm font-semibold text-white transition hover:bg-outrank-classic-accent/90"
        >
          {siteConfig.blog.errorRetry}
        </button>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 underline-offset-4 transition hover:text-outrank-classic-accent hover:underline"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {siteConfig.blog.backToBlog}
        </Link>
      </div>
    </main>
  );
};

export default ErrorBoundary;
