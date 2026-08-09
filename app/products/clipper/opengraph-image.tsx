import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Clipper Rumahan — AI clipper desktop, sekali bayar";

export default function Image() {
  return ogImage("Clipper Rumahan", "Bikin klip pendek dari YouTube, di laptop kamu sendiri");
}
