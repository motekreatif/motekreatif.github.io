import { KeyRound, RefreshCw, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

/**
 * "Kalau muncul AI gratis kena limit" section — byte-identical content on the
 * Windows and Mac setup preview pages, so it lives here once.
 */
export function FreeTierLimitsSection() {
  return (
    <section id="lancar" className="bg-white py-16 sm:py-24 scroll-mt-24">
      <div className="container-mote flex flex-col gap-10">
        <AnimatedSection className="max-w-2xl flex flex-col gap-3">
          <h2 className="text-[#06243B]">Kalau muncul &ldquo;AI gratis kena limit&rdquo;.</h2>
          <p className="text-[15px] text-[#3D4F60] leading-relaxed">
            Itu <b className="text-[#06243B]">bukan aplikasi yang rusak</b> — itu batas layanan gratis dari
            Google Gemini. Aplikasi otomatis coba beberapa model dan key dulu; kalau tetap mentok, ini
            caranya.
          </p>
        </AnimatedSection>

        <AnimatedSection className="rounded-2xl border border-[#BDF24A]/40 bg-[#BDF24A]/[0.15] p-7 flex flex-col gap-3">
          <div className="h-11 w-11 rounded-xl bg-[#06243B]/8 flex items-center justify-center text-[#06243B]">
            <KeyRound className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <h3 className="text-base font-extrabold text-[#06243B]">
            Tempel 2-3 API key Gemini — paling ampuh, tetap gratis
          </h3>
          <p className="text-[15px] text-[#3D4F60] leading-relaxed">
            Bikin key dari 2-3 akun Google berbeda di{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#06243B] font-bold underline underline-offset-2"
            >
              Google AI Studio
            </a>
            , tempel semua di Settings &rsaquo; Gemini API Key (pisah spasi atau koma). Jatah harian jadi
            berlipat, aplikasi otomatis gantian pas satu key habis.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.1rem]">
          <AnimatedSection className="rounded-2xl border border-black/8 bg-[#F7F8FA] p-7 flex flex-col gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#BDF24A]/22 flex items-center justify-center text-[#06243B]">
              <RefreshCw className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-extrabold text-[#06243B]">Coba lagi besok, atau video pendek</h3>
            <p className="text-[15px] text-[#3D4F60] leading-relaxed">
              Kuota gratis reset tiap hari. Kalau Gemini lagi ramai, pakai video di bawah &plusmn;20 menit
              dulu.
            </p>
          </AnimatedSection>
          <AnimatedSection className="rounded-2xl border border-black/8 bg-[#F7F8FA] p-7 flex flex-col gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#BDF24A]/22 flex items-center justify-center text-[#06243B]">
              <Sparkles className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-extrabold text-[#06243B]">Nyalain billing Google (opsional)</h3>
            <p className="text-[15px] text-[#3D4F60] leading-relaxed">
              Buat volume berat: sekitar Rp100/video, jadi 100 video &asymp; Rp5.000-15.000. Uangnya ke
              Google, bukan ke Mote.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
