"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type RibbonVariant = "a" | "b" | "c" | "d";

interface RibbonProps {
  className?: string;
  color?: string;
  variant?: RibbonVariant;
  animated?: boolean;
  opacity?: number;
  strokeWidth?: number;
  delay?: number;
}

const PATHS: Record<RibbonVariant, string> = {
  a: "M-50,150 C150,40 280,210 480,110 C680,10 820,170 1020,90 C1200,20 1320,130 1480,70",
  b: "M-50,80 C150,210 320,30 520,150 C720,260 880,60 1080,180 C1240,270 1380,110 1500,160",
  c: "M-50,210 C120,110 280,260 480,140 C680,30 860,210 1060,120 C1260,40 1380,170 1500,90",
  d: "M-50,120 C200,250 380,50 600,170 C820,290 1000,80 1200,200 C1340,280 1430,160 1500,200",
};

export function RibbonDecoration({
  className,
  color = "#BDF24A",
  variant = "a",
  animated = true,
  opacity = 0.3,
  strokeWidth = 48,
  delay = 0,
}: RibbonProps) {
  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated
  ? {
      initial: { opacity: 0 },
      animate: { opacity },
      transition: { duration: 1.4, ease: "easeOut" as const, delay },
    }
  : { style: { opacity } };

  return (
    <Wrapper
      className={cn("pointer-events-none select-none", className)}
      viewBox="0 0 1400 300"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      {...wrapperProps}
    >
      <motion.path
        d={PATHS[variant]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, pathOffset: 0 } : undefined}
        animate={animated ? {
          pathLength: 1,
          pathOffset: [0, 0.3, 0, -0.3, 0],
        } : undefined}
        transition={animated ? {
          pathLength: {
            duration: 2,
            ease: "easeInOut",
            delay: delay + 0.1,
          },
          pathOffset: {
            duration: variant === "a" ? 15 : variant === "b" ? 20 : variant === "c" ? 12 : 18,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay + 2.5,
          },
        } : undefined}
      />
    </Wrapper>
  );
}
