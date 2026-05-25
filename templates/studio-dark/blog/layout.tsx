import BlogThemeManager from './_components/BlogThemeManager';

const BLOG_THEME_ATTRIBUTE = 'data-blog-theme';
const BLOG_THEME_DARK = 'dark';
const SET_THEME_SCRIPT = `document.documentElement.setAttribute('${BLOG_THEME_ATTRIBUTE}','${BLOG_THEME_DARK}');`;

type Props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: Props) => {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SET_THEME_SCRIPT }} />
      <BlogThemeManager />
      {children}
    </>
  );
};

export default BlogLayout;
