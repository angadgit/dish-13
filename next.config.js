/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // serverMiddleware: [
  //   // ... other middlewares
  //   './middlewares'
  // ]
}

module.exports = nextConfig
