import ArticleSkeleton from '../../_components/ArticleSkeleton';

export const metadata = {
  title: 'Preview — Article loading',
  robots: { index: false, follow: false },
};

const ArticleLoadingPreview = () => {
  return <ArticleSkeleton />;
};

export default ArticleLoadingPreview;
