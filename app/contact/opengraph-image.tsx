import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Kontak Mote Kreatif — Ngobrol Bareng MOTE";

export default function Image() {
  return ogImage("Kontak", "Ngobrol Bareng Tim MOTE");
}
