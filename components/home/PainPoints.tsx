"use client";

import { motion } from "framer-motion";
import {
  CircleDollarSign,
  Store,
  TrendingDown,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

type Pain = {
  icon: LucideIcon;
  text: string;
  iconBg: string;
  iconColor: string;
};

const pains: Pain[] = [
  {
    icon: TrendingDown,
    text: "Sudah ngiklan tapi ROAS di bawah 3x—budget habis, hasil belum kelihatan.",
    iconBg: "bg-[#FF7E00]/15",
    iconColor: "text-[#FF7E00]",
  },
  {
    icon: Store,
    text: "Toko Shopee/TikTok Shop sudah ada tapi traffic dan konversi stagnan.",
    iconBg: "bg-[#FF7E00]/15",
    iconColor: "text-[#FF7E00]",
  },
  {
    icon: Users,
    text: "Tim marketing ada tapi belum bisa baca data dan optimize campaign.",
    iconBg: "bg-[#BDF24A]/45",
    iconColor: "text-[#FF7E00]",
  },
  {
    icon: CircleDollarSign,
    text: "Budget marketing habis tapi nggak tau mana channel yang menghasilkan.",
    iconBg: "bg-[#06243B]/15",
    iconColor: "text-[#FF7E00]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function PainPoints() {
  return (
    <section className="relative bg-[#F7F4EE] section-padding overflow-hidden">
      <div className="container-mote relative">
        <SectionHeading
          eyebrow="Yang sering kami dengar"
          title="Apakah ini yang kamu rasakan?"
          description="Kalau salah satu kedengeran familiar, kamu tidak sendirian. Empat keluhan ini muncul di hampir setiap discovery call yang kami lakukan."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
        >
          {pains.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.text}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="card-soft p-5 sm:p-6 flex items-start gap-4 group"
              >
                <motion.span
                  className={`h-12 w-12 shrink-0 rounded-full ${p.iconBg} ${p.iconColor} flex items-center justify-center`}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </motion.span>
                <p className="text-[#06243B] font-semibold leading-snug">
                  {p.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
