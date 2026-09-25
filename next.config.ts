import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
