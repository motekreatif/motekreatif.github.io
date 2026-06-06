"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Sparkles,
  Store,
  TrendingUp,
} from "lucide-react";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const proofPoints = ["ROAS +20x", "Revenue +157%", "MER 0.44%"];

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const ribbonY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ribbonY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ribbonY3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden text-[#06243B] grain-overlay min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #F4D23A 0%, #F7DF75 50%, #F4D23A 100%)",
      }}
    >
      {/* Soft glow halos (kept subtle for depth) */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#BDF24A]/40 blur-3xl z-0"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full bg-[#FF7E00]/25 blur-3xl z-0"
      />

      {/* Organic flowing ribbons */}
      <motion.div
        style={{ y: ribbonY1 }}
        className="absolute inset-x-0 top-[10%] h-[260px] z-0 hidden sm:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="a"
          color="#BDF24A"
          opacity={0.55}
          strokeWidth={50}
          delay={0.1}
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>

      <motion.div
        style={{ y: ribbonY2 }}
        className="absolute inset-x-0 top-[35%] h-[260px] z-0 hidden sm:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="b"
          color="#FF7E00"
          opacity={0.4}
          strokeWidth={44}
          delay={0.35}
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>

      <motion.div
        style={{ y: ribbonY3 }}
        className="absolute inset-x-0 bottom-[5%] h-[260px] z-0 hidden sm:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="c"
          color="#06243B"
          opacity={0.22}
          strokeWidth={42}
          delay={0.55}
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>

      {/* Mobile: very subtle single ribbon */}
      <div
        className="absolute inset-x-0 top-[40%] h-[200px] z-0 sm:hidden"
        aria-hidden
      >
        <RibbonDecoration
          variant="a"
          color="#BDF24A"
          opacity={0.35}
          strokeWidth={40}
          delay={0.1}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="container-mote relative z-10 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 eyebrow eyebrow-on-yellow">
              <Sparkles className="h-3.5 w-3.5" />
              Digital Marketing Consultant
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-extrabold leading-[1.05] tracking-tight text-[#06243B] text-balance"
          >
            Brand kamu punya produk bagus, tapi penjualan{" "}
            <span className="highlight-text">belum maksimal?</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg lg:text-xl text-[#06243B]/75 max-w-2xl leading-relaxed"
          >
            Kami bantu scale penjualan lewat Konten yang berfokus ke Outcome,
            KOL dengan Persona yang tepat Ads yang efisien + Marketplace dengan
            pendekatan data-driven. — fokus ke angka yang penting:{" "}
            <b>revenue dan ROAS</b>.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#06243B] font-bold text-sm sm:text-base"
          >
            {proofPoints.map((p, i) => (
              <span key={p} className="inline-flex items-center gap-2">
                {p}
                {i < proofPoints.length - 1 && (
                  <span aria-hidden className="text-[#06243B]/30">
                    ·
                  </span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <Link href="/contact" className="btn btn-dark group">
              Mulai Diskusi
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#case-studies"
              className="inline-flex items-center gap-2 font-semibold text-[#06243B] hover:text-[#FF7E00] transition-colors"
            >
              Lihat Hasil Kerja
              <ArrowDown className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <FlowDiagram />
        </motion.div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  const nodeBase =
    "rounded-2xl px-5 py-4 bg-white border border-black/5 shadow-[0_14px_30px_-20px_rgba(6,36,59,0.4)]";
  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`${nodeBase} flex items-center gap-3`}
      >
        <span className="h-10 w-10 rounded-xl bg-[#06243B]/10 text-[#06243B] flex items-center justify-center">
          <Store className="h-5 w-5" />
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-[#FF7E00]">
            Start
          </div>
          <div className="font-extrabold text-[#06243B]">Brand Kamu</div>
        </div>
      </motion.div>

      <Arrow delay={0.5} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.85 }}
        whileHover={{ y: -2 }}
        className="rounded-xl px-5 py-5 bg-gradient-to-br from-[#BDF24A] via-[#BDF24A] to-[#A6D636] text-[#06243B] shadow-[0_20px_60px_-15px_rgba(189,242,74,0.65)]"
      >
        <div className="text-[10px] uppercase tracking-widest font-bold">
          Mote
        </div>
        <div className="font-extrabold text-lg leading-tight mt-1">
          Strategy + Activation + Optimization
        </div>
        <p className="text-[13px] mt-1 text-[#06243B]/80 leading-snug">
          Funnel terstruktur. Paid Activation efisien. Sales Channel yang
          optimal.
        </p>
      </motion.div>

      <Arrow delay={1.0} />

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.15 }}
        className={`${nodeBase} flex items-center gap-3`}
      >
        <span className="h-10 w-10 rounded-xl bg-[#06243B]/10 text-[#06243B] flex items-center justify-center">
          <TrendingUp className="h-5 w-5" />
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-[#FF7E00]">
            Outcome
          </div>
          <div className="font-extrabold text-[#06243B]">Revenue Naik</div>
        </div>
      </motion.div>
    </div>
  );
}

function Arrow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.4, delay }}
      style={{ transformOrigin: "top" }}
      className="self-center flex flex-col items-center"
      aria-hidden
    >
      <motion.span
        className="w-px h-3 bg-[#06243B]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="w-2 h-2 rotate-45 -mt-1 border-r-2 border-b-2 border-[#06243B]" />
    </motion.div>
  );
}
