import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'ceullkuvmxvkhwpjayfp.supabase.co',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
