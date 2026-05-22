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
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24 text-zinc-950 md:py-32">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-700">
        {siteConfig.blog.errorEyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-black leading-[1.05] text-zinc-950 md:text-6xl">
        {siteConfig.blog.errorTitle}
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg italic leading-8 text-zinc-600">
        {siteConfig.blog.errorDek}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-zinc-800"
        >
          {siteConfig.blog.errorRetry}
        </button>
        <Link
          href="/blog"
          className="text-sm font-semibold text-zinc-700 underline-offset-4 transition hover:text-violet-800 hover:underline"
        >
          {siteConfig.blog.backToBlog}
        </Link>
      </div>
    </main>
  );
};

export default ErrorBoundary;
