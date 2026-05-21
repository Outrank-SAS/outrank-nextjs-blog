import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview — Error state',
  robots: { index: false, follow: false },
};

const PREVIEW_ERROR_MESSAGE = 'Preview error: this page intentionally throws to trigger the blog error UI.';

const ErrorPreview = () => {
  throw new Error(PREVIEW_ERROR_MESSAGE);
};

export default ErrorPreview;
