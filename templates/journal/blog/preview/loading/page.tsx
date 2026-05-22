import BlogListSkeleton from '../../_components/BlogListSkeleton';

export const metadata = {
  title: 'Preview — Blog list loading',
  robots: { index: false, follow: false },
};

const LoadingPreview = () => {
  return <BlogListSkeleton />;
};

export default LoadingPreview;
