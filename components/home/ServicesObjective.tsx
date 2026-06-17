"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OBJECTIVES } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ICON_GRADIENTS = [
  "linear-gradient(135deg, #BDF24A 0%, #FF7E00 100%)",
  "linear-gradient(135deg, #FF7E00 0%, #06243B 100%)",
  "linear-gradient(135deg, #06243B 0%, #FF7E00 100%)",
  "linear-gradient(135deg, #FF7E00 0%, #06243B 100%)",
];

const ICON_COLORS = ["#06243B", "#fff", "#fff", "#fff"];

export function ServicesObjective() {
  return (
    <section id="services" className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Layanan"
          title="Solusi sesuai tujuan bisnis kamu."
          description="Kami nggak jualan paket. Kami mulai dari objective—lalu cocokkan layanan yang relevan."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {OBJECTIVES.map((o, i) => {
            const Icon = o.icon;
            const cardHref = o.href ?? "/services";
            const iconBg = ICON_GRADIENTS[i % ICON_GRADIENTS.length];
            const iconColor = ICON_COLORS[i % ICON_COLORS.length];
            return (
              <motion.div
                key={o.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="relative card-soft p-7 md:p-8 flex flex-col gap-4 group"
              >
                {o.featured && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-[#BDF24A] text-[#06243B]">
                    <Star className="h-3 w-3 fill-current" />
                    Program Unggulan
                  </span>
                )}
                <span
                  className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: iconBg, color: iconColor }}
                >
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
              </motion.div>
            );
          })}
        </motion.div>

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
