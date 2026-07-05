import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Komunitas MOTE — Pilih Jalurmu: Kreatif atau Pemilik Bisnis";

export default function Image() {
  return ogImage("Komunitas MOTE", "Pilih Jalurmu — Kreatif atau Pemilik Bisnis");
}
