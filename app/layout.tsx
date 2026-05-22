import type { Metadata } from 'next';
import Script from 'next/script';

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

const STRIP_EXTENSION_ATTRIBUTES_SCRIPT = `
(function () {
  var ATTRS = ['bis_skin_checked', 'bis_register', '__processed_'];
  function strip(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      if (el.hasAttribute(ATTRS[i])) el.removeAttribute(ATTRS[i]);
    }
    var nodes = el.attributes;
    for (var j = nodes.length - 1; j >= 0; j--) {
      var name = nodes[j].name;
      if (name.indexOf('__processed_') === 0) el.removeAttribute(name);
    }
  }
  function scan() {
    var all = document.querySelectorAll('[bis_skin_checked],[bis_register]');
    for (var i = 0; i < all.length; i++) strip(all[i]);
  }
  scan();
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var target = mutations[i].target;
        if (target instanceof Element) strip(target);
      }
    }).observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'bis_register'],
    });
  }
})();
`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Script id="strip-extension-attributes" strategy="beforeInteractive">
          {STRIP_EXTENSION_ATTRIBUTES_SCRIPT}
        </Script>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout;
