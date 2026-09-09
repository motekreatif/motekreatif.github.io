import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { WA_INTRO, waLink } from "@/lib/constants";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ProofRow } from "@/components/shared/ProofRow";

const HERO_PROOF = [
  {
    value: "12,7x",
    label: "ROAS iklan Hanoon",
    href: "/case-studies/hanoon-industries",
    ariaLabel: "Lihat studi kasus Hanoon Industries",
  },
  {
    value: "50,2%",
    label: "Occupancy Rancabango, dari 32,6%",
    href: "/case-studies/rancabango-hotel",
    ariaLabel: "Lihat studi kasus Rancabango Hotel & Resort",
  },
  {
    value: "695",
    label: "Percakapan WhatsApp dari iklan",
    href: "/case-studies/rancabango-hotel",
    ariaLabel: "Lihat studi kasus Rancabango Hotel & Resort",
  },
];

const HERO_IMG = "/img/hero-threads.webp";
const HERO_ALT =
  "Puluhan benang navy, hijau, dan oranye terurai lalu terpilin jadi satu tali di atas kertas cream";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#06243B] text-white grain-overlay">
      {/* Foto jadi latar penuh, dicerminkan supaya benang yang terurai jatuh di
          kanan dan kolom teks di kiri kebagian bidang paling sepi. Scrim navy
          rata — bukan gradient — karena di atas kertas cream ini teks terang
          tidak akan terbaca tanpa itu, dan di mobile fotonya memenuhi seluruh
          layar sehingga tiap barisnya berdiri di atas benang. */}
      <Image
        src={HERO_IMG}
        alt={HERO_ALT}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[22%_center] lg:object-[38%_center] -scale-x-100"
      />
      <div className="absolute inset-0 bg-[#06243B]/80 lg:bg-[#06243B]/75" />

      <div className="container-mote relative pt-12 pb-14 lg:pt-24 lg:pb-24">
        <div className="lg:max-w-[560px] flex flex-col gap-6">
          <Eyebrow tone="navy">Digital Marketing Consultant</Eyebrow>
          <h1 className="font-semibold text-white text-balance max-w-[16ch] leading-[1.06]">
            Bikin iklan &amp; toko online kamu{" "}
            <strong className="font-bold">balik modal</strong> — bukan cuma rame
            dilihat.
          </h1>
          <p className="lead text-[#EFEBDD]/85 max-w-[38ch]">
            Khusus brand F&amp;B, hotel, dan seller Shopee/TikTok Shop yang serius mau
            scale. Satu tim urus iklan, konten, sampai marketplace — semua diukur dari
            penjualan, bukan sekadar angka view.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-6">
              <a
                href={waLink(WA_INTRO.hero)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi Gratis via WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="#case-studies"
                className="inline-flex items-center gap-2 min-h-[44px] font-semibold text-white hover:text-[#BDF24A] transition-colors duration-150"
              >
                Lihat Bukti: ROAS 12,7x &amp; Occupancy 50,2%
                <ArrowDown className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm font-medium text-[#EFEBDD]/75">
              Gratis &amp; tanpa komitmen — kalau nggak cocok, kami jujur bilang.
            </p>
          </div>

          <div className="mt-4">
            <ProofRow items={HERO_PROOF} tone="navy" numSize="sm" mobileLayout="stack" />
            {/* Periode ditulis sekali di bawah baris, bukan diulang di tiap label:
                tiga label yang membawa tanggalnya sendiri jadi dua baris semua. */}
            <p className="mt-4 text-sm text-[#EFEBDD]/75">
              Rata-rata April–Juni 2026, dari akun iklan dan laporan bulanan klien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
