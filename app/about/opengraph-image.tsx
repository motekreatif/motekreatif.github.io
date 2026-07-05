import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Tentang Mote Kreatif — Modal Tekun dari Garut";

export default function Image() {
  return ogImage("Tentang MOTE", "Agency yang Tumbuh dari Modal Tekun");
}
