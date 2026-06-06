import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { CASE_STUDIES } from "@/lib/data";

export const metadata = buildMeta({
  title: "Studi Kasus — Hasil Nyata Digital Marketing",
  description:
    "ROAS 20.8x untuk Hanoon Industries, omset Rp 721jt untuk Rancabango Hotel, ROAS CPAS 7.6x untuk KLC Food. Lihat hasil kerja Mote Kreatif.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const featured = CASE_STUDIES.filter((c) => c.featured);
  const others = CASE_STUDIES.filter((c) => !c.featured);

  return (
    <>
      <PageHero
        eyebrow="Studi Kasus"
        title="Bukan dek presentasi. Ini hasil nyata dari kerja nyata."
        highlight="hasil nyata"
        description="Beberapa brand yang sudah tumbuh bareng kami—dengan angka yang bisa diverifikasi, bukan testimoni saja."
      />

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#06243B]/60 mb-6">
            Detail dengan angka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((cs, i) => (
              <AnimatedSection
                key={cs.client}
                delay={i * 0.08}
                className="card-soft p-7 flex flex-col gap-4"
              >
                {cs.logo && (
                  <div className="h-12 flex items-center">
                    <Image
                      src={cs.logo}
                      alt={cs.client}
                      width={140}
                      height={48}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-extrabold text-[#06243B]">
                    {cs.client}
                  </h3>
                  <p className="text-sm text-[#3D4F60] mt-1">{cs.type}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cs.services.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-[#BDF24A]/40 text-[#06243B]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-2 pt-4 border-t border-black/5">
                  <div className="text-xs uppercase tracking-widest font-bold text-[#FF7E00] mb-2">
                    Hasil
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {(cs.resultDetails ?? [cs.result]).map((r) => (
                      <li
                        key={r}
                        className="text-base font-bold text-[#06243B] leading-snug"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF7E00] hover:text-[#06243B] transition-colors group mt-auto"
                >
                  Baca studi kasus lengkap
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <h2 className="text-xs uppercase tracking-widest font-bold text-[#06243B]/60 mt-16 mb-6">
            Brand lain yang tumbuh bareng kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((cs, i) => (
              <AnimatedSection
                key={cs.client}
                delay={i * 0.06}
                className="bg-white rounded-2xl p-6 border border-black/5"
              >
                <h3 className="text-lg font-extrabold text-[#06243B]">
                  {cs.client}
                </h3>
                <p className="text-sm text-[#3D4F60] mt-1">{cs.type}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cs.services.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-black/[0.05] text-[#06243B]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-[#06243B]/80">
                  {cs.result}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
