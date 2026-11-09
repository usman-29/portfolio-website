import type { NextConfig } from "next";

// Static export: `next build` writes a plain `out/` folder that any free static
// host can serve (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
