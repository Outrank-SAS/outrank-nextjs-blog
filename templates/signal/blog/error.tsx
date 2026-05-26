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
    if (process.env.NODE_ENV !== 'production') {
      console.error('[blog/error]', error);
    }
  }, [error]);

  return (
    <main
      role="alert"
      className="min-h-screen bg-[#050807] text-white"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24 md:py-32">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-signal-accent">
          {siteConfig.blog.errorEyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
          {siteConfig.blog.errorTitle}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">{siteConfig.blog.errorDek}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-full bg-signal-accent px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-signal-accent/90"
          >
            {siteConfig.blog.errorRetry}
          </button>
          <Link
            href="/blog"
            className="text-sm font-semibold text-zinc-300 underline-offset-4 transition hover:text-signal-accent hover:underline"
          >
            {siteConfig.blog.backToBlog}
          </Link>
        </div>

        {error.digest ? (
          <p className="mt-8 font-mono text-xs text-zinc-500">Reference: {error.digest}</p>
        ) : null}
      </div>
    </main>
  );
};

export default ErrorBoundary;
