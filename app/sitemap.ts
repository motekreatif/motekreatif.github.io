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
    { path: "/kelasmote/", priority: 0.8 },
    { path: "/kelasmote/skill-tersembunyi", priority: 0.7 },
    { path: "/kelasmote/multimedia-career-path", priority: 0.7 },
    { path: "/kelasmote/iklan-boncos-atau-salah-ukur", priority: 0.7 },
    { path: "/kelasmote/belajar-cara-biar-kita-gak-bodoh", priority: 0.7 },
    { path: "/kelasmote/cara-menjadi-profesional", priority: 0.7 },
    { path: "/kelasmote/memahami-marketing-dari-akarnya", priority: 0.7 },
    { path: "/kelasmote/terjebak-di-agency", priority: 0.7 },
    { path: "/kelasmote/jangan-jadi-desainer-grafis", priority: 0.7 },
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
