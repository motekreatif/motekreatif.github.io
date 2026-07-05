import { ogImage, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Corong Cuan — Kalkulator Marketing Gratis buat Pemilik Bisnis | MOTE";

export default function Image() {
  return ogImage("Corong Cuan · Alat Gratis", "Kalkulator Marketing buat Pemilik Bisnis");
}
