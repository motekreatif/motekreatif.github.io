import { Clock } from "lucide-react";

/**
 * Small "± N menit" pill used in hero rows and step headers.
 * `tone="dark"` untuk dipakai di atas blok ink (hero).
 */
export function DurationPill({
  children,
  tone = "light",
}: {
  children: string;
  tone?: "light" | "dark";
}) {
  if (tone === "dark") {
    return (
      <span className="inline-flex items-center gap-[0.4rem] text-[0.8rem] font-semibold text-white bg-white/10 border border-white/15 px-3 py-[0.35rem] rounded-full">
        <Clock className="h-3.5 w-3.5 text-[#F7C526]" />
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-[0.4rem] text-[0.8rem] font-semibold text-[#191919] bg-[#191919]/[0.07] px-3 py-[0.35rem] rounded-full">
      <Clock className="h-3.5 w-3.5 text-[#191919]/55" />
      {children}
    </span>
  );
}
