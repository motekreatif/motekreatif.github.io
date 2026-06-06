import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { SERVICES_FAQ, buildServiceJsonLd } from "@/lib/faq";
import { SERVICES } from "@/lib/data";

export const metadata = buildMeta({
  title: "Layanan Digital Marketing — Ads, Marketplace, TDMO",
  description:
    "Layanan digital marketing end-to-end: Meta Ads, CPAS Shopee, TikTok Shop, marketplace optimization, dan program TDMO untuk bangun tim marketing internal.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {SERVICES.map((service) => (
        <JsonLd
          key={service.code}
          data={buildServiceJsonLd({
            name: service.title,
            description: service.description,
            path: service.href ?? "/services",
            serviceType: service.title,
          })}
        />
      ))}
      <PageHero
        eyebrow="Layanan"
        title="Lima layanan inti untuk lima fase pertumbuhan brand."
        highlight="pertumbuhan"
        description="Setiap layanan didesain untuk konteks yang berbeda. Pilih satu, kombinasikan, atau diskusikan dulu—kami bantu cari yang pas."
      />

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote flex flex-col gap-16">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const reverse = i % 2 === 1;
            return (
              <AnimatedSection
                key={service.code}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="card-soft p-8 flex flex-col gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-[#BDF24A] flex items-center justify-center text-[#06243B]">
                      <Icon className="h-8 w-8" strokeWidth={2.2} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF7E00]">
                        {service.code}
                      </span>
                      {service.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-[#BDF24A] text-[#06243B]">
                          <Star className="h-3 w-3 fill-current" />
                          Program Unggulan
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#06243B]">
                      {service.title}
                    </h2>
                    <p className="text-[#3D4F60] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7 lg:pt-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#06243B]/60 mb-4">
                    Yang kami kerjakan
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 p-4 bg-white rounded-xl border border-black/5"
                      >
                        <span className="h-6 w-6 rounded-full bg-[#06243B] text-[#BDF24A] flex items-center justify-center shrink-0">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-[#06243B] font-medium">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {service.href && (
                      <Link href={service.href} className="btn btn-primary group">
                        Pelajari {service.code}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    <Link href="/contact" className="btn btn-ghost">
                      Diskusikan Kebutuhan
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <FAQSection
        items={SERVICES_FAQ}
        description="Jawaban langsung untuk pertanyaan yang paling sering masuk sebelum kerja sama dimulai."
      />

      <CTASection />
    </>
  );
}
