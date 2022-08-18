/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
  // reactStrictMode: true,
  swcMinify: true,
  webpack(config, { webpack }) {
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      ...config.resolve,
    };
    return config;
  },
};
