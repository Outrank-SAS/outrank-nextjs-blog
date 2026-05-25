'use client';

import { useEffect, useState } from 'react';

import { siteConfig } from '@/app/_config/siteConfig';

import type { TocItem } from '../_lib/toc';

type Props = {
  items: TocItem[];
};

const OBSERVER_ROOT_MARGIN = '0px 0px -75% 0px';

const ArticleSidebar = ({ items }: Props) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={siteConfig.blog.tableOfContentsLabel}>
      <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-950">
        {siteConfig.blog.tableOfContentsLabel}
      </p>
      <ul className="mt-4 space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`block py-1.5 font-serif text-sm leading-snug transition ${item.level === 3 ? 'pl-4' : ''} ${
                  isActive ? 'font-semibold text-studio-accent' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ArticleSidebar;
