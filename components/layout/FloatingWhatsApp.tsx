import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

/**
 * Tombol WhatsApp mengambang — selalu terlihat di semua scroll position.
 * Menutup kebocoran konversi: CTA hero hilang setelah scroll, sedangkan momen
 * paling yakin (lihat case study) ada di tengah halaman tanpa tombol kontak.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi gratis via WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#06243B] text-white pl-4 pr-5 py-3 font-bold text-sm shadow-[0_12px_30px_-8px_rgba(6,36,59,0.5)] transition-transform hover:-translate-y-0.5 hover:bg-[#0E3450]"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#BDF24A]/60 animate-ping" />
        <MessageCircle className="relative h-5 w-5 text-[#BDF24A]" />
      </span>
      <span>Konsultasi Gratis</span>
    </a>
  );
}
