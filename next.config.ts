import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],

  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
