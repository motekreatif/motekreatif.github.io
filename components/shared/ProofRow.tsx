import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "yellow" | "cream" | "navy";
export type ProofItem = { value: ReactNode; label: string; href?: string; ariaLabel?: string };

const LINE: Record<Tone, string> = {
  yellow: "border-[var(--line-on-yellow)]",
  cream: "border-[var(--line-on-cream)]",
  navy: "border-[var(--line-on-navy)]",
};
const NUM: Record<Tone, string> = { yellow: "text-[#06243B]", cream: "text-[#06243B]", navy: "text-white" };
const LABEL: Record<Tone, string> = { yellow: "text-[#06243B]/80", cream: "text-[#3D4F60]", navy: "text-[#EFEBDD]/80" };

export function ProofRow({
  items,
  tone,
  numSize = "lg",
  mobileLayout = "stack",
}: {
  items: ProofItem[];
  tone: Tone;
  numSize?: "lg" | "sm";
  mobileLayout?: "stack" | "grid2";
}) {
  const numClass = numSize === "lg" ? "stat-num" : "stat-num-sm";
  const wrapper = mobileLayout === "grid2" ? "grid grid-cols-2 md:grid" : "flex flex-col md:grid";
  return (
    <div className={wrapper} style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
      {items.map((it, i) => {
        const inner = (
          <>
            <span className={`${numClass} ${NUM[tone]} min-w-[5.5ch]`}>{it.value}</span>
            <span className={`text-base leading-snug ${LABEL[tone]}`}>{it.label}</span>
          </>
        );
        const cell =
          mobileLayout === "stack"
            ? `flex items-center gap-4 min-h-[64px] py-3 ${i > 0 ? `border-t ${LINE[tone]}` : ""} md:flex-col md:items-start md:gap-2 md:py-0 md:border-t-0 md:px-6 ${i > 0 ? `md:border-l ${LINE[tone]}` : "md:pl-0"}`
            : `flex flex-col gap-2 py-3 px-4 first:pl-0 ${i % 2 === 1 ? `border-l ${LINE[tone]}` : ""} md:px-6 md:border-l-0 ${i > 0 ? `md:border-l ${LINE[tone]}` : "md:pl-0"}`;
        return it.href ? (
          <Link
            key={it.label}
            href={it.href}
            aria-label={it.ariaLabel ?? it.label}
            className={`${cell} group transition-colors duration-200 hover:text-[#FF7E00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#06243B]`}
          >
            {inner}
          </Link>
        ) : (
          <div key={it.label} className={cell}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
