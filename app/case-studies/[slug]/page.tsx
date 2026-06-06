import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTASection } from "@/components/home/CTASection";
import { SITE } from "@/lib/constants";
import { CASE_STUDIES } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return buildMeta({
    title: `Studi Kasus ${cs.client} — ${cs.result}`,
    description: cs.summary ?? `${cs.client} (${cs.type}): ${cs.result}. Studi kasus digital marketing oleh Mote Kreatif.`,
    path: `/case-studies/${cs.slug}`,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Studi Kasus ${cs.client} — ${cs.result}`,
    description: cs.summary,
    url: `${SITE.url}/case-studies/${cs.slug}`,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    about: {
      "@type": "Organization",
      name: cs.client,
    },
    inLanguage: "id-ID",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Studi Kasus",
        item: `${SITE.url}/case-studies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cs.client,
        item: `${SITE.url}/case-studies/${cs.slug}`,
      },
    ],
  };

  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="bg-[#06243B] text-white py-16 sm:py-20">
        <div className="container-mote max-w-4xl">
          <AnimatedSection className="flex flex-col gap-5">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#BDF24A] transition-colors self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Semua Studi Kasus
            </Link>
            {cs.logo && (
              <div className="h-14 flex items-center">
                <Image
                  src={cs.logo}
                  alt={cs.client}
                  width={160}
                  height={56}
                  className="h-14 w-auto object-contain brightness-0 invert"
                />
              </div>
            )}
            <span className="eyebrow eyebrow-on-dark self-start">{cs.type}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-balance">
              {cs.client}: <span className="text-[#BDF24A]">{cs.result}</span>
            </h1>
            {cs.summary && (
              <p className="text-base sm:text-lg text-[#EFEBDD] leading-relaxed max-w-2xl">
                {cs.summary}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {cs.services.map((s) => (
                <span
                  key={s}
                  className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/10 text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[#F7F4EE] py-16 sm:py-20">
        <div className="container-mote max-w-4xl flex flex-col gap-12">
          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(cs.resultDetails ?? [cs.result]).map((r) => (
              <div key={r} className="card-soft p-6">
                <div className="text-xs uppercase tracking-widest font-bold text-[#FF7E00] mb-2">
                  Hasil
                </div>
                <div className="text-lg font-extrabold text-[#06243B] leading-snug">
                  {r}
                </div>
              </div>
            ))}
          </AnimatedSection>

          {cs.challenge && (
            <AnimatedSection className="flex flex-col gap-4">
              <span className="eyebrow self-start">Tantangan</span>
              <p className="text-[#3D4F60] leading-relaxed text-lg">
                {cs.challenge}
              </p>
            </AnimatedSection>
          )}

          {cs.approach && (
            <AnimatedSection className="flex flex-col gap-5">
              <span className="eyebrow self-start">Pendekatan Kami</span>
              <ul className="flex flex-col gap-3">
                {cs.approach.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 p-5 bg-white rounded-xl border border-black/5"
                  >
                    <span className="h-6 w-6 rounded-full bg-[#06243B] text-[#BDF24A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[#06243B] leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}

          <AnimatedSection className="border-t border-black/10 pt-10">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#06243B]/60 mb-5">
              Studi kasus lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/case-studies/${o.slug}`}
                  className="card-soft p-5 group"
                >
                  <h3 className="font-extrabold text-[#06243B]">{o.client}</h3>
                  <p className="text-sm text-[#3D4F60] mt-1">{o.result}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#FF7E00] mt-3">
                    Baca
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
