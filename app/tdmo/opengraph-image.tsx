import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "TDMO — Bangun Tim Digital Marketing Internal bareng Mote Kreatif";

export default function Image() {
  return ogImage("TDMO", "Bangun Tim Marketing Internal yang Jalan");
}
