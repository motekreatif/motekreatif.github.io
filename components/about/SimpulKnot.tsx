"use client";

import { useState } from "react";

const LIME = "#BDF24A";
const ORANGE = "#FF7E00";
const WHITE = "#FFFFFF";

// x-region tiap bagian pita (viewBox 500) — left loop / ikatan tengah / right loop+ekor
const REGIONS = [
  { x: 6, w: 222 },
  { x: 228, w: 58 },
  { x: 286, w: 208 },
];

const ITEMS = [
  {
    id: 0,
    color: LIME,
    bg: "rgba(189,242,74,0.12)",
    title: "Mempertemukan",
    desc: "Bakat muda ketemu peluang bisnis & sosial di satu titik — yang tadinya jalan sendiri-sendiri.",
  },
  {
    id: 1,
    color: ORANGE,
    bg: "rgba(255,126,0,0.14)",
    title: "Mengikat kuat",
    desc: "Bukan kolaborasi mampir. Diiket kenceng jadi hubungan yang tahan — biar pertumbuhannya berkelanjutan.",
  },
  {
    id: 2,
    color: WHITE,
    bg: "rgba(255,255,255,0.13)",
    title: "Punya nilai seni",
    desc: "Simpul yang bener itu rapi & indah, bukan kusut. Cara kami nyambungin pun berkarakter — bukan asal tempel.",
  },
];

export function SimpulKnot() {
  const [active, setActive] = useState<number | null>(null);
  const on = (i: number) => setActive(i);
  const off = () => setActive(null);

  return (
    <>
      <span className="eyebrow eyebrow-light">Dari mantik ke saluran</span>

      <div className="flex flex-wrap gap-10 items-center justify-center mt-6">
        {/* SIMPUL — pakai logo MOTE asli (wlogogramsquare) sbg mask, diwarnai per-bagian */}
        <svg viewBox="6 116 488 262" width="330" className="shrink-0 max-w-full" aria-label="Logo simpul MOTE" style={{ overflow: "visible" }}>
          <defs>
            <mask id="simpul-mask">
              {/* logo putih di atas transparan → jadi luminance mask presisi */}
              <image href="/img/wlogogramsquare.webp" x="0" y="0" width="500" height="500" />
            </mask>
          </defs>
          <g mask="url(#simpul-mask)" style={{ pointerEvents: "none" }}>
            {REGIONS.map((r, i) => (
              <rect key={i} x={r.x} y="110" width={r.w} height="280" fill={ITEMS[i].color}
                style={{ opacity: active === null ? 0.92 : active === i ? 1 : 0.14, transition: "opacity .25s" }} />
            ))}
          </g>
          {/* hotzone transparan buat hover gampang */}
          {REGIONS.map((r, i) => (
            <rect key={"h" + i} x={r.x} y="110" width={r.w} height="280" fill="transparent"
              style={{ cursor: "pointer", pointerEvents: "all" }} onMouseEnter={() => on(i)} onMouseLeave={off} onClick={() => on(i)} />
          ))}
        </svg>

        <div className="flex-1 min-w-[280px]">
          <h2 className="text-white">Mantik doang gak cukup. Energi yang nyala tapi gak diarahin cuma jadi kebakaran.</h2>
          <p className="text-lg text-white/80 leading-relaxed mt-5 max-w-[60ch]">
            Jadi kami gak berhenti di mantik — kami kasih saluran. Dan bentuk saluran itu sebuah <b className="text-white">simpul</b>: persis logo kami. Bukan hiasan; itu cara kami mikir. Simpul itu tiga hal sekaligus, dan tiga-tiganya persis kerjaan kami.
          </p>
          <p className="text-[13px] text-white/45 mt-4">↔ Dekatkan kursor ke logo atau ke kartunya — pasangannya nyala bareng.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {ITEMS.map((it) => (
          <div
            key={it.id}
            onMouseEnter={() => on(it.id)}
            onMouseLeave={off}
            onClick={() => on(it.id)}
            className="border rounded-2xl p-5 h-full"
            style={{
              borderColor: active === it.id ? it.color : "rgba(255,255,255,0.12)",
              background: active === it.id ? it.bg : "rgba(255,255,255,0.06)",
              opacity: active !== null && active !== it.id ? 0.5 : 1,
              boxShadow: active === it.id ? `0 12px 30px -12px ${it.color}66` : "none",
              transition: "border-color .2s, background .2s, opacity .2s, box-shadow .2s",
              cursor: "pointer",
            }}
          >
            <b className="text-[1.05rem]" style={{ color: it.color }}>{it.title}</b>
            <span className="block mt-1.5 text-sm text-white/75 leading-relaxed">{it.desc}</span>
          </div>
        ))}
      </div>

      <p className="text-lg text-white/85 leading-relaxed mt-10 max-w-[64ch]">
        Karena buat kami, pertumbuhan kota itu soal <b className="text-white">ngiket tiga utas</b> yang selama ini kececer sendiri-sendiri.
      </p>
    </>
  );
}
