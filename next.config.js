const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
      config.resolve.alias['@styles'] = path.join(__dirname, 'src', 'styles');
    }
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  transpilePackages: ['@rainbow-me']
};

module.exports = nextConfig;
