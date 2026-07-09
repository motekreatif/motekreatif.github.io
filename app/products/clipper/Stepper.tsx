"use client";

import { useState } from "react";
import { Clipboard, Sparkles, Wand2, Download, Play, Check } from "lucide-react";

const NAVY = "#06243B";

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
      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 py-3">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#FF0000]/90 text-white text-[10px] font-bold">
          ▶
        </span>
        <span className="font-mono text-[13px] text-[#06243B]/80 truncate">
          youtu.be/aH3n8x9WgXc
        </span>
      </div>
      <div className="text-center text-[11px] uppercase tracking-widest text-[#06243B]/35">
        Tekan enter untuk ambil
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#F7F8FA] p-3">
        <div className="h-12 w-16 shrink-0 rounded-lg bg-gradient-to-br from-[#06243B]/80 to-[#06243B]/40" />
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[13px] font-semibold text-[#06243B] truncate">
            Podcast Ep. 42 — Rahasia Produktivitas
          </span>
          <span className="text-[11px] text-[#06243B]/50">@channelkamu · 2:34:15</span>
        </div>
        <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#BDF24A]">
          <Check className="h-3.5 w-3.5 text-[#06243B]" strokeWidth={3} />
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
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#06243B]/40">
        <span>Momen terbaik</span>
        <span className="text-[#06243B]/60">7 klip · 09:57</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.t}
          className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3.5 py-2.5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#06243B] text-[#BDF24A]">
            <Play className="h-3.5 w-3.5" fill="currentColor" />
          </span>
          <span className="text-[13px] font-medium text-[#06243B] truncate flex-1">{r.t}</span>
          <span className="shrink-0 rounded-full bg-[#BDF24A]/25 px-2 py-0.5 text-[11px] font-bold text-[#06243B]">
            {r.s}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScreenRender() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative aspect-[9/16] w-32 overflow-hidden rounded-xl border border-black/10 bg-gradient-to-b from-[#06243B]/85 to-[#06243B]/55">
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/15 backdrop-blur">
          <Play className="h-4 w-4 text-white" fill="currentColor" />
        </div>
        <div className="absolute inset-x-2 bottom-3 flex flex-col items-center gap-1">
          <span className="rounded bg-[#BDF24A] px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-[#06243B]">
            fokus itu
          </span>
          <span className="rounded bg-[#BDF24A] px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-[#06243B]">
            skill, bukan bakat
          </span>
        </div>
      </div>
      <ul className="flex flex-col gap-2 text-[12px] text-[#06243B]/75">
        {["Caption otomatis", "Reframe wajah 9:16", "Hook di 3 detik awal"].map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#BDF24A]">
              <Check className="h-2.5 w-2.5 text-[#06243B]" strokeWidth={3.5} />
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
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#06243B]/40">
        <span>Folder</span>
        <span className="font-mono text-[#06243B]/60">./clips</span>
      </div>
      {["klip-01-fokus.mp4", "klip-02-pagi.mp4", "klip-03-mitos.mp4"].map((f, i) => (
        <div
          key={f}
          className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3.5 py-2.5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F7F8FA] text-[#06243B]">
            <Play className="h-3 w-3" fill="currentColor" />
          </span>
          <span className="font-mono text-[12px] text-[#06243B] truncate flex-1">{f}</span>
          <span className="shrink-0 text-[11px] text-[#06243B]/45">{9 - i}.{i}MB</span>
          <Download className="h-4 w-4 shrink-0 text-[#06243B]/50" />
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
    tab: "Render caption",
    eyebrow: "Langkah 03 / 04",
    title: "Render caption + reframe",
    body: "Tiap klip di-render jadi vertikal 9:16: caption menyala otomatis, wajah selalu ke-frame, dan hook ditaruh di detik-detik awal.",
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

const ICONS = [Clipboard, Sparkles, Wand2, Download];

export function Stepper() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Mock screen (top on mobile, left on desktop) */}
        <div className="order-1">
          <div className="rounded-2xl border border-black/10 bg-white shadow-[0_24px_60px_-30px_rgba(6,36,59,0.4)]">
            <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#06243B]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#06243B]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#06243B]/15" />
              <span className="ml-2 font-mono text-[11px] text-[#06243B]/45">localhost:3060</span>
            </div>
            <div className="p-5 sm:p-6 min-h-[220px] flex flex-col justify-center">{step.screen}</div>
          </div>
        </div>

        {/* Copy (below on mobile, right on desktop) */}
        <div className="order-2 flex flex-col gap-4">
          <span className="font-mono text-[13px] font-semibold tracking-wide text-[#06243B]/45">
            {step.eyebrow.replace("Langkah", "STEP").toUpperCase()}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06243B]">{step.title}</h3>
          <p className="text-[#3D4F60] leading-relaxed text-[15px] sm:text-base">{step.body}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-xl border border-black/10 bg-black/5">
        {STEPS.map((s, i) => {
          const Icon = ICONS[i];
          const on = i === active;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`flex items-center justify-center gap-2 px-3 py-3.5 text-[12px] sm:text-[13px] font-semibold transition-colors ${
                on
                  ? "bg-white text-[#06243B]"
                  : "bg-[#F7F8FA] text-[#06243B]/50 hover:text-[#06243B]/80"
              }`}
              style={on ? { boxShadow: `inset 0 -2px 0 0 ${NAVY}` } : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2.2} />
              <span className="truncate">{s.tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
