"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

export function CTASection() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden grain-overlay"
      style={{
        background:
          "linear-gradient(135deg, #BDF24A 0%, #CDF56A 45%, #BDF24A 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-[#06243B]/10 blur-3xl z-0"
      />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#FF7E00]/25 blur-3xl z-0"
      />

      {/* Ribbon decorations */}
      <div
        className="absolute inset-x-0 top-[5%] h-[260px] z-0 hidden md:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="b"
          color="#FF7E00"
          opacity={0.32}
          strokeWidth={50}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-[5%] h-[240px] z-0 hidden md:block"
        aria-hidden
      >
        <RibbonDecoration
          variant="c"
          color="#06243B"
          opacity={0.12}
          strokeWidth={40}
          delay={0.3}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="container-mote relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center"
        >
          <span className="eyebrow bg-[#06243B] text-[#BDF24A]">
            Siap mulai?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#06243B] text-balance">
            Siap scale penjualan brand kamu?
          </h2>
          <p className="text-base sm:text-lg text-[#06243B]/85 max-w-xl">
            Diskusi 30 menit, Gratis. Kami review kondisi bisnis kamu dan kasih rekomendasi — cocok atau tidak, kami jujur bilang.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark group"
            >
              <MessageCircle className="h-4 w-4" />
              Chat via WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost">
              <Mail className="h-4 w-4" />
              Kirim Email
            </a>
          </div>
          <p className="text-sm italic text-[#06243B]/65 mt-1">
            Kalau cocok, kami submit proposal. <br />Kalau tidak fit, kami jujur bilang.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
