import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Masyarakat MOTE — Komunitas Anak Muda Kreatif Garut";

export default function Image() {
  return ogImage("Masyarakat MOTE", "Komunitas Anak Muda Kreatif — dari Garut");
}
