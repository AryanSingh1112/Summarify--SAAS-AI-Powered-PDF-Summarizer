/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production
  swcMinify: true,
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  
  // Image optimization
  images: {
    domains: ['sleek-tiger-252.convex.cloud', 'img.clerk.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables validation
  env: {
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
