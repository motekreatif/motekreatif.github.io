"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ProofRow } from "@/components/shared/ProofRow";
import { STATS } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let start: number | null = null;
    const duration = 900;
    const raf = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return (
    <span ref={ref} className="inline-block min-w-[3ch] tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-[#F7F4EE] band-padding border-y border-[var(--line-on-cream)]">
      <div className="container-mote">
        <ProofRow
          tone="cream"
          mobileLayout="grid2"
          items={STATS.map((s) => ({
            value: <Counter value={s.value} suffix={s.suffix} />,
            label: s.label,
          }))}
        />
      </div>
    </section>
  );
}
