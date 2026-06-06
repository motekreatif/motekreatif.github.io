"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function PageHero({
  eyebrow,
  title,
  description,
  highlight,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Words within `title` to wrap with the yellow highlight (case-sensitive substring). */
  highlight?: string;
  actions?: ReactNode;
}) {
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return title;
    }
    const [before, after] = title.split(highlight);
    return (
      <>
        {before}
        <span className="highlight-text">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <section
      className="relative isolate overflow-hidden text-[#06243B] grain-overlay"
      style={{
        background:
          "linear-gradient(135deg, #F4D23A 0%, #F7DF75 50%, #F4D23A 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full bg-[#BDF24A]/40 blur-3xl z-0"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-[#FF7E00]/20 blur-3xl z-0"
      />

      {/* Subtle decorative ribbons */}
      <div
        className="absolute inset-x-0 top-[15%] h-[220px] z-0 hidden sm:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="a"
          color="#BDF24A"
          opacity={0.5}
          strokeWidth={40}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-[5%] h-[220px] z-0 hidden sm:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="b"
          color="#FF7E00"
          opacity={0.3}
          strokeWidth={38}
          delay={0.3}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="container-mote relative z-10 pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl flex flex-col gap-5"
        >
          <motion.span
            variants={item}
            className="eyebrow eyebrow-on-yellow self-start"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={item}
            className="font-extrabold leading-[1.05] tracking-tight text-[#06243B] text-balance"
          >
            {renderTitle()}
          </motion.h1>
          {description && (
            <motion.p
              variants={item}
              className="text-base sm:text-lg lg:text-xl text-[#06243B]/75 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          {actions && (
            <motion.div variants={item} className="flex flex-wrap gap-3 mt-2">
              {actions}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
