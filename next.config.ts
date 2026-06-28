import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export → Cloudflare Pages (out/). Tanpa server: next/image
  // optimizer mati, jadi serve original (Cloudflare CDN/Polish yang handle).
  output: "export",
  images: {
    unoptimized: true,
  },
  // headers() & redirects() tidak jalan di static export — dipindah ke
  // public/_headers dan public/_redirects (native Cloudflare Pages).
};

export default nextConfig;
