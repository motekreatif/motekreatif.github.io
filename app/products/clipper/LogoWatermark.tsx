import { LogoCR } from "./LogoCR";

/**
 * Monogram CR sebagai aksesori latar: besar, sangat samar, dan sengaja
 * terpotong tepi blok. Tugasnya menjaga logo tetap ikut hadir sepanjang orang
 * scroll — bukan minta dilihat. Karena itu opasitasnya dipatok di bawah 10%
 * dan tiap blok cuma boleh dapat satu.
 *
 * Induknya WAJIB punya `relative overflow-hidden`, kalau tidak logonya bakal
 * bocor keluar dari sudut membulat blok.
 *
 * Warna ikut `text-*` yang dioper lewat className (LogoCR pakai currentColor).
 */
export function LogoWatermark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute select-none ${className ?? ""}`}>
      <LogoCR className="h-auto w-full" />
    </span>
  );
}
