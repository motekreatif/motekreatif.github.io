import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Layanan Mote Kreatif — Meta Ads, CPAS Shopee, TikTok Shop, Marketplace";

export default function Image() {
  return ogImage("Layanan", "Meta Ads · CPAS Shopee · TikTok Shop · Marketplace");
}
