import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["nyc.cloud.appwrite.io"], // ✅ Add your Supabase domain here
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
