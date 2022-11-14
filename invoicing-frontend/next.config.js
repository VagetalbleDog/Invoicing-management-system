/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites(){
    return [
      { source: '/api/:path*', destination: `http://127.0.0.1:4000/:path*` }
    ]
  }
}

module.exports = nextConfig
