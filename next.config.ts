import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/graphql-proxy",
  //       destination: process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT"] || "",
  //     },
  //   ];
  // },
  images: {
    qualities: [30, 70, 60, 50, 90, 80, 40],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Permite cualquier ruta dentro de este host
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "inmob-api.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdnjs.cloudflare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c139c5c539084222741458a4ac5bed40.r2.cloudflarestorage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-729846b41cde489ea4510ce9369c4ca9.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
