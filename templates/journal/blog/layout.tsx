import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  return <div className="min-h-screen bg-white">{children}</div>;
};

export default BlogLayout;
