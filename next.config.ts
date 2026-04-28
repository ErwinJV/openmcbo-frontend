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
      // Agrega aquí los demás si los necesitas siguiendo el mismo formato
    ],
  },
};

export default nextConfig;
