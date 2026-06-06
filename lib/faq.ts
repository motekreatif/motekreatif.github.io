import { SITE } from "./constants";

export type FAQItem = {
  question: string;
  answer: string;
};

export const SERVICES_FAQ: FAQItem[] = [
  {
    question: "Apa saja layanan Mote Kreatif?",
    answer:
      "Mote Kreatif punya lima layanan inti: Digital Marketing Full (Meta Ads, Google Ads, marketplace optimization end-to-end), Social Media & Marketplace Optimization (Instagram, TikTok, Shopee, TikTok Shop), TDMO (program 6 bulan membangun tim marketing internal), Brand Growth (identity & positioning), dan Campaign Activation (product launch, KOL, event).",
  },
  {
    question: "Berapa biaya jasa digital marketing agency di Mote Kreatif?",
    answer:
      "Biaya disesuaikan dengan scope, channel, dan target bisnis kamu — tidak ada paket pukul rata karena setiap brand punya konteks berbeda. Mulai dari diskusi gratis 60 menit: kami review kondisi bisnis kamu dulu, baru susun proposal dengan investasi yang rasional terhadap proyeksi revenue.",
  },
  {
    question: "Apakah Mote Kreatif hanya melayani bisnis di Garut?",
    answer:
      "Tidak. Mote Kreatif berbasis di Garut, Jawa Barat, dengan layanan on-site untuk area Garut–Bandung, dan melayani klien di seluruh Indonesia secara remote untuk Meta Ads, CPAS Shopee, TikTok Shop Ads, dan marketplace optimization.",
  },
  {
    question: "Apa itu CPAS Shopee dan kenapa penting?",
    answer:
      "CPAS (Collaborative Performance Advertising Solution) adalah format iklan Meta yang terhubung langsung ke katalog Shopee — iklan di Facebook/Instagram mengarah langsung ke produk di toko Shopee kamu, dengan tracking konversi penuh. Untuk brand yang jualan di Shopee, CPAS biasanya menghasilkan ROAS jauh lebih tinggi dari iklan biasa. Mote Kreatif pernah mencapai ROAS 20.8x untuk klien fashion lewat CPAS Shopee.",
  },
  {
    question: "Berapa lama sampai terlihat hasil dari Meta Ads?",
    answer:
      "Fase learning biasanya 2–4 minggu untuk data awal yang reliable. Optimasi berbasis data berjalan tiap minggu, dan hasil signifikan umumnya terlihat dalam 1–3 bulan tergantung budget, produk, dan kesiapan funnel. Kami laporkan performa tiap bulan dengan insight yang bisa kamu verifikasi sendiri.",
  },
  {
    question: "Apa bedanya Mote Kreatif dengan agency digital marketing lain?",
    answer:
      "Tiga hal: (1) hasil terukur yang diverifikasi angka — ROAS 20.8x, omset +77%, leads +300% di case studies kami; (2) TDMO — kami satu-satunya yang menawarkan program membangun tim marketing internal kamu sampai mandiri, bukan bikin kamu tergantung agency; (3) berbasis Garut dengan standar kerja Jakarta — biaya lebih rasional tanpa kompromi kualitas.",
  },
];

export const TDMO_FAQ: FAQItem[] = [
  {
    question: "Apa itu TDMO?",
    answer:
      "TDMO (Team Development & Marketing Optimization) adalah program kemitraan 6 bulan dari Mote Kreatif untuk owner bisnis yang ingin membangun tim marketing internal yang mandiri. Tim MOTE hadir on-site setiap minggu untuk transfer knowledge: strategic thinking, KPI framework, financial projection, sampai AI CRM automation. Di akhir program, tim kamu jalan sendiri.",
  },
  {
    question: "Berapa lama program TDMO berjalan?",
    answer:
      "6 bulan terstruktur: bulan 1–2 MOTE handle eksekusi sambil transfer knowledge, bulan 3–4 AI CRM go-live dan tim kamu mulai lead execution, bulan 5–6 tim kamu handle 90% mandiri lalu graduation dengan handover lengkap dan dokumentasi SOP.",
  },
  {
    question: "Berapa investasi program TDMO?",
    answer:
      "Investasi disesuaikan dengan ukuran tim, kompleksitas bisnis, dan scope channel. Prosesnya mulai dari discovery call gratis 60 menit — kami review kondisi bisnis dan tim kamu dulu. Kalau fit, kami susun proposal dengan financial projection yang rasional. Kalau tidak fit, kami jujur bilang.",
  },
  {
    question: "Bisnis seperti apa yang cocok untuk TDMO?",
    answer:
      "TDMO paling cocok untuk owner bisnis yang sudah punya (atau siap hire) tim marketing internal tapi timnya hanya bisa eksekusi tanpa strategi, tidak ada KPI yang jelas, dan marketing belum terhubung ke revenue. Track record kami terkuat di F&B, hospitality (hotel, glamping), dan retail di area Garut–Bandung.",
  },
  {
    question: "Apa yang terjadi setelah program TDMO selesai?",
    answer:
      "Tim kamu graduation: handle marketing secara mandiri dengan SOP terdokumentasi, KPI framework terinstal, dan AI CRM yang berjalan otomatis. Contoh nyata: tim marketing Home of BEN sekarang 100% mandiri menghandle konten dan aktivasi tanpa MOTE.",
  },
  {
    question: "Apakah mentoring TDMO dilakukan remote atau on-site?",
    answer:
      "On-site setiap minggu di tempat kamu — bukan Zoom call yang gampang dibatalkan. Kehadiran fisik adalah bentuk akuntabilitas kami. Karena berbasis di Garut, area jangkauan utama weekly visit adalah Garut–Bandung dan sekitarnya.",
  },
];

export function buildFaqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    serviceType: input.serviceType,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "Indonesia" },
  };
}
