"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Dark terminal-style command block with a copy-to-clipboard button.
 * Halaman kerja: blok perintah tetap gelap dengan teks mono terang —
 * keterbacaan menang atas gaya.
 */
export function CmdBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard API unavailable — silently ignore, command is still selectable
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#191919] py-4 pr-[3.25rem] pl-[1.15rem] font-mono text-[0.875rem] text-[#FDF3D2] overflow-x-auto">
      <code className="whitespace-pre">{command}</code>
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-sans text-[0.7rem] font-bold text-white/70 hover:bg-white/[0.16] transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[#F7C526]" />
            <span className="text-[#F7C526]">Disalin</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Salin
          </>
        )}
      </button>
    </div>
  );
}
