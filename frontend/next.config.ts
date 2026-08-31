import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // host accessible from the frontend, e.g., localhost,
        port: "8000",   // laravel backend port
        pathname: "/storage/**", // path to uploaded files in Laravel
      },
    ],
  },
};

export default nextConfig;