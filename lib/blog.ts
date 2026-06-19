export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cover?: string;
  datePublished: string;
  relatedCaseStudy?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "wa-blast-panduan-lengkap",
    title:
      "WA Blast: Panduan Lengkap 2026 — Cara Kirim WhatsApp Massal yang Aman, Gratis, Tanpa Diblokir",
    description:
      "Panduan lengkap WA blast untuk bisnis 2026: cara kerja, aturan anti-blokir, pilih tool gratis vs berbayar, blast dari Google Sheets, sampai beda WA blast vs WhatsApp API. Semua yang perlu kamu tahu sebelum kirim pesan massal.",
    category: "Panduan · WhatsApp Blast",
    datePublished: "2026-06-19",
  },
  {
    slug: "cara-blast-wa-tanpa-diblokir",
    title:
      "Cara Blast WA Tanpa Diblokir: 8 Aturan Main yang Sering Diabaikan (2026)",
    description:
      "Kenapa nomor WhatsApp kena banned saat blast, dan 8 aturan praktis biar pesan massal kamu aman: jeda antar pesan, warming up nomor, isi pesan, batas harian. Plus kenapa 'aplikasi anti-blokir' bukan jaminan.",
    category: "Panduan · WhatsApp Blast",
    datePublished: "2026-06-19",
  },
  {
    slug: "wa-blast-google-sheets",
    title:
      "Cara WA Blast Langsung dari Google Sheets (Tanpa Copy-Paste Manual)",
    description:
      "Tutorial WA blast pakai Google Sheets: siapkan kolom kontak, import ke tool blast, pakai variabel personalisasi seperti nama, sampai catat balasan chat otomatis balik ke Sheets. Cocok kalau data pelanggan kamu sudah di spreadsheet.",
    category: "Panduan · WhatsApp Blast",
    datePublished: "2026-06-19",
  },
  {
    slug: "wa-blast-vs-whatsapp-api",
    title:
      "WA Blast vs WhatsApp Business API: Mana yang Cocok untuk Bisnis Kamu?",
    description:
      "Perbandingan jujur WA blast (aplikasi) vs WhatsApp Business API resmi: biaya, kecepatan setup, risiko blokir, batas pesan, dan template approval. Plus rekomendasi pilih yang mana sesuai skala bisnis kamu.",
    category: "Panduan · WhatsApp Blast",
    datePublished: "2026-06-19",
  },
  {
    slug: "aplikasi-wa-blast-gratis",
    title:
      "5 Aplikasi WA Blast Gratis Terbaik 2026 (dan Cara Pilih yang Aman)",
    description:
      "Daftar aplikasi WA blast gratis 2026 plus kriteria memilih yang aman dari blokir: fitur jeda otomatis, batas pesan harian, import kontak, dan kejujuran soal 'gratis' yang sebenarnya berbayar.",
    category: "Panduan · WhatsApp Blast",
    datePublished: "2026-06-19",
  },
  {
    slug: "100-buku-self-development-bisnis",
    title:
      "100 Buku Self Development & Bisnis Terbaik yang Wajib Kamu Baca (Kurasi Mote)",
    description:
      "Daftar 100 buku self-development dan bisnis pilihan — dari Atomic Habits sampai Filosofi Teras. Dikurasi tim Mote Kreatif untuk menata mindset, finansial, dan produktivitas. Tinggal klik, langsung beli di Shopee.",
    category: "Rekomendasi · Buku",
    datePublished: "2026-06-11",
  },
  {
    slug: "strategi-tiktok-shop-umkm",
    title:
      "Strategi TikTok Shop untuk UMKM 2026: Dari Setup Toko sampai Live Commerce",
    description:
      "Panduan lengkap jualan di TikTok Shop untuk UMKM: setup toko, konten yang menjual, TikTok Shop Ads, affiliate, dan live commerce — disusun dari pengalaman mengelola marketplace brand lokal.",
    category: "Panduan · Marketplace Ads",
    datePublished: "2026-06-06",
  },
  {
    slug: "digital-marketing-hotel-resort",
    title:
      "Digital Marketing untuk Hotel & Resort: Panduan Lengkap dari Kasus Nyata",
    description:
      "Strategi digital marketing hotel yang terbukti: positioning, Google Hotel Ads + local SEO, konten yang menjual kamar, dan KPI per funnel — dari kasus nyata occupancy 43% → 61% dan omset +77% di low season.",
    category: "Panduan · Hospitality",
    datePublished: "2026-06-06",
    relatedCaseStudy: "rancabango-hotel",
  },
  {
    slug: "biaya-jasa-digital-marketing-indonesia",
    title:
      "Berapa Biaya Jasa Digital Marketing di Indonesia? Panduan Lengkap 2026",
    description:
      "Rincian biaya jasa digital marketing di Indonesia 2026: social media management, Meta Ads, marketplace optimization, sampai program pengembangan tim. Plus cara menghitung budget yang masuk akal untuk bisnis kamu.",
    category: "Panduan · Biaya",
    datePublished: "2026-06-06",
  },
  {
    slug: "apa-itu-cpas-shopee",
    title:
      "Apa Itu CPAS Shopee? Cara Kerja, Syarat, dan Kenapa ROAS-nya Bisa Jauh Lebih Tinggi",
    description:
      "CPAS (Collaborative Performance Advertising Solution) menghubungkan katalog Shopee langsung ke Meta Ads dengan tracking konversi penuh. Panduan lengkap cara kerja, syarat, dan studi kasus ROAS 20.8x.",
    category: "Panduan · Marketplace Ads",
    datePublished: "2026-06-06",
    relatedCaseStudy: "hanoon-industries",
  },
  {
    slug: "cara-memilih-digital-marketing-agency",
    title:
      "Cara Memilih Digital Marketing Agency: 7 Kriteria yang Harus Kamu Cek Sebelum Tanda Tangan",
    description:
      "Checklist memilih digital marketing agency di Indonesia: dari bukti hasil terukur, transparansi reporting, sampai red flags yang harus dihindari. Disusun dari pengalaman menangani 20+ brand.",
    category: "Panduan · Agency",
    datePublished: "2026-06-06",
  },
  {
    slug: "agency-vs-tim-marketing-inhouse",
    title:
      "Agency vs Tim Marketing In-House: Mana yang Tepat untuk Bisnis Kamu?",
    description:
      "Perbandingan jujur agency vs in-house marketing team: biaya, kecepatan, kontrol, dan skill. Plus opsi ketiga yang jarang dibahas — membangun tim internal dengan pendampingan agency (model TDMO).",
    category: "Panduan · Strategi",
    datePublished: "2026-06-06",
  },
  {
    slug: "rancabango-hotel-strategi-low-season",
    title:
      'Rancabango Hotel: Strategi "A Place To Be Present" untuk Menang di Low Season',
    description:
      "Bagaimana positioning yang tajam, local SEO + Google Hotel Ads, dan enam pilar konten membawa Rancabango Hotel menang di low season — occupancy 61% dengan marketing cost ratio 0.44%.",
    category: "Studi Kasus · Hospitality",
    cover: "/blog/blogimg/rancabango/rancabango1.webp",
    datePublished: "2025-07-15",
    relatedCaseStudy: "rancabango-hotel",
  },
  {
    slug: "balong-aja-menangkap-market-wisata-lewat-bercerita",
    title:
      'Bagaimana "Sebuah Danau di Garut" Menangkap Potensi Market Wisata Lewat Bercerita',
    description:
      "Studi kasus Balong Aja Cafe (Q2 2025): value creation sesi pagi, narasi #JedaDiBalongAja, dan distribusi channel — hingga transaksi naik dari 1.085 ke 2.112 dan revenue tembus 34,5% di atas target.",
    category: "Studi Kasus · F&B",
    cover: "/blog/blogimg/studikasusbalong0.webp",
    datePublished: "2025-08-10",
  },
  {
    slug: "photography-storytelling-konten-fnb",
    title:
      'Kapan Terakhir Kali Kamu Tersihir oleh Sebuah Foto? Rahasia Photography Storytelling untuk Konten F&B yang "Punya Nyawa"',
    description:
      "Dari studi kasus Restorasa: framework photography storytelling tiga lapis (visual → cerita → rasa) yang mengubah konten F&B dari sekadar foto menu menjadi pengalaman yang menggerakkan.",
    category: "Insight · Content Strategy",
    cover: "/blog/blogimg/restorasa/photography-storytelling.webp",
    datePublished: "2025-09-05",
    relatedCaseStudy: "restorasa",
  },
];
