"use client";

import { motion } from "framer-motion";
import { Megaphone, Building2, MessageSquareQuote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

const pillars = [
  {
    icon: Megaphone,
    name: "Paid Media",
    tagline: "Iklan yang efisien",
    tactics: ["Meta Ads", "CPAS Shopee", "Google Ads", "TikTok Ads"],
  },
  {
    icon: Building2,
    name: "Owned Media",
    tagline: "Aset yang kamu kontrol",
    tactics: ["Marketplace", "Website", "Konten", "Social Media"],
  },
  {
    icon: MessageSquareQuote,
    name: "Earned Media",
    tagline: "Bukti sosial organik",
    tactics: ["Review", "KOL", "Word of mouth", "UGC"],
  },
];

export function TrifectaMarketing() {
  return (
    <section
      className="relative text-white section-padding overflow-hidden grain-overlay"
      style={{
        background:
          "linear-gradient(160deg, #06243B 0%, #0E3450 60%, #06243B 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#BDF24A]/5 blur-3xl pointer-events-none z-0"
      />

      {/* Decorative ribbons */}
      <div
        className="absolute inset-x-0 top-[8%] h-[260px] z-0 hidden md:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="b"
          color="#FF7E00"
          opacity={0.1}
          strokeWidth={44}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-[5%] h-[260px] z-0 hidden md:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="d"
          color="#BDF24A"
          opacity={0.09}
          strokeWidth={42}
          delay={0.3}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="container-mote relative z-10">
        <SectionHeading
          eyebrow="Pendekatan Trifecta"
          title="Bukan cuma Ads."
          description="Kebanyakan agency hanya fokus di Paid Media—pasang iklan, selesai. Mote mengelola ketiga sisi secara terintegrasi: iklan yang efisien, konten dan marketplace yang optimal, dan strategi untuk mendapatkan social proof organik."
          light
        />

        <div className="mt-14 lg:mt-20">
          <DesktopTriangle />
          <MobileStack />
        </div>
      </div>
    </section>
  );
}

function DesktopTriangle() {
  return (
    <div className="hidden lg:block relative h-[520px] max-w-3xl mx-auto">
      <svg
        viewBox="0 0 600 520"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <motion.path
          d="M 300 70 L 90 420"
          stroke="#BDF24A"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          style={{ filter: "drop-shadow(0 0 6px rgba(189, 242, 74,0.45))" }}
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 300 70 L 510 420"
          stroke="#BDF24A"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          style={{ filter: "drop-shadow(0 0 6px rgba(189, 242, 74,0.45))" }}
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        />
        <motion.path
          d="M 90 420 L 510 420"
          stroke="#BDF24A"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          style={{ filter: "drop-shadow(0 0 6px rgba(189, 242, 74,0.45))" }}
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>

      <PillarNode pillar={pillars[0]} delay={0.5} className="absolute left-1/2 -translate-x-1/2 top-0" />
      <PillarNode pillar={pillars[1]} delay={0.65} className="absolute left-0 bottom-0" />
      <PillarNode pillar={pillars[2]} delay={0.8} className="absolute right-0 bottom-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, delay: 1.05, type: "spring", stiffness: 200 }}
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="rounded-2xl bg-gradient-to-br from-[#BDF24A] to-[#A6D636] text-[#06243B] px-5 py-3 text-center shadow-[0_18px_50px_-15px_rgba(189,242,74,0.6)]">
          <div className="text-[10px] font-bold uppercase tracking-widest">
            Mote handles
          </div>
          <div className="font-extrabold text-lg leading-tight">All three</div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileStack() {
  return (
    <div className="lg:hidden flex flex-col gap-5 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-gradient-to-br from-[#BDF24A] to-[#A6D636] text-[#06243B] px-5 py-3 text-center font-extrabold shadow-md"
      >
        Mote mengelola ketiga sisi
      </motion.div>
      {pillars.map((p, i) => (
        <PillarCard pillar={p} key={p.name} delay={i * 0.12} />
      ))}
    </div>
  );
}

function PillarNode({
  pillar,
  delay,
  className,
}: {
  pillar: (typeof pillars)[number];
  delay: number;
  className?: string;
}) {
  const Icon = pillar.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`w-64 bg-white/[0.07] border border-white/15 rounded-2xl p-5 backdrop-blur-sm transition-colors hover:border-[#BDF24A]/45 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-10 rounded-xl bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-[#BDF24A]">
            {pillar.tagline}
          </div>
          <h3 className="text-lg font-extrabold text-white leading-tight">
            {pillar.name}
          </h3>
        </div>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {pillar.tactics.map((t) => (
          <li
            key={t}
            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-white/10 text-white/90"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function PillarCard({
  pillar,
  delay,
}: {
  pillar: (typeof pillars)[number];
  delay: number;
}) {
  const Icon = pillar.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/[0.07] border border-white/15 rounded-2xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="h-12 w-12 rounded-xl bg-[#BDF24A] text-[#06243B] flex items-center justify-center">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-[#BDF24A]">
            {pillar.tagline}
          </div>
          <h3 className="text-lg font-extrabold text-white">{pillar.name}</h3>
        </div>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {pillar.tactics.map((t) => (
          <li
            key={t}
            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-white/10 text-white/90"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
