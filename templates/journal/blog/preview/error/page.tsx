export const metadata = {
  title: 'Preview — Error state',
  robots: { index: false, follow: false },
};

const ErrorPreview = () => {
  throw new Error('Triggered error from /blog/preview/error to render the error.tsx boundary.');
};

export default ErrorPreview;
