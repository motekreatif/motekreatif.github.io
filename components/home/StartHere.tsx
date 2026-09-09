import { MessageCircle, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WA_INTRO, waLink } from "@/lib/constants";

const steps = [
  {
    title: "Chat via WhatsApp",
    text: "Ceritakan kondisi bisnis kamu. Santai, langsung ke orangnya—bukan bot.",
  },
  {
    title: "Audit Gratis 30 Menit",
    text: "Kami review akun ads, marketplace, dan funnel kamu. Gratis, tanpa komitmen.",
  },
  {
    title: "Proposal + Fee Transparan",
    text: "Kalau cocok, kami kirim rencana kerja dan fee yang jelas. Kalau tidak fit, kami jujur bilang.",
  },
];

export function StartHere() {
  return (
    <section className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Mulai Bareng Mote"
          title="Gampang mulainya. Gratis di depan."
          description="Nggak ada proses ribet. Tiga langkah, dan kamu sudah tahu apakah Mote cocok untuk brand kamu."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => {
            return (
              <div
                key={s.title}
                className="relative card-soft p-7 flex flex-col gap-4"
              >
                <span className="stat-num-sm text-[#06243B]">0{i + 1}</span>
                <h3 className="text-xl font-extrabold text-[#06243B]">
                  {s.title}
                </h3>
                <p className="text-[#3D4F60] leading-relaxed">{s.text}</p>
              </div>
            );
          })}
        </div>

        {/* Qualifier + CTA strip */}
        <div className="mt-8 rounded-[12px] bg-[#06243B] p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#BDF24A]">
              Cocok untuk
            </span>
            <p className="text-white font-semibold text-lg leading-snug max-w-xl">
              Brand dengan budget iklan mulai{" "}
              <span className="text-[#BDF24A]">Rp 10 juta/bulan</span> yang serius
              mau scale—bukan sekadar coba-coba.
            </p>
          </div>
          <a
            href={waLink(WA_INTRO.start)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            Cek Kecocokan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
