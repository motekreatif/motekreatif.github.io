import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Case Studies — Hasil Nyata Klien Mote Kreatif";

export default function Image() {
  return ogImage("Case Studies", "Hasil Nyata Klien MOTE");
}
