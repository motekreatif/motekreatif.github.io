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
 */
export function PaymentNotice() {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setPaid(new URLSearchParams(window.location.search).get("status") === "success");
  }, []);

  if (!paid) return null;

  return (
    <section className="bg-white pt-10 sm:pt-12">
      <div className="container-mote">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#06243B]/15 bg-[#BDF24A]/25 p-6 sm:p-7 flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-[#06243B]" strokeWidth={2.2} />
          <div className="flex flex-col gap-1.5">
            <p className="font-extrabold text-[#06243B]">Pembayaran diterima. Terima kasih.</p>
            <p className="text-[15px] text-[#3D4F60] leading-relaxed">
              Kunci lisensi dan link download dikirim ke email kamu. Sambil nunggu, kamu bisa
              langsung mulai dari Langkah 1 di bawah. Kalau emailnya belum masuk dalam 1x24 jam,
              chat WhatsApp kami dan kami terbitkan ulang.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
