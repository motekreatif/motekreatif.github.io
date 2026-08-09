import Link from "next/link";
import type { ReactNode } from "react";
import { LogoCR } from "../../LogoCR";
import { BLOCK, CHIP_DARK } from "./skin";

/**
 * Hero kartu ink untuk halaman-halaman setup — pengganti PageHero MOTE,
 * sekulit dengan hero halaman jual: blok gelap membulat besar dengan
 * pill navbar berlogo CR di atasnya. `title` menerima ReactNode supaya
 * halaman bisa menyorot sebagian judul dengan box kuning tanpa mengubah teks.
 */
export function SetupHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className={`${BLOCK} bg-[#191919] text-white px-4 pt-4 pb-10 sm:px-8 sm:pt-6 sm:pb-14 lg:px-12`}>
      {/* Pill brand — link balik ke halaman produk */}
      <div className="flex items-center justify-between gap-3 rounded-full bg-white/10 backdrop-blur border border-white/15 py-2.5 px-5">
        <Link href="/products/clipper" className="flex items-center gap-2.5">
          <LogoCR className="h-8 w-auto shrink-0 text-[#F7C526]" />
          <span className="whitespace-nowrap text-[15px] font-semibold text-white">Clipper Rumahan</span>
        </Link>
      </div>

      <div className="mx-auto max-w-3xl flex flex-col items-start gap-5 pt-10 sm:pt-14">
        <span className={CHIP_DARK}>{eyebrow}</span>
        <h1 className="text-balance text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-semibold tracking-[-0.02em] leading-[1.12] text-white">
          {title}
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{description}</p>
        {actions}
      </div>
    </section>
  );
}

/** Box highlight kuning untuk sebagian judul hero (styling saja, teks tetap). */
export function HeroMark({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[0.18em] bg-[#F7C526] px-[0.28em] py-[0.04em] leading-[1.35] text-[#191919] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
      {children}
    </span>
  );
}
