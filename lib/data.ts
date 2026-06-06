import {
  Megaphone,
  Share2,
  Users,
  Sparkles,
  Rocket,
  ShoppingBag,
  GraduationCap,
  Palette,
  MessageCircle,
  Wallet,
  Calculator,
  Camera,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type Objective = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  featured?: boolean;
};

export const OBJECTIVES: Objective[] = [
  {
    icon: Rocket,
    title: "Scale Penjualan Online",
    description:
      "Meta Ads, CPAS Shopee, TikTok Shop Ads — kami manage end-to-end dari strategi sampai optimasi harian.",
  },
  {
    icon: ShoppingBag,
    title: "Optimasi Marketplace",
    description:
      "Optimasi toko, konten produk, pricing strategy, review management. Bukan cuma buka toko — tapi bikin toko yang menghasilkan.",
  },
  {
    icon: GraduationCap,
    title: "Bangun Tim Marketing",
    description:
      "TDMO — program 6 bulan membangun kapabilitas tim marketing internal kamu dari nol sampai mandiri.",
    href: "/tdmo",
    featured: true,
  },
  {
    icon: Palette,
    title: "Brand Identity & Growth",
    description:
      "Positioning, visual identity, brand voice yang konsisten di semua channel. Fondasi sebelum scale.",
  },
];

export type Service = {
  code: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  featured?: boolean;
  href?: string;
};

export const SERVICES: Service[] = [
  {
    code: "DM",
    title: "Digital Marketing Full",
    short: "Partner digital marketing end-to-end untuk brand yang serius scale.",
    description:
      "Strategi digital menyeluruh: Meta Ads, Google Ads, marketplace optimization, content strategy, dan analytics. Untuk brand yang butuh partner digital marketing end-to-end—bukan eksekutor lepas.",
    benefits: [
      "Strategi funnel & channel planning",
      "Meta Ads + Google Ads management",
      "Marketplace optimization (Shopee, TikTok Shop)",
      "Monthly performance report & insight",
    ],
    icon: Megaphone,
  },
  {
    code: "SMMO",
    title: "Social Media & Marketplace Optimization",
    short: "Optimasi presence di Instagram, TikTok, Shopee, & TikTok Shop.",
    description:
      "Konten yang punya jiwa, engagement yang real, dan strategi organik + paid yang terintegrasi. Kami bantu kamu hadir di mana audiens kamu scroll.",
    benefits: [
      "Content pillar & calendar bulanan",
      "Short video & static design",
      "Community management & engagement",
      "Marketplace listing & live commerce",
    ],
    icon: Share2,
  },
  {
    code: "TDMO",
    title: "Team Development & Marketing Optimization",
    short:
      "Program kemitraan 6 bulan untuk owner bisnis yang ingin membangun tim marketing internal.",
    description:
      "Bukan agency yang ngerjain semua. TDMO membangun kapabilitas tim kamu—dari strategic thinking, KPI framework, sampai sistem reporting yang otomatis. Di akhir program, tim kamu mandiri.",
    benefits: [
      "Weekly on-site mentoring 6 bulan",
      "KPI framework & financial projection",
      "AI CRM automation untuk database",
      "Graduation: tim kamu jalan sendiri",
    ],
    icon: Users,
    featured: true,
    href: "/tdmo",
  },
  {
    code: "BG",
    title: "Brand Growth",
    short:
      "Brand identity, positioning, dan strategi pertumbuhan jangka panjang.",
    description:
      "Dari visual identity sampai brand voice yang konsisten. Kami bantu brand kamu punya wajah dan suara yang khas—dan tahu kapan harus pakai yang mana.",
    benefits: [
      "Brand audit & positioning workshop",
      "Visual identity & guideline",
      "Tone of voice & messaging system",
      "Roadmap brand growth 12 bulan",
    ],
    icon: Sparkles,
  },
  {
    code: "CA",
    title: "Campaign Activation",
    short:
      "Eksekusi kampanye spesifik: product launch, seasonal, KOL, event.",
    description:
      "Untuk momen yang harus tepat sasaran: product launch, kampanye musiman, KOL collaboration, atau event activation. Fokus ke impact dan ROI yang terukur.",
    benefits: [
      "Campaign concept & creative direction",
      "KOL discovery & negotiation",
      "Event activation & on-ground",
      "Performance tracking & post-mortem",
    ],
    icon: Rocket,
  },
];

export type Product = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: "Live" | "Coming Soon";
  url: string;
  icon: LucideIcon;
  price?: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Mote Blaster",
    tagline: "WhatsApp CRM SaaS untuk bisnis yang serius kelola pelanggan.",
    description:
      "Kelola percakapan WhatsApp bisnis kamu: chat recording, broadcast, database kontak, dan AI agent—semua dalam satu dashboard.",
    features: [
      "Chat recording & multi-agent inbox",
      "Broadcast & template otomatis",
      "Database kontak tersegmentasi",
      "AI agent untuk auto-reply",
    ],
    status: "Live",
    url: "https://blaster.motekreatif.com",
    icon: MessageCircle,
    price: "Rp 99k/bulan",
  },
  {
    name: "Modal Tekun",
    tagline: "PWA keuangan pribadi dan keluarga, dibuat Mengelola keuangan lebih mudah.",
    description:
      "Catat keuangan keluarga dengan cara yang sederhana. Terintegrasi Google Sheets, mobile-first, dan didesain agar siapa pun di rumah bisa pakai.",
    features: [
      "Mobile-first PWA, install langsung",
      "Sync ke Google Sheets",
      "Multi-akun anggota keluarga",
      "Kategori otomatis & laporan bulanan",
    ],
    status: "Live",
    url: "https://mt.motekreatif.com",
    icon: Wallet,
  },
  {
    name: "Klir",
    tagline: "Akuntansi yang dibuat simple untuk UMKM.",
    description:
      "Pembukuan dan laporan keuangan otomatis. Multi-workspace untuk pemilik beberapa unit bisnis. Tanpa istilah akuntansi yang bikin pusing.",
    features: [
      "Pembukuan otomatis dari transaksi",
      "Laporan L/R, neraca, cashflow",
      "Multi-workspace per unit bisnis",
      "Export ke PDF & Excel",
    ],
    status: "Live",
    url: "https://klir.motekreatif.com",
    icon: Calculator,
    price: "Rp 49k/bulan",
  },
  {
    name: "Mote Capture",
    tagline: "Photobooth digital via web browser.",
    description:
      "Solusi photobooth untuk event, wedding, dan brand activation: foto, composite layout, sampai print—semua jalan di browser.",
    features: [
      "Foto langsung dari browser",
      "Custom layout & frame brand",
      "Print otomatis ke printer event",
      "Cloud gallery untuk tamu",
    ],
    status: "Coming Soon",
    url: "https://capture.motekreatif.com",
    icon: Camera,
  },
  {
    name: "Mote LAB",
    tagline: "Marketplace research SaaS untuk Shopee & TikTok Shop.",
    description:
      "Riset produk, tracking harga kompetitor, dan deteksi trend di marketplace Indonesia—biar keputusan produk kamu berbasis data, bukan tebakan.",
    features: [
      "Tracking harga & stock kompetitor",
      "Analisis trend produk",
      "Keyword & kategori discovery",
      "Daily snapshot historis",
    ],
    status: "Coming Soon",
    url: "https://lab.motekreatif.com",
    icon: LineChart,
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  type: string;
  services: string[];
  result: string;
  resultDetails?: string[];
  logo?: string;
  featured?: boolean;
  // Narasi untuk halaman detail (challenge → approach → result)
  summary?: string;
  challenge?: string;
  approach?: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "rancabango-hotel",
    client: "Rancabango Hotel & Resort",
    type: "Hotel & Resort · Garut",
    services: ["Social Media", "Meta Ads", "Google Ads", "KOL", "Campaign"],
    result: "Omset Increase (+77%)",
    resultDetails: [
      "Omset Increase (+77%)",
      "Marketing cost ratio 0.44% (-86%)",
      "Occupancy rate 61% di periode low season",
    ],
    logo: "/img/partner/rancabangohotel.webp",
    featured: true,
    summary:
      "Strategi campaign \"A Place To Be Present\" membawa Rancabango Hotel & Resort menang di low season: omset naik 77% dengan marketing cost ratio hanya 0.44%.",
    challenge:
      "Occupancy baseline 2024 hanya di kisaran 43%, dengan 64% pendapatan bergantung pada list account korporat yang rentan kebijakan efisiensi. Positioning \"Balinese concept in Garut\" berisiko terasa kosmetik, visibilitas Google kalah dari kompetitor yang agresif beriklan, dan CTR TikTok hanya 0,03%.",
    approach: [
      "Re-positioning: menggeser \"Bali\" dari estetika menjadi aspirasi rasa lewat big idea campaign #APlaceToBePresent",
      "Funnel tiga tahap dengan peran channel yang jelas: ditemukan (Local SEO, Google Business Profile, Google Hotel Ads) → dikunjungi (konten direct ke kebutuhan pasar) → dipilih (penawaran kompetitif + trust layer review & UGC)",
      "Enam pilar konten bulanan — dari Stay & Soul sampai Kembali Bersama — dengan arah kreatif puitis yang membumi",
      "Aktivasi KOL & UGC untuk membangun proof, plus manajemen ulasan Google yang proaktif",
      "KPI per tahap funnel: impressions/reach → profile visit/CTR → inquiry/booking/occupancy",
    ],
  },
  {
    slug: "hanoon-industries",
    client: "Hanoon Industries",
    type: "Fashion / Apparel Workwear",
    services: ["CPAS Shopee", "Meta Ads"],
    result: "ROAS 20.8x (+116.89%)",
    resultDetails: [
      "ROAS 20.8x (+116.89%)",
      "Purchase value Increase (+157%)",
    ],
    logo: "/img/partner/hanoon.webp",
    featured: true,
    summary:
      "Kombinasi CPAS Shopee dan Meta Ads membawa brand apparel workwear ini mencapai ROAS 20.8x — naik 116.89% — dengan purchase value tumbuh 157%.",
    challenge:
      "Iklan yang berjalan belum terhubung langsung ke katalog marketplace, sehingga budget terbuang di traffic yang tidak terlacak konversinya. Brand butuh sistem iklan yang setiap rupiahnya bisa diukur sampai ke transaksi Shopee.",
    approach: [
      "Setup CPAS (Collaborative Performance Advertising Solution): menghubungkan katalog Shopee langsung ke Meta Ads dengan tracking konversi penuh",
      "Strukturisasi campaign berdasarkan funnel: prospecting untuk audiens baru, retargeting untuk pengunjung toko dan keranjang",
      "Testing kreatif terstruktur — angle produk, format, dan copy diuji per minggu berbasis data",
      "Optimasi harian pada budget allocation mengikuti performa ROAS per ad set",
    ],
  },
  {
    slug: "restorasa",
    client: "Restorasa",
    type: "F&B · Restoran",
    services: ["Social Media", "Meta Ads"],
    result: "Awareness Growth (+100%)",
    resultDetails: [
      "Awareness Growth (+100%)",
      "Engagement Growth (+100%)",
    ],
    logo: "/img/partner/restorasa.svg",
    featured: true,
    summary:
      "Photography storytelling mengubah konten Restorasa dari sekadar foto menu menjadi pengalaman yang \"punya nyawa\" — awareness dan engagement tumbuh 100%.",
    challenge:
      "Sebagai restoran fine dining yang memposisikan diri sebagai etalase pertumbuhan wisata kota Garut, Restorasa butuh konten yang menghantarkan pengalaman — bukan sekadar foto menu yang \"terlihat enak\" tapi berhenti di like.",
    approach: [
      "Photography storytelling tiga lapis: visual yang memikat → cerita yang menghantarkan rasa → emosi yang tersisa",
      "Tiga pilar pengalaman sebagai pilar konten: gastronomi (cerita rasa & asal-usul menu), ruang & ambience, budaya & konteks",
      "Framework rangkaian konten: rasa utama → momen hero → urutan cerita → caption sebagai pengantar rasa → CTA halus",
      "Human touch di setiap sesi: minimal 1 frame menu, 1 frame proses dapur, 1 frame momen manusia",
    ],
  },
  {
    slug: "popondok",
    client: "Popondok",
    type: "Glamping Camp",
    services: ["Social Media", "Meta Ads", "CRM Management"],
    result: "Increase in Leads (+300%)",
    resultDetails: [
      "Increase in Leads (+300%)",
      "Cost Per Lead (-Rp10.000)",
      "Engagement Growth (+100%)",
    ],
    logo: "/img/partner/popondok.svg",
    featured: true,
    summary:
      "Integrasi Meta Ads dengan CRM management membawa glamping camp ini tumbuh 300% di leads — dengan cost per lead turun Rp10.000.",
    challenge:
      "Inquiry masuk dari berbagai channel tapi tidak terkelola: leads bocor, follow-up lambat, dan tidak ada data untuk mengukur channel mana yang benar-benar menghasilkan booking.",
    approach: [
      "Meta Ads dengan objective leads yang diarahkan ke jalur inquiry WhatsApp yang terukur",
      "CRM management: setiap lead tercatat, tersegmentasi, dan ter-follow-up dengan SLA yang jelas",
      "Konten sosial media yang membangun keinginan eskapisme — kekuatan utama produk glamping",
      "Optimasi berkelanjutan pada audience targeting untuk menekan cost per lead",
    ],
  },
  {
    slug: "home-of-ben",
    client: "Home of BEN",
    type: "F&B · Bakmi & Coffee",
    services: ["Social Media", "Campaign"],
    result: "Brand awareness growth (+100%)",
    resultDetails: [
      "Brand awareness growth (+100%)",
      "Tim marketing internal 100% mandiri",
    ],
    logo: "/img/partner/ben.svg",
    featured: true,
    summary:
      "Bukan cuma awareness yang tumbuh 100% — setelah program selesai, seluruh konten dan aktivasi marketing Home of BEN dihandle tim internal tanpa MOTE.",
    challenge:
      "Seperti banyak owner F&B: tim marketing hanya bisa eksekusi tanpa strategi, tidak ada KPI yang jelas, dan owner kesulitan mengevaluasi dampak marketing ke bisnis.",
    approach: [
      "Pendampingan tim marketing internal: transfer knowledge dari strategic thinking sampai content production",
      "Campaign activation untuk momen-momen kunci brand",
      "KPI framework agar setiap aktivitas konten terukur dampaknya",
      "Transisi bertahap: MOTE eksekusi sambil mengajar → tim internal take over → graduation",
    ],
  },
  {
    slug: "karya-kultur-kreatif",
    client: "Karya Kultur Kreatif",
    type: "Komunitas Kreatif",
    services: ["Social Media", "Brand Growth"],
    result: "Community-driven brand (+90%)",
    resultDetails: [
      "Community-driven brand (+90%)",
      "Engagement Growth (+100%)",
    ],
    logo: "/img/partner/kkk.webp",
    featured: true,
    summary:
      "Strategi brand growth berbasis komunitas membawa Karya Kultur Kreatif tumbuh 90% sebagai community-driven brand dengan engagement naik 100%.",
    challenge:
      "Sebagai komunitas kreatif, pertumbuhan tidak bisa dibeli lewat ads semata — brand harus tumbuh dari partisipasi komunitas yang autentik, dengan identitas yang konsisten di semua touchpoint.",
    approach: [
      "Brand positioning workshop untuk mempertajam identitas dan suara komunitas",
      "Strategi konten yang mengangkat karya dan cerita anggota komunitas — bukan brand yang bicara, tapi komunitas yang bicara",
      "Sistem engagement yang mendorong partisipasi organik",
    ],
  },
];

export const STATS = [
  { value: 20, suffix: "+", label: "Klien Dilayani" },
  { value: 50, suffix: "+", label: "Project Selesai" },
  { value: 3, suffix: "+", label: "Tahun Pengalaman" },
  { value: 5, suffix: "", label: "Produk Digital" },
];

export const PARTNER_LOGOS = [
  { src: "/img/partner/rancabangohotel.webp", alt: "Rancabango Hotel" },
  { src: "/img/partner/balong.svg", alt: "Balong" },
  { src: "/img/partner/restorasa.svg", alt: "Restorasa" },
  { src: "/img/partner/pleasurenoise.webp", alt: "Pleasure Noise" },
  { src: "/img/partner/wacana.svg", alt: "Wacana" },
  { src: "/img/partner/kangroti.svg", alt: "Kang Roti" },
  { src: "/img/partner/ekraf.webp", alt: "Ekraf" },
  { src: "/img/partner/popondok.svg", alt: "Popondok" },
  { src: "/img/partner/popotoan.svg", alt: "Popotoan" },
  { src: "/img/partner/silangsimpul.webp", alt: "Silang Simpul" },
  { src: "/img/partner/tehsantea.svg", alt: "Teh Santea" },
  { src: "/img/partner/ben.svg", alt: "BEN" },
  { src: "/img/partner/kkk.webp", alt: "Karya Kultur Kreatif" },
  { src: "/img/partner/barbedek.svg", alt: "Barbedek" },
  { src: "/img/partner/klc.webp", alt: "KLC Food Co" },
  { src: "/img/partner/hanoon.webp", alt: "Hanoon" },
];

export const PHILOSOPHY = [
  {
    title: "Push boundaries",
    description:
      "Kami nggak puas dengan template. Setiap brand punya konteks unik, dan strategi kami didesain ulang untuk konteks itu.",
  },
  {
    title: "Agile",
    description:
      "Eksperimen cepat, data setiap minggu, iterasi yang nggak takut salah. Karena pasar bergerak lebih cepat dari rencana tahunan.",
  },
  {
    title: "Humanistic",
    description:
      "Di balik setiap KPI ada manusia—pelanggan, tim, dan owner. Kami mendesain strategi yang menghormati waktu dan energi mereka.",
  },
  {
    title: "Playful",
    description:
      "Bisnis serius bukan berarti komunikasi harus kaku. Kami percaya brand yang punya rasa main akan lebih mudah diingat.",
  },
];
