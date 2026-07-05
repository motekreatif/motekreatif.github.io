import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Produk & Tools Digital dari Mote Kreatif";

export default function Image() {
  return ogImage("Produk", "Tools & Produk Digital dari MOTE");
}
