"use client";

import { motion } from "framer-motion";
import { MessageCircle, ClipboardCheck, FileText, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CONTACT } from "@/lib/constants";

const steps = [
  {
    icon: MessageCircle,
    title: "Chat via WhatsApp",
    text: "Ceritakan kondisi bisnis kamu. Santai, langsung ke orangnya—bukan bot.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit Gratis 30 Menit",
    text: "Kami review akun ads, marketplace, dan funnel kamu. Gratis, tanpa komitmen.",
  },
  {
    icon: FileText,
    title: "Proposal + Fee Transparan",
    text: "Kalau cocok, kami kirim rencana kerja dan fee yang jelas. Kalau tidak fit, kami jujur bilang.",
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

export function StartHere() {
  return (
    <section className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <SectionHeading
          eyebrow="Mulai Bareng Mote"
          title="Gampang mulainya. Gratis di depan."
          description="Nggak ada proses ribet. Tiga langkah, dan kamu sudah tahu apakah Mote cocok untuk brand kamu."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="relative card-soft p-7 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-[#06243B]/15 leading-none">
                    0{i + 1}
                  </span>
                  <span className="h-12 w-12 rounded-2xl bg-[#BDF24A] text-[#06243B] flex items-center justify-center shadow-sm">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#06243B]">
                  {s.title}
                </h3>
                <p className="text-[#3D4F60] leading-relaxed">{s.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Qualifier + CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-2xl bg-[#06243B] p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#BDF24A]">
              Cocok untuk
            </span>
            <p className="text-white font-semibold text-lg leading-snug max-w-xl">
              Brand dengan budget iklan mulai{" "}
              <span className="text-[#BDF24A]">Rp 10 juta/bulan</span> yang serius
              mau scale—bukan sekadar coba-coba.
            </p>
          </div>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            Cek Kecocokan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
