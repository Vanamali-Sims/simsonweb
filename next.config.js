/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // About now lives on the home page.
      { source: '/about', destination: '/#about', permanent: true },
      // v1 routes that only ever redirected.
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/story', destination: '/#about', permanent: true },
      { source: '/my-story', destination: '/#about', permanent: true },
      // Old CV links (the v1 file was corrupted).
      { source: '/Vanamali_Resume.pdf', destination: '/Vanamali_Sims_Resume.pdf', permanent: true },
    ];
  },
};

module.exports = nextConfig;
