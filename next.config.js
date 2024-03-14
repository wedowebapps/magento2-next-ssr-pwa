/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: process.env.GRAPHQL_URL,
      },
    ];
  },
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    FBPIXEL_TRACK_ID: process.env.FBPIXEL_TRACK_ID,
    ENABLE_FACEBOOK_TRACKING: process.env.ENABLE_FACEBOOK_TRACKING,
    PAYPAL_RETURN_URL: process.env.PAYPAL_RETURN_URL,
    PAYPAL_CANCEL_URL: process.env.PAYPAL_CANCEL_URL,
  },
  images: {
    domains: [
      "daisyui.com",
      "i.postimg.cc",
      "rukminim2.flixcart.com",
      "m.media-amazon.com",
      "wedocommerce.wedowebapps.com",
    ],
  },
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "graphql-tag/loader",
        },
      ],
    });

    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

module.exports = withPWA(nextConfig);
