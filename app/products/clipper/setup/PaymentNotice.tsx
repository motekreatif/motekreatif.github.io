"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * Confirmation banner for a buyer who just came back from iPaymu.
 *
 * The checkout's `returnUrl` (set in the Klir app's /api/clipper-checkout)
 * points here: `/products/clipper/setup?status=success`. Without this
 * component that query param lands on a static page that ignores it, so
 * someone who has just paid arrives at a generic install guide with nothing
 * telling them the payment went through.
 *
 * `cancelUrl` still points back at the product page, where CheckoutForm
 * handles `?status=cancel` and offers to retry. Nothing to do for it here.
 *
 * Reads `window.location.search` in an effect rather than `useSearchParams`
 * on purpose: this site is a static export, and the hook would force the
 * whole page into a Suspense boundary for one banner.
 *
 * Dirender sebagai blok mengambang di dalam kolom blok halaman chooser,
 * jadi dia bawa rounded + warna sendiri (kuning redup, badge centang kuning).
 */
export function PaymentNotice() {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setPaid(new URLSearchParams(window.location.search).get("status") === "success");
  }, []);

  if (!paid) return null;

  return (
    <section className="rounded-[28px] sm:rounded-[40px] bg-[#F1F1EE] border border-[#F7C526]/60 px-4 py-8 sm:px-10 sm:py-10">
      <div className="mx-auto max-w-3xl flex items-start gap-4">
        <span className="shrink-0 grid place-items-center h-10 w-10 rounded-full bg-[#F7C526] text-[#191919]">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-[#191919]">Pembayaran diterima. Terima kasih.</p>
          <p className="text-[15px] text-[#5F5F5C] leading-relaxed">
            Kunci lisensi dan link download dikirim ke email kamu. Sambil nunggu, kamu bisa
            langsung mulai dari Langkah 1 di bawah. Kalau emailnya belum masuk dalam 1x24 jam,
            chat WhatsApp kami dan kami terbitkan ulang.
          </p>
        </div>
      </div>
    </section>
  );
}
