import { KeyRound, RefreshCw, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BLOCK, BODY_CLASS, CARD_BORDER, H2_CLASS } from "./skin";

/**
 * "Kalau muncul AI gratis kena limit" section — byte-identical content on the
 * Windows and Mac setup preview pages, so it lives here once. Blok putih
 * mengambang; tips paling ampuh dapat kartu kuning penuh (pola satu kartu
 * aksen per grid, sama seperti halaman jual).
 */
export function FreeTierLimitsSection() {
  return (
    <section id="lancar" className={`${BLOCK} bg-white px-4 py-14 sm:px-10 sm:py-20 scroll-mt-24`}>
      <div className="mx-auto max-w-3xl flex flex-col gap-10">
        <AnimatedSection className="max-w-2xl flex flex-col gap-3">
          <h2 className={H2_CLASS}>Kalau muncul &ldquo;AI gratis kena limit&rdquo;.</h2>
          <p className={BODY_CLASS}>
            Itu <b className="text-[#191919]">bukan aplikasi yang rusak</b> — itu batas layanan gratis dari
            Google Gemini. Aplikasi otomatis coba beberapa model dan key dulu; kalau tetap mentok, ini
            caranya.
          </p>
        </AnimatedSection>

        <AnimatedSection className="rounded-[24px] bg-[#F7C526] p-7 flex flex-col gap-3">
          <div className="h-11 w-11 rounded-full bg-[#191919] grid place-items-center text-[#F7C526]">
            <KeyRound className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <h3 className="text-base font-semibold text-[#191919]">
            Tempel 2-3 API key Gemini — paling ampuh, tetap gratis
          </h3>
          <p className="text-[15px] text-[#191919]/75 leading-relaxed">
            Bikin key dari 2-3 akun Google berbeda di{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#191919] font-bold underline underline-offset-2"
            >
              Google AI Studio
            </a>
            , tempel semua di Settings &rsaquo; Gemini API Key (pisah spasi atau koma). Jatah harian jadi
            berlipat, aplikasi otomatis gantian pas satu key habis.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.1rem]">
          <AnimatedSection className={`rounded-[24px] ${CARD_BORDER} bg-[#EFEFEC] p-7 flex flex-col gap-3`}>
            <div className="h-11 w-11 rounded-full bg-[#F7C526] grid place-items-center text-[#191919]">
              <RefreshCw className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-semibold text-[#191919]">Coba lagi besok, atau video pendek</h3>
            <p className="text-[15px] text-[#5F5F5C] leading-relaxed">
              Kuota gratis reset tiap hari. Kalau Gemini lagi ramai, pakai video di bawah &plusmn;20 menit
              dulu.
            </p>
          </AnimatedSection>
          <AnimatedSection className={`rounded-[24px] ${CARD_BORDER} bg-[#EFEFEC] p-7 flex flex-col gap-3`}>
            <div className="h-11 w-11 rounded-full bg-[#F7C526] grid place-items-center text-[#191919]">
              <Sparkles className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-semibold text-[#191919]">Nyalain billing Google (opsional)</h3>
            <p className="text-[15px] text-[#5F5F5C] leading-relaxed">
              Buat volume berat: sekitar Rp100/video, jadi 100 video &asymp; Rp5.000-15.000. Uangnya ke
              Google, bukan ke Mote.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
