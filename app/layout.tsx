import type { Metadata } from 'next';

import SiteFooter from './_components/SiteFooter';
import SiteHeader from './_components/SiteHeader';
import { siteConfig } from './_config/siteConfig';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} Blog`,
    template: `%s | ${siteConfig.brandName} Blog`,
  },
  description: siteConfig.brandTagline || 'Articles and guides.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout;
