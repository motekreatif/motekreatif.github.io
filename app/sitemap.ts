import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Wajib untuk output: export — sitemap di-generate sekali saat build.
export const dynamic = "force-static";

// Okt 2026: daftar halaman web baru (public/, dibangkitkan dari build.py di WEB EKOSISTEM 2026/web)
// + Clipper. Halaman lama yang diarsipkan (about, blog, case-studies, community, contact, products) sengaja tidak dimasukkan.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/creativeagency/corporate-training", priority: 0.6 },
    { path: "/creativeagency/", priority: 0.8 },
    { path: "/tentang/", priority: 0.7 },
    { path: "/creativeagency/kasus-balong", priority: 0.6 },
    { path: "/creativeagency/layanan", priority: 0.6 },
    { path: "/", priority: 1 },
    { path: "/kelasmote/belajar", priority: 0.6 },
    { path: "/kelasmote/brand-warung", priority: 0.6 },
    { path: "/kelasmote/brief-satu-halaman", priority: 0.6 },
    { path: "/kelasmote/checkout", priority: 0.6 },
    { path: "/kelasmote/deskripsi-produk", priority: 0.6 },
    { path: "/kelasmote/foto-produk-hp", priority: 0.6 },
    { path: "/kelasmote/ig-30-hari", priority: 0.6 },
    { path: "/kelasmote/iklan-meta-50rb", priority: 0.6 },
    { path: "/kelasmote/", priority: 0.8 },
    { path: "/kelasmote/kelasku", priority: 0.6 },
    { path: "/kelasmote/keranjang", priority: 0.6 },
    { path: "/kelasmote/laporan-iklan", priority: 0.6 },
    { path: "/kelasmote/paket-freelancer", priority: 0.6 },
    { path: "/kelasmote/paket-iklan-pertama", priority: 0.6 },
    { path: "/kelasmote/portofolio", priority: 0.6 },
    { path: "/kelasmote/rate-card", priority: 0.6 },
    { path: "/kelasmote/rebranding", priority: 0.6 },
    { path: "/kelasmote/tim-kreatif-pertama", priority: 0.6 },
    { path: "/kelasmote/toko-shopee", priority: 0.6 },
    { path: "/mtgoods/bag-charm", priority: 0.6 },
    { path: "/mtgoods/checkout", priority: 0.6 },
    { path: "/mtgoods/habit-tracker", priority: 0.6 },
    { path: "/mtgoods/", priority: 0.8 },
    { path: "/mtgoods/journaling-book", priority: 0.6 },
    { path: "/mtgoods/keranjang", priority: 0.6 },
    { path: "/mtgoods/kita-kita-aja", priority: 0.6 },
    { path: "/mtgoods/notes", priority: 0.6 },
    { path: "/mtgoods/organizer", priority: 0.6 },
    { path: "/mtgoods/pesanan", priority: 0.6 },
    { path: "/mtgoods/pouch", priority: 0.6 },
    { path: "/mtgoods/tumbler", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.8 },
    { path: "/refund-policy", priority: 0.8 },
    { path: "/terms", priority: 0.8 },
    { path: "/products/clipper", priority: 0.6 },
    { path: "/products/clipper/setup", priority: 0.6 },
    { path: "/products/clipper/setup/windows", priority: 0.6 },
    { path: "/products/clipper/setup/mac", priority: 0.6 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    priority,
  }));
}
