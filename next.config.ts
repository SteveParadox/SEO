import type { NextConfig } from "next";

const adSenseOrigins = [
  "https://pagead2.googlesyndication.com",
  "https://tpc.googlesyndication.com",
  "https://securepubads.g.doubleclick.net",
  "https://googleads.g.doubleclick.net",
  "https://www.googletagservices.com",
  "https://adservice.google.com",
  "https://www.google.com",
  "https://www.gstatic.com",
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
  "https://fundingchoicesmessages.google.com",
];

const adSenseFrameOrigins = [
  "https://googleads.g.doubleclick.net",
  "https://tpc.googlesyndication.com",
  "https://www.google.com",
  "https://fundingchoicesmessages.google.com",
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
];

const thirdPartyAdScriptOrigins = ["https://quge5.com"];

const scriptSourcePolicy = `script-src 'self' 'unsafe-inline'${
  process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"
} ${[...adSenseOrigins, ...thirdPartyAdScriptOrigins].join(" ")}`;

const contentSecurityPolicy = [
  "default-src 'self'",
  scriptSourcePolicy,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${adSenseOrigins.join(" ")}`,
  `frame-src 'self' ${adSenseFrameOrigins.join(" ")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

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
          value: `${contentSecurityPolicy};`,
        },
      ],
    },
  ],

  // Consolidate the public hostname and preserve legacy URL redirects.
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www\\.xavkit\\.com" }],
      destination: "https://xavkit.com/:path*",
      permanent: true,
    },
    { source: "/prompts/prompts", destination: "/prompts", permanent: true },
    { source: "/prompts/prompts/:slug", destination: "/prompts/:slug", permanent: true },
  ],

  // Rewrites for internal routing (add as needed)
  rewrites: async () => [],

  // Environment variables validation
  env: {
    // Make sure NEXT_PUBLIC_SITE_URL is set (but it's client-side, so validate in code)
  },

  // Production optimizations (swcMinify is now the default behavior)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
