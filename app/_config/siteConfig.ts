export type SiteNavLink = {
  label: string;
  href: string;
};

export type SiteSocialLinks = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  email?: string;
};

export type SiteConfig = {
  brandName: string;
  brandTagline?: string;
  logoUrl?: string;
  homeUrl: string;
  navLinks: SiteNavLink[];
  socialLinks: SiteSocialLinks;
  footerCopyrightHolder: string;
};

export const siteConfig: SiteConfig = {
  brandName: 'Your Brand',
  brandTagline: 'AI-powered content for teams that need to ship.',
  logoUrl: undefined,
  homeUrl: '/',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
  socialLinks: {
    twitter: 'https://twitter.com/yourbrand',
    linkedin: 'https://www.linkedin.com/company/yourbrand',
    github: undefined,
    email: 'hello@yourbrand.com',
  },
  footerCopyrightHolder: 'Your Brand',
};
