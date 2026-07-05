import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Tentang MOTE — Bukan Sekadar Agency, Kami Pemantik Energi Muda";

export default function Image() {
  return ogImage("Tentang MOTE", "Bukan sekadar agency — kami pemantik energi muda");
}
