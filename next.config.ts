import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Standalone: Docker image kecil + cold start cepat di EasyPanel
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache hasil optimasi gambar 30 hari
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        // Aset statis (logo, foto, partner) jarang berubah — cache agresif
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/blog/blogimg/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    // URL blog lama (site statis) → artikel baru, jaga backlink & index lama
    return [
      {
        source: "/blog/rancabangohotel.html",
        destination: "/blog/rancabango-hotel-strategi-low-season",
        permanent: true,
      },
      {
        source: "/blog/studikasusbalongaja.html",
        destination: "/blog/balong-aja-menangkap-market-wisata-lewat-bercerita",
        permanent: true,
      },
      {
        source: "/blog/studirestorasa.html",
        destination: "/blog/photography-storytelling-konten-fnb",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
