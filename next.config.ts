import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  serverExternalPackages: ["axios"],

  experimental: {
    optimizePackageImports: ["@splidejs/react-splide", "sweetalert2", "react-select", "react-modal"],
    scrollRestoration: true,
    optimizeServerReact: true,
  },

  images: {
    minimumCacheTTL: 31536000, // 1 year
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },

  // Output optimizations
  output: "standalone",

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
