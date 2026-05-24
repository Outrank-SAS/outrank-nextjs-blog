'use client';

import { useEffect, useLayoutEffect } from 'react';

const BLOG_THEME_ATTRIBUTE = 'data-blog-theme';
const BLOG_THEME_DARK = 'dark';
const SET_THEME_SCRIPT = `document.documentElement.setAttribute('${BLOG_THEME_ATTRIBUTE}','${BLOG_THEME_DARK}');`;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.setAttribute(BLOG_THEME_ATTRIBUTE, BLOG_THEME_DARK);
    return () => {
      document.documentElement.removeAttribute(BLOG_THEME_ATTRIBUTE);
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SET_THEME_SCRIPT }} />
      {children}
    </>
  );
};

export default BlogLayout;
