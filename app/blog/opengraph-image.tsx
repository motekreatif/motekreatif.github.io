import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog Mote Kreatif — Insight Marketing & Bisnis";

export default function Image() {
  return ogImage("Blog", "Insight Marketing & Bisnis dari MOTE");
}
