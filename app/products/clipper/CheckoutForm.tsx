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
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#06243B] " +
    "placeholder:text-[#3D4F60]/50 focus:border-[#06243B] focus:outline-none focus:ring-2 focus:ring-[#06243B]/15 transition";

  return (
    <div className="card-soft p-6 sm:p-8 flex flex-col gap-5">
      {notice === "success" && (
        <div className="rounded-xl bg-[#BDF24A]/25 border border-[#06243B]/15 p-4 text-sm text-[#06243B] font-medium">
          Terima kasih! Pembayaran diterima. Cek email kamu — lisensi + panduan
          install dikirim ke sana. Belum masuk dalam 1×24 jam? Chat WhatsApp kami.
        </div>
      )}
      {notice === "cancel" && (
        <div className="rounded-xl bg-[#FF7E00]/12 border border-[#FF7E00]/30 p-4 text-sm text-[#06243B] font-medium">
          Pembayaran dibatalkan. Kamu bisa coba lagi kapan saja di bawah ini.
        </div>
      )}

      <div className="flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#06243B]">{PRICE_LABEL}</span>
        <span className="text-sm font-semibold text-[#3D4F60]">sekali bayar · punya selamanya</span>
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

        <button type="submit" disabled={loading} className="btn btn-dark group mt-1 disabled:opacity-60">
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

      <div className="flex items-center gap-2 text-xs text-[#3D4F60]">
        <ShieldCheck className="h-4 w-4 text-[#06243B]/60 shrink-0" />
        Pembayaran aman via iPaymu. Lisensi & panduan dikirim otomatis ke email.
      </div>
    </div>
  );
}
