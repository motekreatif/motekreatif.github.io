import { ProofRow } from "@/components/shared/ProofRow";
import { STATS } from "@/lib/data";

// Angka ditulis langsung, tanpa hitung-naik. Versi sebelumnya memulai dari
// useState(0) dan baru menaikkan angkanya setelah hydrate, sehingga HTML yang
// terbit berisi "0+ Klien Dilayani" — itulah yang dibaca crawler, preview
// share, dan browser tanpa JS.
export function StatsSection() {
  return (
    <section className="bg-[#F7F4EE] band-padding border-y border-[var(--line-on-cream)]">
      <div className="container-mote">
        <ProofRow
          tone="cream"
          mobileLayout="grid2"
          items={STATS.map((s) => ({
            value: `${s.value}${s.suffix}`,
            label: s.label,
          }))}
        />
      </div>
    </section>
  );
}
