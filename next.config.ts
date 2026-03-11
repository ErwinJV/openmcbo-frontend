import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/graphql-proxy",
        destination: process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT"] || "",
      },
    ];
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdnjs.cloudflare.com",
      "picsum.photos",
      "",
    ],
    remotePatterns: [
      {
        protocol: "http", // Use 'https' if your local server supports it
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**", // The double asterisk includes all subdirectories
      },
    ],
  },
};

export default nextConfig;
