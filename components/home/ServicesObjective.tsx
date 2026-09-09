import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OBJECTIVES } from "@/lib/data";

export function ServicesObjective() {
  return (
    <section id="services" className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Layanan"
          title="Solusi sesuai tujuan bisnis kamu."
          description="Kami nggak jualan paket. Kami mulai dari objective—lalu cocokkan layanan yang relevan."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {OBJECTIVES.map((o) => {
            const Icon = o.icon;
            const cardHref = o.href ?? "/services";
            return (
              <div
                key={o.title}
                className="relative rounded-[12px] border border-[var(--line-on-cream)] bg-white p-7 md:p-8 flex flex-col gap-4 group"
              >
                {o.featured && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-[4px] bg-[#BDF24A] text-[#06243B] text-xs font-semibold px-2 py-1">
                    <Star className="h-3 w-3 fill-current" />
                    Program Unggulan
                  </span>
                )}
                <span className="h-10 w-10 rounded-[4px] bg-[#06243B] text-[#F4D23A] flex items-center justify-center">
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#06243B]">
                  {o.title}
                </h3>
                <p className="text-[#3D4F60] leading-relaxed">{o.description}</p>
                <Link
                  href={cardHref}
                  className="inline-flex items-center gap-2 text-[#06243B] font-semibold text-sm mt-auto hover:gap-3 transition-all"
                >
                  Lihat cara kerjanya
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="btn btn-ghost">
            Lihat Semua Layanan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
