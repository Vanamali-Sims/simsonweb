/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gifdb.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gifdb.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
    ],
  },
}

module.exports = nextConfig 