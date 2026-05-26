import BlogThemeManager from './_components/BlogThemeManager';

type Props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  return (
    <>
      <BlogThemeManager />
      {children}
    </>
  );
};

export default BlogLayout;
