import type { Metadata } from "next";
import { SITE } from "./constants";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  /** Relatif ke domain (mis. "/img/textlogosquare.webp") atau URL absolut. Default share card brand. */
  image?: string;
};

// Web baru MOTE (Okt 2026) tayang dari public/. Halaman lama di bawah ini dimatikan dari
// menu & Google (noindex) tapi isinya tetap bisa dibuka, untuk didesain ulang nanti.
// Clipper TIDAK termasuk: pembayaran iPaymu jalan di sana.
const DIARSIPKAN = ["/about", "/blog", "/case-studies", "/community", "/contact"];
const diarsipkan = (path: string) =>
  path === "/products" || DIARSIPKAN.some((p) => path === p || path.startsWith(p + "/"));

export function buildMeta({
  title,
  description,
  path = "/",
  image = "/img/textlogosquare.webp",
}: BuildMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;
  return {
    title,
    description,
    ...(diarsipkan(path) ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "id_ID",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
