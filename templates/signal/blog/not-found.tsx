import Link from 'next/link';
import type { Metadata } from 'next';

import { siteConfig } from '@/app/_config/siteConfig';

export const metadata: Metadata = {
  title: 'Article not found',
  description: 'The article you are looking for could not be found.',
  robots: { index: false, follow: true },
};

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24 md:py-32">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-signal-accent">
          {siteConfig.blog.notFoundEyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl">
          {siteConfig.blog.notFoundTitle}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">{siteConfig.blog.notFoundDek}</p>

        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 underline-offset-4 transition hover:text-signal-accent hover:underline"
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

export default NotFound;
