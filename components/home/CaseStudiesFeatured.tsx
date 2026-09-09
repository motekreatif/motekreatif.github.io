import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CASE_STUDIES } from "@/lib/data";

// Map service keyword to badge color class
function serviceBadgeClass(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("ads") || s.includes("campaign")) return "badge-ads";
  if (s.includes("cpas") || s.includes("marketplace") || s.includes("shopee") || s.includes("tiktok"))
    return "badge-marketplace";
  if (s.includes("crm") || s.includes("tdmo")) return "badge-tdmo";
  if (s.includes("brand") || s.includes("growth") || s.includes("social media") || s.includes("kol"))
    return "badge-brand";
  return "badge-neutral";
}

export function CaseStudiesFeatured() {
  const featured = CASE_STUDIES.filter((c) => c.featured);
  // Kolom mengikuti jumlah kartu. Dikunci di tiga, dua kartu menyisakan satu
  // kolom kosong di kanan dan barisnya terbaca seperti ada yang hilang.
  const cols = featured.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section id="case-studies" className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Studi Kasus"
          title="Hasil, bukan janji."
          description="Angka di bawah diambil dari akun iklan dan laporan bulanan klien, lengkap dengan periodenya."
        />

        <div className={`mt-12 grid grid-cols-1 ${cols} gap-5`}>
          {featured.map((cs) => (
            <Link
              key={cs.client}
              href={`/case-studies/${cs.slug}`}
              className="group block md:border-l md:border-[var(--line-on-cream)] md:pl-6 first:md:border-l-0 first:md:pl-0 py-4 md:py-0 border-t border-[var(--line-on-cream)] md:border-t-0 min-h-[64px]"
            >
              {cs.logo ? (
                <div className="h-10 flex items-center">
                  <Image
                    src={cs.logo}
                    alt={cs.client}
                    width={140}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="text-xs uppercase tracking-widest font-bold text-[#FF7E00]">
                  {cs.client}
                </div>
              )}
              <div>
                <h3 className="text-lg font-extrabold text-[#06243B]">
                  {cs.client}
                </h3>
                <p className="text-sm text-[#3D4F60] mt-1">{cs.type}</p>
              </div>
              <div className="stat-num-sm text-[#06243B]">
                {cs.result}
              </div>
              {cs.period ? (
                <div className="text-xs font-semibold text-[#3D4F60] mb-3">
                  {cs.period}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-1.5">
                {cs.services.map((s) => (
                  <span
                    key={s}
                    className={`text-xs font-semibold rounded-[4px] px-2 py-1 ${serviceBadgeClass(
                      s
                    )}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#06243B] font-bold hover:gap-3 transition-all"
          >
            Lihat Semua Studi Kasus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
