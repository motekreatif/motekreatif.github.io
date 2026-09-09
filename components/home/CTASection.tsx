import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { CONTACT, WA_INTRO, waLink } from "@/lib/constants";
import { Eyebrow } from "@/components/shared/Eyebrow";

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#BDF24A] grain-overlay">
      <div className="container-mote relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
          <Eyebrow tone="yellow">Siap mulai?</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06243B] text-balance">
            Siap scale penjualan brand kamu?
          </h2>
          <p className="text-base sm:text-lg text-[#06243B]/85 max-w-xl">
            Diskusi 30 menit, Gratis. Kami review kondisi bisnis kamu dan kasih rekomendasi — cocok atau tidak, kami jujur bilang.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a
              href={waLink(WA_INTRO.cta)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark group"
            >
              <MessageCircle className="h-4 w-4" />
              Chat via WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost">
              <Mail className="h-4 w-4" />
              Kirim Email
            </a>
          </div>
          <p className="text-sm italic text-[#06243B]/65 mt-1">
            Kalau cocok, kami submit proposal. <br />Kalau tidak fit, kami jujur bilang.
          </p>
        </div>
      </div>
    </section>
  );
}
