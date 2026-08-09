import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const VARIANT_STYLES = {
  calm: {
    wrap: "bg-[#EFEFEC] border-[rgba(25,25,25,0.10)] text-[#191919]",
    icon: "text-[#191919]/45",
    label: "text-[#191919]/50",
  },
  check: {
    wrap: "bg-[#F1F1EE] border-[#F7C526]/70 text-[#191919]",
    icon: "text-[#191919]",
    label: "text-[#191919]/70",
  },
  stop: {
    wrap: "bg-[#191919] border-[#191919] text-white",
    icon: "text-[#F7C526]",
    label: "text-[#F7C526]",
  },
} as const;

/** The three callout tiers: calm (info), check (needs attention), stop (destructive warning). */
export function NoteCallout({
  variant = "calm",
  icon: Icon,
  label,
  children,
  className,
}: {
  variant?: keyof typeof VARIANT_STYLES;
  icon: LucideIcon;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const styles = VARIANT_STYLES[variant];
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border px-[1.15rem] py-4 text-[0.95rem] leading-relaxed",
        styles.wrap,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", styles.icon)} strokeWidth={2.2} />
      <div>
        {label && (
          <span className={cn("block text-[0.7rem] font-bold uppercase tracking-wider mb-0.5", styles.label)}>
            {label}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
