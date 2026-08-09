"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Play, Check } from "lucide-react";

type Step = {
  key: string;
  tab: string;
  eyebrow: string;
  title: string;
  body: string;
  screen: React.ReactNode;
};

/* ── Per-step mock "screens" (built from divs, no images) ───────────────── */

function ScreenPaste() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-full border border-[rgba(25,25,25,0.10)] bg-white px-3.5 py-3">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#FF0000]/90 text-white text-[10px] font-bold">
          ▶
        </span>
        <span className="font-mono text-[13px] text-[#191919]/80 truncate">
          youtu.be/aH3n8x9WgXc
        </span>
      </div>
      <div className="text-center text-[11px] uppercase tracking-widest text-[#191919]/35">
        Tekan enter untuk ambil
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-[rgba(25,25,25,0.10)] bg-[#EFEFEC] p-3">
        <div className="h-12 w-16 shrink-0 rounded-lg bg-gradient-to-br from-[#191919]/80 to-[#191919]/40" />
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[13px] font-semibold text-[#191919] truncate">
            Podcast Ep. 42 — Rahasia Produktivitas
          </span>
          <span className="text-[11px] text-[#191919]/50">@channelkamu · 2:34:15</span>
        </div>
        <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F7C526]">
          <Check className="h-3.5 w-3.5 text-[#191919]" strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}

function ScreenAnalyze() {
  const rows = [
    { t: "Cara fokus tanpa distraksi", s: 94 },
    { t: "Rutinitas pagi yang salah", s: 89 },
    { t: "Mitos multitasking", s: 82 },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#191919]/40">
        <span>Momen terbaik</span>
        <span className="text-[#191919]/60">7 klip · 09:57</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.t}
          className="flex items-center gap-3 rounded-full border border-[rgba(25,25,25,0.10)] bg-white px-3.5 py-2.5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#191919] text-[#F7C526]">
            <Play className="h-3.5 w-3.5" fill="currentColor" />
          </span>
          <span className="text-[13px] font-medium text-[#191919] truncate flex-1">{r.t}</span>
          <span className="shrink-0 rounded-full bg-[#F7C526]/30 px-2 py-0.5 text-[11px] font-bold text-[#191919]">
            {r.s}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * The 9:16 tile here is a REAL frame rendered by the app (same asset the
 * product's own style picker shows), not a CSS mock-up. The rest of this file
 * still draws its screens from divs, which is fine for a link box or a file
 * list; it is not fine for the one step whose whole promise is "look how the
 * output turns out".
 */
function ScreenRender() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative aspect-[9/16] w-32 shrink-0 overflow-hidden rounded-xl border border-[rgba(25,25,25,0.10)] bg-[#191919]">
        <Image
          src="/img/clipper/styles/bundle-viral.webp"
          alt="Klip vertikal hasil render Clipper dengan caption karaoke"
          fill
          sizes="128px"
          className="object-cover"
          unoptimized
        />
      </div>
      <ul className="flex flex-col gap-2 text-[12px] text-[#191919]/75">
        {["8 gaya caption", "3 cara ngepasin frame", "Kartu hook di awal klip"].map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#F7C526]">
              <Check className="h-2.5 w-2.5 text-[#191919]" strokeWidth={3.5} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScreenDownload() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#191919]/40">
        <span>Folder</span>
        <span className="font-mono text-[#191919]/60">./clips</span>
      </div>
      {["klip-01-fokus.mp4", "klip-02-pagi.mp4", "klip-03-mitos.mp4"].map((f, i) => (
        <div
          key={f}
          className="flex items-center gap-3 rounded-full border border-[rgba(25,25,25,0.10)] bg-white px-3.5 py-2.5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EFEFEC] text-[#191919]">
            <Play className="h-3 w-3" fill="currentColor" />
          </span>
          <span className="font-mono text-[12px] text-[#191919] truncate flex-1">{f}</span>
          <span className="shrink-0 text-[11px] text-[#191919]/45">{9 - i}.{i}MB</span>
          <Download className="h-4 w-4 shrink-0 text-[#191919]/50" />
        </div>
      ))}
    </div>
  );
}

const STEPS: Step[] = [
  {
    key: "paste",
    tab: "Tempel link",
    eyebrow: "Langkah 01 / 04",
    title: "Tempel link YouTube",
    body: "Podcast, webinar, wawancara, live — tempel URL-nya, Clipper langsung ambil videonya. Semua diproses di komputer kamu, gak upload ke mana-mana.",
    screen: <ScreenPaste />,
  },
  {
    key: "analyze",
    tab: "AI pilih momen",
    eyebrow: "Langkah 02 / 04",
    title: "AI pilih momen terbaik",
    body: "AI transkrip seluruh video, lalu cari bagian paling menarik dan nge-hook. Kamu tinggal pilih dari daftar klip yang sudah diberi skor.",
    screen: <ScreenAnalyze />,
  },
  {
    key: "render",
    tab: "Pilih gaya",
    eyebrow: "Langkah 03 / 04",
    title: "Pilih gaya, lalu render",
    body: "Klik satu dari empat paket gaya, atau ganti sendiri caption dan framing-nya. Tiap klip di-render jadi vertikal 9:16 dengan caption otomatis dan kartu hook di detik-detik awal.",
    screen: <ScreenRender />,
  },
  {
    key: "download",
    tab: "Download",
    eyebrow: "Langkah 04 / 04",
    title: "Download & posting",
    body: "Klip jadi tersimpan di folder di komputer kamu — buka langsung dari Finder / Explorer. Tinggal posting ke TikTok, Reels, atau Shorts.",
    screen: <ScreenDownload />,
  },
];

export function Stepper() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Mock screen (top on mobile, left on desktop) */}
        <div className="order-1">
          <div className="rounded-[28px] border border-[rgba(25,25,25,0.10)] bg-white shadow-[0_24px_60px_-30px_rgba(25,25,25,0.4)] overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-[rgba(25,25,25,0.06)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5F5F5C]/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5F5F5C]/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5F5F5C]/25" />
              <span className="ml-2 font-mono text-[11px] text-[#5F5F5C]/70">localhost:3060</span>
            </div>
            <div className="p-5 sm:p-6 min-h-[220px] flex flex-col justify-center">{step.screen}</div>
          </div>
        </div>

        {/* Copy (below on mobile, right on desktop) */}
        <div className="order-2 flex flex-col gap-4">
          <span className="font-mono text-[13px] font-semibold tracking-wide text-[#191919]/45">
            {step.eyebrow.replace("Langkah", "STEP").toUpperCase()}
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#191919]">{step.title}</h3>
          <p className="text-[#5F5F5C] leading-relaxed text-[15px] sm:text-base">{step.body}</p>
        </div>
      </div>

      {/* Tab bar — numbered, clickable steps */}
      <div className="flex flex-col gap-3">
        <p className="text-center text-[12px] sm:text-[13px] text-[#191919]/50">
          Klik tiap langkah untuk lihat detailnya
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`Langkah ${i + 1}: ${s.tab}`}
                className={`group flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 sm:px-5 sm:py-3 text-[12px] sm:text-[13px] font-semibold transition-colors ${
                  on
                    ? "bg-[#F7C526] text-[#191919] border border-transparent"
                    : "bg-white text-[#191919]/55 border border-[rgba(25,25,25,0.12)] hover:text-[#191919]/90 hover:border-[rgba(25,25,25,0.25)]"
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                    on
                      ? "bg-[#191919] text-[#F7C526]"
                      : "bg-[#191919]/10 text-[#191919]/50 group-hover:bg-[#191919]/20"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate">{s.tab}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
