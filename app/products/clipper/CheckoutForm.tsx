"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const PRICE_LABEL = "Rp 90.467";
// Checkout is signed on the whitelisted VPS (Klir app), not on Cloudflare —
// iPaymu enforces an IP whitelist that Cloudflare's dynamic egress can't satisfy.
const CHECKOUT_ENDPOINT = "https://klir.motekreatif.com/api/clipper-checkout";

export function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<"success" | "cancel" | null>(null);

  // Show a banner when iPaymu redirects back with ?status=...
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    if (status === "success") setNotice("success");
    else if (status === "cancel") setNotice("cancel");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = (await res.json()) as { paymentUrl?: string; error?: string };
      if (!res.ok || !data.paymentUrl) {
        setError(data.error || "Gagal memulai pembayaran. Coba lagi.");
        setLoading(false);
        return;
      }
      // Redirect to the iPaymu hosted payment page.
      window.location.href = data.paymentUrl;
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-full border border-[rgba(25,25,25,0.12)] bg-white px-5 py-3.5 text-[#191919] " +
    "placeholder:text-[#5F5F5C]/60 focus:border-[#191919] focus:outline-none focus:ring-2 focus:ring-[#F7C526]/50 transition";

  return (
    <div className="rounded-[32px] bg-white border border-[rgba(25,25,25,0.10)] shadow-[0_30px_80px_-45px_rgba(25,25,25,0.45)] p-6 sm:p-8 flex flex-col gap-5">
      {notice === "success" && (
        <div className="rounded-2xl bg-[#F7C526]/20 border border-[#F7C526]/60 p-4 text-sm text-[#191919] font-medium">
          Terima kasih! Pembayaran diterima. Cek email kamu — lisensi + panduan
          install dikirim ke sana. Belum masuk dalam 1×24 jam? Chat WhatsApp kami.
        </div>
      )}
      {notice === "cancel" && (
        <div className="rounded-2xl bg-[#F1F1EE] border border-[#F7C526]/50 p-4 text-sm text-[#191919] font-medium">
          Pembayaran dibatalkan. Kamu bisa coba lagi kapan saja di bawah ini.
        </div>
      )}

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
        <span className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#191919] whitespace-nowrap">
          {PRICE_LABEL}
        </span>
        <span className="text-sm font-semibold text-[#5F5F5C]">sekali bayar · punya selamanya</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          required
          minLength={2}
          maxLength={100}
          placeholder="Nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          autoComplete="name"
        />
        <input
          type="email"
          required
          placeholder="Email (lisensi dikirim ke sini)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          autoComplete="email"
        />
        <input
          type="tel"
          placeholder="Nomor WhatsApp (opsional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
        />

        {error && <p className="text-sm font-medium text-[#c0392b]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="group mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#191919] px-6 py-3.5 text-[15px] font-semibold text-[#F7C526] transition-colors hover:bg-[#191919]/90 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menyiapkan pembayaran…
            </>
          ) : (
            <>
              Beli sekarang
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center gap-2 text-xs text-[#5F5F5C]">
        <ShieldCheck className="h-4 w-4 text-[#191919]/60 shrink-0" />
        Pembayaran aman via iPaymu. Lisensi & panduan dikirim otomatis ke email.
      </div>
    </div>
  );
}
