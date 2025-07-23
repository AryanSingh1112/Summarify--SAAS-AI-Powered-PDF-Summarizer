/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server external packages (formerly experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['@google/generative-ai', '@langchain/community', '@langchain/core'],
  
  // Image optimization
  images: {
    domains: ['sleek-tiger-252.convex.cloud', 'img.clerk.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Webpack optimization for deployment
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Handle external modules properly
    config.externals = [...(config.externals || []), 'canvas', 'jsdom'];
    
    return config;
  },
  
  // Security headers
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
