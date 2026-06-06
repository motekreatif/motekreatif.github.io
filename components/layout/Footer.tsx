import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS, SITE } from "@/lib/constants";
import { PRODUCTS } from "@/lib/data";
import { RibbonDecoration } from "@/components/shared/RibbonDecoration";

export function Footer() {
  return (
    <footer className="relative bg-[#021526] text-white pt-20 pb-10 mt-0 overflow-hidden">
      {/* Subtle ribbon at top */}
      <div
        className="absolute inset-x-0 top-0 h-[180px] z-0 hidden sm:block pointer-events-none"
        aria-hidden
      >
        <RibbonDecoration
          variant="a"
          color="#BDF24A"
          opacity={0.05}
          strokeWidth={36}
          animated={false}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="container-mote relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Mote Kreatif Home">
            <Image
              src="/img/wlogogramsquare.webp"
              alt="Mote Kreatif"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-extrabold tracking-tight">Mote Kreatif</span>
          </Link>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            {SITE.tagline}
          </p>
          <p className="text-white/60 text-xs leading-relaxed max-w-xs">
            {SITE.description}
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-[#BDF24A] hover:text-[#06243B] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-[#BDF24A] hover:text-[#06243B] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-[#BDF24A] hover:text-[#06243B] transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#BDF24A] mb-4">
            Navigasi
          </h3>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/80 hover:text-[#BDF24A] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#BDF24A] mb-4">
            Produk
          </h3>
          <ul className="flex flex-col gap-2.5">
            {PRODUCTS.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#BDF24A] transition-colors text-sm inline-flex items-center gap-2"
                >
                  {p.name}
                  {p.status === "Coming Soon" && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#BDF24A] text-[#06243B]">
                      Soon
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#BDF24A] mb-4">
            Kontak
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#BDF24A] inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> {CONTACT.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white/80 hover:text-[#BDF24A] inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
            </li>
            {CONTACT.offices.map((office) => (
              <li key={office.label} className="text-white/70">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#BDF24A]" />
                  <span>
                    <strong className="text-white font-semibold block text-xs uppercase tracking-wider mb-1">
                      {office.label}
                    </strong>
                    {office.address}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-mote relative z-10 mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-white/60">
        <p>
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
        <p>Made with ketekunan.</p>
      </div>
    </footer>
  );
}
