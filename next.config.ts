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
    qualities: [30, 70, 60, 50],
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      new URL("https://cdnjs.cloudflare.com/**"),
      new URL("https://picsum.photos/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://res.cloudinary.com/**"),
    ],
  },
};

export default nextConfig;
