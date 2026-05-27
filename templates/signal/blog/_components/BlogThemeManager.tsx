'use client';

import { useEffect, useLayoutEffect } from 'react';

const BLOG_THEME_ATTRIBUTE = 'data-blog-theme';
const BLOG_THEME_DARK = 'dark';
const SIGNAL_ACCENT_PROPERTY = '--signal-accent';
const SIGNAL_ACCENT_FALLBACK = '190 242 100';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const BlogThemeManager = () => {
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;

    root.setAttribute(BLOG_THEME_ATTRIBUTE, BLOG_THEME_DARK);

    const hasSignalAccent = getComputedStyle(root).getPropertyValue(SIGNAL_ACCENT_PROPERTY).trim().length > 0;
    if (!hasSignalAccent) {
      root.style.setProperty(SIGNAL_ACCENT_PROPERTY, SIGNAL_ACCENT_FALLBACK);
    }

    return () => {
      root.removeAttribute(BLOG_THEME_ATTRIBUTE);
      if (!hasSignalAccent) {
        root.style.removeProperty(SIGNAL_ACCENT_PROPERTY);
      }
    };
  }, []);

  return null;
};

export default BlogThemeManager;
