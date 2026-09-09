import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { WA_INTRO, waLink } from "@/lib/constants";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ProofRow } from "@/components/shared/ProofRow";
import { HeroMedia } from "@/components/shared/HeroMedia";

const HERO_PROOF = [
  {
    value: "20,8x",
    label: "ROAS Ads CPAS",
    href: "/case-studies/hanoon-industries",
    ariaLabel: "Lihat studi kasus Hanoon Industries",
  },
  {
    value: "+77%",
    label: "Revenue dari Digital Aktivasi",
    href: "/case-studies/rancabango-hotel",
    ariaLabel: "Lihat studi kasus Rancabango Hotel & Resort",
  },
  {
    value: "+300%",
    label: "leads WhatsApp",
    href: "/case-studies/popondok",
    ariaLabel: "Lihat studi kasus Popondok",
  },
];

const HERO_POSTER = "/img/hero-poster.webp";
const HERO_POSTER_M = "/img/hero-poster-m.webp";
const HERO_ALT =
  "Simpul tali navy yang sudah terikat rapi di atas kertas cream, difoto dari dekat dengan cahaya dari samping";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden text-[#06243B] grain-overlay">
      <div className="bg-[#F4D23A]">
        <div className="container-mote pt-10 pb-10 lg:pt-12 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Eyebrow tone="yellow">Digital Marketing Consultant</Eyebrow>
            <h1 className="text-balance max-w-[18ch]">
              Bikin iklan &amp; toko online kamu{" "}
              <span className="highlight-text">balik modal</span> — bukan cuma rame dilihat.
            </h1>
            <p className="lead text-[#06243B]/80">
              Khusus brand F&amp;B, hotel, dan seller Shopee/TikTok Shop yang serius mau scale. Satu
              tim urus iklan, konten, sampai marketplace — semua diukur dari penjualan, bukan sekadar
              angka view.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-6">
                <a
                  href={waLink(WA_INTRO.hero)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark group w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi Gratis via WhatsApp
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href="#case-studies"
                  className="inline-flex items-center gap-2 min-h-[44px] font-semibold text-[#06243B] hover:text-[#FF7E00] transition-colors duration-150"
                >
                  Lihat Bukti: ROAS 20,8x &amp; +77% Omset
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm font-medium text-[#06243B]/70">
                Gratis &amp; tanpa komitmen — kalau nggak cocok, kami jujur bilang.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroMedia
              poster={HERO_POSTER}
              posterMobile={HERO_POSTER_M}
              posterAlt={HERO_ALT}
              webm="/video/hero-loop.webm"
              mp4="/video/hero-loop.mp4"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#F7DF75] border-t border-[var(--line-on-yellow)]">
        <div className="container-mote band-padding">
          <ProofRow items={HERO_PROOF} tone="yellow" mobileLayout="stack" />
        </div>
      </div>
    </section>
  );
}
