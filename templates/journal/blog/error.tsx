'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorBoundary = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center px-4 py-24 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Error</p>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl">
        Something went sideways.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
        We hit an unexpected error loading this page. Try again, or head back to the archive.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-blue-800 hover:underline"
        >
          Back to blog
        </Link>
      </div>
    </main>
  );
};

export default ErrorBoundary;
