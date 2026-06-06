"use client";

import { motion } from "framer-motion";
import { BarChart3, Layers, Target, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Layers,
    title: "Bukan cuma Ads",
    text: "Kami ngerti marketplace. Shopee, TikTok Shop, CPAS—bukan cuma pasang iklan Meta lalu selesai.",
  },
  {
    icon: BarChart3,
    title: "Data-driven",
    text: "Setiap keputusan berdasarkan angka. Weekly reporting, ROAS tracking, conversion analysis.",
  },
  {
    icon: Target,
    title: "Fokus objective",
    text: "Kami nggak jualan impressions. Target kami sama dengan target kamu: revenue dan profit naik.",
  },
];

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

export function WhyMote() {
  return (
    <section
      className="relative text-white section-padding overflow-hidden grain-overlay"
      style={{
        background:
          "linear-gradient(170deg, #06243B 0%, #0E3450 55%, #06243B 100%)",
      }}
    >
      <div
        className="absolute inset-x-0 top-[8%] h-[260px] z-0 hidden md:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="a"
          color="#BDF24A"
          opacity={0.08}
          strokeWidth={42}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-[5%] h-[240px] z-0 hidden md:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="c"
          color="#FF7E00"
          opacity={0.1}
          strokeWidth={40}
          delay={0.3}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="container-mote relative z-10">
        <SectionHeading
          eyebrow="Kenapa Mote"
          title="Kenapa brand pilih Mote."
          description="Tiga hal yang konsisten kami dengar dari klien yang pindah dari agency lain ke Mote."
          light
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="card-dark p-7 flex flex-col gap-4"
              >
                <span className="h-12 w-12 rounded-2xl bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#BDF24A]">
                  {r.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{r.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
