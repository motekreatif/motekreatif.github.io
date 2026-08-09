import { ArrowUpRight, FolderOpen } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CONTACT } from "@/lib/constants";
import { LogoWatermark } from "../../LogoWatermark";
import { BLOCK } from "./skin";

/** Closing "still stuck?" CTA — blok ink dengan tombol pill kuning + lingkaran panah. Reused on chooser/windows/mac. */
export function HelpFooter({ heading = "Masih bingung?" }: { heading?: string }) {
  return (
    <section className={`${BLOCK} relative overflow-hidden bg-[#191919] px-4 py-14 sm:px-10 sm:py-16`}>
      <LogoWatermark className="-left-16 -top-20 w-[200px] text-white/[0.05] sm:-left-20 sm:w-[300px]" />
      <AnimatedSection className="relative mx-auto max-w-2xl text-center flex flex-col items-center gap-4">
        <span className="grid place-items-center h-14 w-14 rounded-full bg-[#F7C526]">
          <FolderOpen className="h-7 w-7 text-[#191919]" />
        </span>
        <h2 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.08] text-white">
          {heading}
        </h2>
        <p className="text-[15px] text-white/70 max-w-md leading-relaxed">
          Balas email pembelian kamu, atau hubungi kami — dibantu sampai klip pertama kamu jadi.
        </p>
        <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-2 pt-1">
          <span className="rounded-full bg-[#F7C526] px-6 py-3.5 text-[15px] font-semibold text-[#191919] whitespace-nowrap transition-colors group-hover:bg-[#ffd84a]">
            Hubungi Mote
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F7C526] text-[#191919] transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </a>
      </AnimatedSection>
    </section>
  );
}
