import Link from 'next/link';

import { siteConfig } from '@/app/_config/siteConfig';

const NotFound = () => {
  return (
    <main
      data-component="blog-not-found"
      className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24 text-zinc-50 md:py-32"
    >
      <p className="text-xs font-black uppercase tracking-[0.24em] text-studio-dark-accent">
        {siteConfig.blog.notFoundEyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-zinc-50 md:text-6xl">
        {siteConfig.blog.notFoundTitle}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">{siteConfig.blog.notFoundDek}</p>
      <Link
        href="/blog"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 underline-offset-4 transition hover:text-studio-dark-accent hover:underline"
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
