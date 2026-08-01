import { ArrowRight, FolderOpen } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CONTACT } from "@/lib/constants";

/** Closing "still stuck?" CTA, matching the setup preview's `.help` block. Reused on chooser/windows/mac. */
export function HelpFooter({ heading = "Masih bingung?" }: { heading?: string }) {
  return (
    <section className="bg-[#F7F8FA] py-16 sm:py-20 border-t border-black/5">
      <div className="container-mote">
        <AnimatedSection className="mx-auto max-w-2xl text-center flex flex-col items-center gap-4">
          <span className="grid place-items-center h-14 w-14 rounded-2xl bg-[#06243B]">
            <FolderOpen className="h-7 w-7 text-[#BDF24A]" />
          </span>
          <h2 className="text-[#06243B]">{heading}</h2>
          <p className="text-[15px] text-[#3D4F60] max-w-md">
            Balas email pembelian kamu, atau hubungi kami — dibantu sampai klip pertama kamu jadi.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="btn btn-dark group">
            Hubungi Mote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
