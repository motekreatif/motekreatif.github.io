export const SITE = {
  name: "Mote Kreatif",
  legalName: "PT Masyarakat Modal Tekun",
  url: "https://motekreatif.com",
  tagline: "Push boundaries · Agile · Humanistic · Playful",
  // Kalimat entity kanonik — dipakai konsisten di metadata, schema, dan konten
  // agar AI engines (ChatGPT, Gemini, Perplexity, Claude) mengenali entity yang sama.
  description:
    "Mote Kreatif adalah digital marketing agency dan consultant berbasis di Garut, Jawa Barat, Indonesia, yang membantu brand lokal scale penjualan lewat Meta Ads, CPAS Shopee, TikTok Shop Ads, marketplace optimization, dan pengembangan tim marketing internal (TDMO).",
  foundingDate: "2024",
  slogan: "Push boundaries · Agile · Humanistic · Playful",
  metaPixelId: "742593718541945",
  // GA4 Measurement ID — stream "Mote Kreatif" (https://motekreatif.com)
  ga4Id: "G-1S8P6GKH3Z",
};

// Profil eksternal untuk sinyal entity (schema.org sameAs).
// PENTING: verifikasi setiap URL benar-benar milik Mote Kreatif sebelum deploy.
export const SAME_AS = [
  "https://instagram.com/motekreatif",
  "https://www.tiktok.com/@motekreatif",
  "https://www.threads.net/@motekreatif",
  "https://www.facebook.com/motekreatif",
  // TODO: ganti dengan URL LinkedIn Company Page yang benar
  "https://www.linkedin.com/company/motekreatif",
  // TODO: tambahkan link Google Business Profile (share link dari Google Maps)
];

export const CONTACT = {
  email: "motekreatif@gmail.com",
  whatsapp: "+62 851-9655-8646",
  whatsappLink: "https://wa.me/6285196558646",
  instagram: "@motekreatif",
  instagramLink: "https://instagram.com/motekreatif",
  offices: [
    {
      label: "MOTE Office — HOP Space",
      address:
        "Jl. Raya Cipanas No.13, Cimanganten, Kec. Tarogong Kaler, Kabupaten Garut, Jawa Barat 44151",
      streetAddress: "Jl. Raya Cipanas No.13, Cimanganten, Tarogong Kaler",
      postalCode: "44151",
    },
    {
      label: "MOTE Office — Karangpawitan",
      address:
        "Jl. Ahmad Yani Timur No.74, Lebakjaya, Kec. Karangpawitan, Kabupaten Garut, Jawa Barat 44182",
      streetAddress: "Jl. Ahmad Yani Timur No.74, Lebakjaya, Karangpawitan",
      postalCode: "44182",
    },
  ],
};

export const BRAND_COLORS = {
  primary: "#BDF24A",
  dark: "#06243B",
  orange: "#FF7E00",
  pink: "#06243B",
  greenLight: "#06243B",
  bg: "#F7F4EE",
  cardBg: "#FFFFFF",
};

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "TDMO", href: "/tdmo" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
