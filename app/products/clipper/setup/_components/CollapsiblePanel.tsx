import { ChevronDown, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Collapsible `<details>` panel for failure branches (e.g. "virtualization off — 3 causes").
 * Kartu putih membulat; badge segitiga peringatan dalam lingkaran kuning supaya
 * tetap kebaca tanpa jadi rambu bahaya. Uses Tailwind's `group-open:` variant
 * so the chevron rotates without client-side state.
 */
export function CollapsiblePanel({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group rounded-[20px] border border-[rgba(25,25,25,0.10)] bg-white shadow-[0_14px_40px_-30px_rgba(25,25,25,0.35)] overflow-hidden">
      <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-[1.35rem] py-[1.1rem] font-semibold text-[#191919] text-[0.975rem] [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-[0.6rem]">
          <span className="shrink-0 grid place-items-center h-7 w-7 rounded-full bg-[#F7C526] text-[#191919]">
            <TriangleAlert className="h-4 w-4" strokeWidth={2.2} />
          </span>
          {summary}
        </span>
        <span className="shrink-0 grid h-8 w-8 place-items-center rounded-full bg-[#F7C526]">
          <ChevronDown className="h-4 w-4 text-[#191919] transition-transform duration-200 group-open:rotate-180" />
        </span>
      </summary>
      <div className="flex flex-col gap-[1.1rem] px-[1.35rem] pb-[1.35rem] pt-[1.1rem] border-t border-[rgba(25,25,25,0.08)]">
        {children}
      </div>
    </details>
  );
}

export function Branch({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[0.35rem]">
      {title && <div className="font-semibold text-[#191919] text-[0.925rem]">{title}</div>}
      <div className="text-[#5F5F5C] text-[0.925rem] leading-relaxed [&_b]:text-[#191919]">{children}</div>
    </div>
  );
}

export function Divider() {
  return <hr className="h-px bg-[rgba(25,25,25,0.08)] border-none" />;
}
