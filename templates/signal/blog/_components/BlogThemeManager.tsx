'use client';

import { useEffect, useLayoutEffect } from 'react';

const BLOG_THEME_ATTRIBUTE = 'data-blog-theme';
const BLOG_THEME_DARK = 'dark';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const BlogThemeManager = () => {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.setAttribute(BLOG_THEME_ATTRIBUTE, BLOG_THEME_DARK);
    return () => {
      document.documentElement.removeAttribute(BLOG_THEME_ATTRIBUTE);
    };
  }, []);

  return null;
};

export default BlogThemeManager;
