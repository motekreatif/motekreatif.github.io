/**
 * Token skin "Clipper Rumahan" untuk halaman panduan setup — satu sumber
 * supaya tiga halaman setup dan komponen-komponennya sekulit dengan halaman
 * jual (/products/clipper).
 *
 * Palet: Ink #191919 · Kuning #F7C526 · Netral terang #F1F1EE · Kanvas halaman #EFEFEC ·
 * Putih #FFFFFF · Teks sekunder #5F5F5C · Garis rgba(25,25,25,0.10)
 */

export const CARD_BORDER = "border border-[rgba(25,25,25,0.10)]";

export const CHIP_LIGHT =
  "inline-flex items-center rounded-full border border-[rgba(25,25,25,0.14)] bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#191919]";

export const CHIP_DARK =
  "inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-white/70";

export const H2_CLASS =
  "text-[2rem] sm:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.08] text-[#191919]";

export const BODY_CLASS = "text-[15px] sm:text-base leading-relaxed text-[#5F5F5C]";

/** Tombol pill primer — kuning, teks ink. */
export const BTN_YELLOW =
  "inline-flex items-center gap-2 rounded-full bg-[#F7C526] px-6 py-3.5 text-[15px] font-semibold text-[#191919] transition-colors hover:bg-[#ffd84a]";

/** Tombol pill gelap — ink, teks putih (dipakai di area terang). */
export const BTN_INK =
  "inline-flex items-center gap-2 rounded-full bg-[#191919] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-black";

/** Tombol pill outline untuk area gelap. */
export const BTN_OUTLINE_ON_DARK =
  "inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10";

/** Inline `<code>` di paragraf area terang. */
export const INLINE_CODE = "px-1.5 py-0.5 rounded bg-[#191919]/6 font-mono text-[13px]";

/** Blok seksi mengambang di atas kanvas cream. */
export const BLOCK = "rounded-[28px] sm:rounded-[40px]";
