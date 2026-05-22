import Link from 'next/link';

import { siteConfig } from '@/app/_config/siteConfig';

const NotFound = () => {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center px-4 py-24 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
        {siteConfig.blog.notFoundEyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl">
        {siteConfig.blog.notFoundTitle}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{siteConfig.blog.notFoundDek}</p>
      <Link
        href="/blog"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-blue-800 hover:underline"
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
    </main>
  );
};

export default NotFound;
