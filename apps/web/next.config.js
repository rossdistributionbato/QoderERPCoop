/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for static hosting
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  images: {
    domains: ['rwwubiimzkxmeqpwtsjn.supabase.co'],
    unoptimized: true, // Required for static export
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  // Note: headers() and other server features removed for static export
  // PWA Configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;