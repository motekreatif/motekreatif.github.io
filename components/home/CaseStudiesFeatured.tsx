"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CASE_STUDIES } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
  const featured = CASE_STUDIES.filter((c) => c.featured).slice(0, 3);

  return (
    <section id="case-studies" className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Hasil, bukan janji"
          title="Hasil, bukan janji."
          description="Angka bicara lebih keras dari presentasi. Ini sebagian hasil kerja kami—dengan klien yang setuju di-share."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {featured.map((cs) => (
            <motion.article
              key={cs.client}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="card-soft p-7 flex flex-col gap-4"
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
              <div className="text-2xl md:text-3xl font-extrabold leading-tight bg-gradient-to-br from-[#06243B] to-[#144668] bg-clip-text text-transparent">
                {cs.result}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cs.services.map((s) => (
                  <span
                    key={s}
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${serviceBadgeClass(
                      s
                    )}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

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
