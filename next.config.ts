import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
// next.config.js
module.exports = {
  images: {
    domains: ['localhost', 'ceullkuvmxvkhwpjayfp.supabase.co','lh3.googleusercontent.com'],
  },
};

export default nextConfig;
