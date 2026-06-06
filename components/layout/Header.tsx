"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };
  const scheduleCloseProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled || mobileOpen
          ? "bg-[#06243B]/92 backdrop-blur-lg shadow-[0_10px_32px_-12px_rgba(0,0,0,0.35)] border-[#BDF24A]/15"
          : "bg-[#06243B] border-transparent"
      )}
    >
      <div className="container-mote flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label="Mote Kreatif Home">
          <Image
            src="/img/wlogogramsquare.webp"
            alt="Mote Kreatif"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-white font-extrabold tracking-tight text-lg hidden sm:inline">
            
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openProducts}
                  onMouseLeave={scheduleCloseProducts}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors",
                      isActive(link.href)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        productsOpen && "rotate-180"
                      )}
                    />
                    {isActive(link.href) && (
                      <span
                        aria-hidden
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-[#BDF24A] rounded-full"
                      />
                    )}
                  </Link>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden"
                      >
                        <div className="p-2">
                          <Link
                            href="/products"
                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#F7F4EE] font-semibold text-[#06243B]"
                          >
                            Semua Produk →
                          </Link>
                          <div className="h-px bg-black/5 my-1 mx-3" />
                          {PRODUCTS.map((p) => (
                            <a
                              key={p.name}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-[#F7F4EE] transition-colors group"
                            >
                              <p.icon className="h-5 w-5 mt-0.5 text-[#06243B] shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-[#06243B]">
                                    {p.name}
                                  </span>
                                  {p.status === "Coming Soon" && (
                                    <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#BDF24A] text-[#06243B]">
                                      Soon
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#3D4F60] line-clamp-1">
                                  {p.tagline}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-[#BDF24A] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="btn btn-primary text-sm"
          >
            Mulai Diskusi
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full text-white hover:bg-white/10"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#06243B] border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="container-mote py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.href} className="flex flex-col">
                      <div className="flex items-stretch">
                        <Link
                          href={link.href}
                          className={cn(
                            "flex-1 px-4 py-3 rounded-l-xl font-semibold border-l-2",
                            isActive(link.href)
                              ? "border-[#BDF24A] text-white bg-white/[0.04]"
                              : "border-transparent text-white hover:bg-white/10"
                          )}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileProductsOpen((v) => !v)}
                          className={cn(
                            "px-3 rounded-r-xl",
                            mobileProductsOpen ? "bg-white/10" : "hover:bg-white/10"
                          )}
                          aria-label="Toggle products list"
                          aria-expanded={mobileProductsOpen}
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-white transition-transform",
                              mobileProductsOpen && "rotate-180"
                            )}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3 py-2 flex flex-col gap-1">
                              {PRODUCTS.map((p) => (
                                <a
                                  key={p.name}
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/85 hover:bg-white/10"
                                >
                                  <p.icon className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {p.name}
                                  </span>
                                  {p.status === "Coming Soon" && (
                                    <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#BDF24A] text-[#06243B]">
                                      Soon
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl font-semibold border-l-2",
                      isActive(link.href)
                        ? "border-[#BDF24A] text-white bg-white/[0.04]"
                        : "border-transparent text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link href="/contact" className="btn btn-primary mt-3 self-start">
                Mulai Diskusi
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
