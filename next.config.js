const path = require('path');

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  transpilePackages: ['outrank-next-js-blog'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
