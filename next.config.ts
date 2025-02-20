import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/vehicles",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ev-database.org",
        pathname: "/img/auto/**",
      },
    ],
  },
  // Recommended: this will reduce output
  // Docker image size by 80%+
  output: "standalone",
};

export default nextConfig;
