import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  // access to environment variables in the client-side code
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.99:3000",
    "http://192.168.1.98:3000",
  ],

  images: {
    // to allow loading images from the Laravel backend's storage
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.99",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.98",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;