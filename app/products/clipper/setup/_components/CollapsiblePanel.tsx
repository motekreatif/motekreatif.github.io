import { ChevronDown, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Collapsible `<details>` panel for failure branches (e.g. "virtualization off — 3 causes"),
 * matching the setup preview's `.panel` / `.panel-body`. Uses Tailwind's `group-open:` variant
 * so the chevron rotates without client-side state.
 */
export function CollapsiblePanel({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group rounded-[20px] border border-black/8 bg-white shadow-[0_1px_2px_rgba(6,36,59,0.04),0_14px_30px_-24px_rgba(6,36,59,0.18)] overflow-hidden">
      <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-[1.35rem] py-[1.1rem] font-bold text-[#06243B] text-[0.975rem] [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-[0.6rem]">
          <TriangleAlert className="h-[18px] w-[18px] text-[#FF7E00] shrink-0" />
          {summary}
        </span>
        <ChevronDown className="h-[18px] w-[18px] text-[#06243B]/40 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-[1.1rem] px-[1.35rem] pb-[1.35rem] pt-[1.1rem] border-t border-black/8">
        {children}
      </div>
    </details>
  );
}

export function Branch({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[0.35rem]">
      {title && <div className="font-bold text-[#06243B] text-[0.925rem]">{title}</div>}
      <div className="text-[#3D4F60] text-[0.925rem] leading-relaxed [&_b]:text-[#06243B]">{children}</div>
    </div>
  );
}

export function Divider() {
  return <hr className="h-px bg-black/8 border-none" />;
}
