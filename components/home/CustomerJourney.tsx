"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Search,
  ShoppingCart,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

type Stage = {
  icon: LucideIcon;
  title: string;
  tactics: string[];
  iconBg: string;
  iconColor: string;
  accent: string;
};

const stages: Stage[] = [
  {
    icon: Eye,
    title: "Awareness",
    tactics: ["Meta Ads", "Google Ads", "KOL Activation"],
    iconBg: "bg-[#BDF24A]",
    iconColor: "text-[#06243B]",
    accent: "#BDF24A",
  },
  {
    icon: Search,
    title: "Consideration",
    tactics: ["Content & Social", "Marketplace Optimization", "Retargeting"],
    iconBg: "bg-[#FF7E00]",
    iconColor: "text-white",
    accent: "#FF7E00",
  },
  {
    icon: ShoppingCart,
    title: "Purchase",
    tactics: ["CPAS Shopee", "TikTok Shop Ads", "Conversion Optimization"],
    iconBg: "bg-[#06243B]",
    iconColor: "text-white",
    accent: "#06243B",
  },
  {
    icon: Repeat,
    title: "Retention",
    tactics: ["CRM & WhatsApp", "Repeat Order Flow", "Loyalty & UGC"],
    iconBg: "bg-[#FF7E00]",
    iconColor: "text-white",
    accent: "#FF7E00",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function CustomerJourney() {
  return (
    <section className="relative bg-[#F7F4EE] section-padding overflow-hidden">
      <div className="container-mote relative">
        <SectionHeading
          eyebrow="Customer Journey"
          title="Di mana Mote bekerja untuk bisnis kamu."
          description="Kebanyakan agency hanya fokus di satu titik. Mote masuk di seluruh tahap—dari pelanggan belum kenal brand, sampai mereka jadi pelanggan setia."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3 items-stretch">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.title}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  className="relative card-soft p-6 flex flex-col gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#06243B]/70">
                      Stage 0{i + 1}
                    </span>
                    <span
                      className={`h-12 w-12 rounded-full ${stage.iconBg} ${stage.iconColor} flex items-center justify-center shadow-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#06243B]">
                    {stage.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5 text-sm text-[#3D4F60]">
                    {stage.tactics.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: stage.accent }}
                        />
                        {t}
                      </li>
                    ))}
                  </ul>

                  {i < stages.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-[#BDF24A] text-[#06243B] items-center justify-center shadow-md"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 rounded-2xl bg-gradient-to-r from-[#BDF24A] via-[#BDF24A] to-[#FF7E00]/70 p-[2px]"
          >
            <div className="rounded-xl bg-[#BDF24A] px-6 py-4 text-center text-sm sm:text-base font-bold text-[#06243B]">
              Mote bekerja di seluruh tahap customer journey, bukan cuma di Awareness.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
