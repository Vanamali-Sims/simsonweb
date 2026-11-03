/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // About now lives on the home page.
      { source: '/about', destination: '/#about', permanent: true },
    ];
  },
};

module.exports = nextConfig;
