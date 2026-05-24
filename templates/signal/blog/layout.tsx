'use client';

import { useEffect } from 'react';

const BLOG_THEME_ATTRIBUTE = 'data-blog-theme';
const BLOG_THEME_DARK = 'dark';

type Props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  useEffect(() => {
    document.documentElement.setAttribute(BLOG_THEME_ATTRIBUTE, BLOG_THEME_DARK);
    return () => {
      document.documentElement.removeAttribute(BLOG_THEME_ATTRIBUTE);
    };
  }, []);

  return <>{children}</>;
};

export default BlogLayout;
