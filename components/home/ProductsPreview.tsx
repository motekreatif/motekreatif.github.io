"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PRODUCTS } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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

const PRODUCT_ICON_GRADIENTS = [
  "linear-gradient(135deg, #BDF24A 0%, #FF7E00 100%)",
  "linear-gradient(135deg, #06243B 0%, #FF7E00 100%)",
  "linear-gradient(135deg, #FF7E00 0%, #06243B 100%)",
  "linear-gradient(135deg, #FF7E00 0%, #06243B 100%)",
  "linear-gradient(135deg, #FF7E00 0%, #FF7E00 100%)",
];

const PRODUCT_ICON_COLORS = ["#06243B", "#fff", "#fff", "#fff", "#fff"];

export function ProductsPreview() {
  return (
    <section className="bg-[#F7F4EE] section-padding">
      <div className="container-mote">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Produk Digital"
            title="Produk digital kami."
            description="Lima SaaS yang kami pakai sendiri sebelum kami jual ke kamu. Karena tools yang bagus lahir dari kebutuhan nyata."
          />
          <Link
            href="/products"
            className="self-start lg:self-end inline-flex items-center gap-2 text-[#06243B] font-bold hover:gap-3 transition-all"
          >
            Lihat Semua Produk
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            const iconBg = PRODUCT_ICON_GRADIENTS[i % PRODUCT_ICON_GRADIENTS.length];
            const iconColor = PRODUCT_ICON_COLORS[i % PRODUCT_ICON_COLORS.length];
            return (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative card-soft p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: iconBg, color: iconColor }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                      product.status === "Live"
                        ? "bg-[#06243B] text-white"
                        : "bg-[#BDF24A] text-[#06243B]"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#06243B] mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-[#3D4F60] text-sm leading-relaxed line-clamp-3">
                    {product.tagline}
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center justify-between text-sm">
                  <span className="text-[#06243B] font-bold">
                    {product.price ?? "Buka produk"}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[#3D4F60] group-hover:text-[#06243B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
