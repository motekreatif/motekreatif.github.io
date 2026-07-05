import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Mote Kreatif — Digital Marketing Agency & Marketplace Optimization di Garut";

export default function Image() {
  return ogImage("Digital Marketing Agency", "Scale Penjualan Brand Lokal — dari Garut");
}
