import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for development to catch bugs early
  reactStrictMode: true,

  // Optimize images
  images: {
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security and performance headers
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        // Prevent clickjacking
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        // Prevent MIME type sniffing
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        // Enable XSS protection
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        // Referrer policy for privacy
        {
          key: "Referrer-Policy",
          value: "strict-no-referrer-when-downgrade",
        },
        // Content Security Policy (adjust if needed for external resources)
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
        },
      ],
    },
  ],

  // Redirects for old URLs (add as needed)
  redirects: async () => [],

  // Rewrites for internal routing (add as needed)
  rewrites: async () => [],

  // Environment variables validation
  env: {
    // Make sure NEXT_PUBLIC_SITE_URL is set (but it's client-side, so validate in code)
  },

  // Optimize for production
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Disable telemetry
  telemetry: false,
};

export default nextConfig;
