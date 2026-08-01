import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const VARIANT_STYLES = {
  calm: {
    wrap: "bg-[#F7F8FA] border-black/8 text-[#06243B]",
    icon: "text-[#06243B]/45",
    label: "text-[#06243B]/50",
  },
  check: {
    wrap: "bg-[#FF7E00]/[0.07] border-[#FF7E00]/35 text-[#06243B]",
    icon: "text-[#FF7E00]",
    label: "text-[#FF7E00]",
  },
  stop: {
    wrap: "bg-[#06243B] border-[#06243B] text-white",
    icon: "text-[#BDF24A]",
    label: "text-[#BDF24A]",
  },
} as const;

/** The three callout tiers from the setup preview: calm (info), check (needs attention), stop (destructive warning). */
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
          <span className={cn("block text-[0.7rem] font-extrabold uppercase tracking-wider mb-0.5", styles.label)}>
            {label}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
