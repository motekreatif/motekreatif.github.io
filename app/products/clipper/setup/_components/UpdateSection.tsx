import { Terminal, OctagonAlert } from "lucide-react";
import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CmdBlock } from "./CmdBlock";
import { NoteCallout } from "./NoteCallout";

const UPDATE_COMMANDS = `docker compose down
docker system prune -af
docker compose pull
docker compose up -d`;

/**
 * "Update ke versi terbaru" section — identical on Windows and Mac except the
 * one line describing how to open the terminal in that OS's file browser.
 */
export function UpdateSection({ terminalInstruction }: { terminalInstruction: ReactNode }) {
  return (
    <section id="update" className="bg-[#F7F8FA] py-16 sm:py-24 border-y border-black/5 scroll-mt-24">
      <div className="container-mote flex flex-col gap-10">
        <AnimatedSection className="max-w-2xl flex flex-col gap-3">
          <span className="eyebrow">Sudah punya Clipper?</span>
          <h2 className="text-[#06243B]">Update ke versi terbaru.</h2>
          <p className="text-[15px] text-[#3D4F60] leading-relaxed">
            Lisensi, pengaturan, dan klip kamu <b className="text-[#06243B]">aman semua</b> — update cuma
            ngambil versi aplikasi terbaru.
          </p>
        </AnimatedSection>

        <AnimatedSection className="rounded-2xl border border-black/8 bg-white p-7 flex flex-col gap-3">
          <div className="h-11 w-11 rounded-xl bg-[#BDF24A]/22 flex items-center justify-center text-[#06243B]">
            <Terminal className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <h3 className="text-base font-extrabold text-[#06243B]">Jalankan urutan ini</h3>
          <p className="text-[15px] text-[#3D4F60] leading-relaxed">{terminalInstruction}</p>
          <CmdBlock command={UPDATE_COMMANDS} />
          <p className="text-[15px] text-[#3D4F60] leading-relaxed">
            Selesai — buka localhost:3060, kartu style dan fitur terbaru langsung muncul.
          </p>
        </AnimatedSection>

        <NoteCallout variant="stop" icon={OctagonAlert} label="Peringatan keras">
          <span className="text-white">
            Jangan pernah jalankan{" "}
            <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[13px]">down -v</code> atau{" "}
            <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[13px]">prune --volumes</code>.
            Dua perintah itu <b className="text-white">menghapus database, lisensi, dan semua klip kamu</b>{" "}
            — gak bisa dibalikin.
          </span>
        </NoteCallout>
      </div>
    </section>
  );
}
