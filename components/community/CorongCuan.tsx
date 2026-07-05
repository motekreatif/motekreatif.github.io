"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

/* ══════════ DATA: arketipe + benchmark patokan ══════════ */
type Stage = { src: "reach" | "clicks" | "customers"; term: string; en: string; plain: string };
type Preset = {
  name: string; tag: string;
  cpm: number; ctr: number; conv: number; margin: number; repeat: number;
  defAov: number; defTarget: number; note: string;
  fn: { model: string; used: string; stages: Stage[]; loy: { term: string; en: string; plain: string } };
};

const PRESETS: Record<string, Preset> = {
  resto: {
    name: "Cafe / Restoran", tag: "sering balik, tiket variatif",
    cpm: 20000, ctr: 0.016, conv: 0.05, margin: 0.6, repeat: 8, defAov: 55000, defTarget: 60000000,
    note: "Cafe/restoran: menang dari pelanggan yang balik terus (nongkrong & makan rutin) — hidup dari repeat, bukan sekali datang.",
    fn: { model: "AIDA + Loyalty", used: "cafe & restoran", stages: [
      { src: "reach", term: "Perhatian", en: "Attention", plain: "iklan/kontenmu keliatan pas orang lagi scrolling / laper" },
      { src: "clicks", term: "Tertarik", en: "Interest", plain: "yang penasaran → klik / mampir liat menu" },
      { src: "customers", term: "Beli", en: "Action", plain: "yang jadi pesen makan / minum" }],
      loy: { term: "Balik lagi", en: "Loyalty", plain: "yang nagih & balik jadi langganan" } },
  },
  hotel: {
    name: "Hotel / Penginapan", tag: "sekali booking, nilai lumayan",
    cpm: 28000, ctr: 0.011, conv: 0.02, margin: 0.45, repeat: 1.5, defAov: 600000, defTarget: 150000000,
    note: "Hotel/penginapan: sekali booking nilainya lumayan, tapi tamu jarang balik cepat — menang di jangkauan & musim liburan.",
    fn: { model: "Dream · Plan · Book · Stay", used: "hotel & travel", stages: [
      { src: "reach", term: "Ngimpi", en: "Dream", plain: "orang lihat kontenmu pas ngayal liburan" },
      { src: "clicks", term: "Nyari", en: "Plan", plain: "yang mulai riset → cek kamar & harga kamu" },
      { src: "customers", term: "Booking", en: "Book", plain: "yang jadi pesan kamar" }],
      loy: { term: "Balik nginep", en: "Stay/Loyalty", plain: "yang puas → balik / rekomendasiin" } },
  },
  wisata: {
    name: "Area Wisata", tag: "murah, main di jumlah",
    cpm: 18000, ctr: 0.02, conv: 0.06, margin: 0.7, repeat: 1.4, defAov: 40000, defTarget: 80000000,
    note: "Area wisata: tiket murah, main di jumlah pengunjung & momen libur — sekali dateng jarang balik cepat, jadi butuh volume gede.",
    fn: { model: "AIDA", used: "tempat wisata & rekreasi", stages: [
      { src: "reach", term: "Kepincut", en: "Attention", plain: "orang lihat spot kamu di feed / iklan" },
      { src: "clicks", term: "Kepo", en: "Interest", plain: "yang klik cari lokasi / tiket / jam buka" },
      { src: "customers", term: "Datang", en: "Action", plain: "yang beli tiket & beneran dateng" }],
      loy: { term: "Ngajak", en: "Advocacy", plain: "yang balik lagi / ngajak rombongan" } },
  },
  fashion: {
    name: "Fashion Retail / Marketplace", tag: "rame pesaing",
    cpm: 25000, ctr: 0.018, conv: 0.02, margin: 0.45, repeat: 2.5, defAov: 180000, defTarget: 100000000,
    note: "Fashion/marketplace: pesaing seabrek, konversi kecil — menang di brand yang diinget & pelanggan yang balik tiap musim.",
    fn: { model: "AIDA + Repeat", used: "fashion & marketplace", stages: [
      { src: "reach", term: "Lihat", en: "Attention", plain: "produkmu nongol di feed / iklan / marketplace" },
      { src: "clicks", term: "Klik", en: "Interest", plain: "yang mampir liat-liat & masukin keranjang" },
      { src: "customers", term: "Checkout", en: "Action", plain: "yang jadi bayar" }],
      loy: { term: "Repeat order", en: "Loyalty", plain: "yang belanja lagi musim depan" } },
  },
  skincare: {
    name: "Klinik Kecantikan / Skincare", tag: "langganan treatment",
    cpm: 30000, ctr: 0.013, conv: 0.015, margin: 0.55, repeat: 6, defAov: 350000, defTarget: 120000000,
    note: "Klinik/skincare: sekali cocok, pelanggan langganan treatment/produk — cuan gede dari repeat, tapi butuh dibangun kepercayaannya dulu.",
    fn: { model: "Awareness · Konsultasi · Treatment · Langganan", used: "klinik & skincare", stages: [
      { src: "reach", term: "Sadar", en: "Awareness", plain: "orang lihat before-after / edukasi kamu" },
      { src: "clicks", term: "Konsultasi", en: "Consideration", plain: "yang DM/chat tanya cocok gak buat dia" },
      { src: "customers", term: "Treatment", en: "Action", plain: "yang jadi treatment / beli produk" }],
      loy: { term: "Langganan", en: "Retention", plain: "yang cocok → rutin balik" } },
  },
  katering: {
    name: "Katering / Frozen Food", tag: "langganan rutin",
    cpm: 22000, ctr: 0.014, conv: 0.03, margin: 0.35, repeat: 9, defAov: 120000, defTarget: 60000000,
    note: "Katering/frozen food: sekali langganan bisa rutin mingguan/bulanan — repeat-nya juara, tapi margin bahan tipis.",
    fn: { model: "Kenal · Coba · Langganan", used: "katering & frozen food", stages: [
      { src: "reach", term: "Kenal", en: "Awareness", plain: "orang lihat menu / promo kamu" },
      { src: "clicks", term: "Nanya", en: "Interest", plain: "yang tanya-tanya → pesan coba sekali" },
      { src: "customers", term: "Jadi pelanggan", en: "Action", plain: "yang jadi order beneran" }],
      loy: { term: "Rutin", en: "Retention", plain: "yang lanjut langganan mingguan / bulanan" } },
  },
  properti: {
    name: "Properti / Kontraktor", tag: "sekali seumur hidup",
    cpm: 35000, ctr: 0.009, conv: 0.0006, margin: 0.25, repeat: 1.1, defAov: 80000000, defTarget: 500000000,
    note: "Properti/kontraktor: tiket sangat besar, pelanggan praktis sekali seumur hidup, funnel panjang & butuh kepercayaan tinggi.",
    fn: { model: "Awareness · Lead · Deal", used: "properti & kontraktor", stages: [
      { src: "reach", term: "Tau", en: "Awareness", plain: "orang lihat proyek / portfolio kamu" },
      { src: "clicks", term: "Tanya", en: "Lead", plain: "yang serius → WA / isi form minta penawaran" },
      { src: "customers", term: "Deal", en: "Action", plain: "yang tanda tangan kontrak" }],
      loy: { term: "Referral", en: "Advocacy", plain: "yang puas → rekomendasiin (jarang, tapi emas)" } },
  },
};
const PRESET_KEYS = Object.keys(PRESETS);

/* ══════════ HELPERS ══════════ */
const rp = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");
const rpShort = (n: number) => {
  const s = n < 0 ? "-" : ""; const a = Math.abs(n);
  if (a >= 1e9) return s + "Rp" + (a / 1e9).toFixed(1).replace(".0", "") + "M";
  if (a >= 1e6) return s + "Rp" + (a / 1e6).toFixed(1).replace(".0", "") + "jt";
  if (a >= 1e3) return s + "Rp" + Math.round(a / 1e3) + "rb";
  return s + "Rp" + Math.round(a);
};
const num = (n: number) => Math.round(n).toLocaleString("id-ID");
const parseMoney = (s: string) => parseInt(String(s).replace(/[^\d]/g, ""), 10) || 0;
const fmtMoney = (n: number) => n.toLocaleString("id-ID");

const SEG_COL = ["#0D4A6B", "#06243B", "#FF7E00"];
const SEG_W = [100, 68, 42];
const SEG_ICO: Record<string, string> = { reach: "🖼️", clicks: "👆", customers: "🛍️" };

/* ══════════ COMPONENT ══════════ */
export function CorongCuan({ waGroup }: { waGroup: string }) {
  const [presetKey, setPresetKey] = useState("resto");
  const [target, setTarget] = useState(PRESETS.resto.defTarget);
  const [aov, setAov] = useState(PRESETS.resto.defAov);
  const [cpm, setCpm] = useState(PRESETS.resto.cpm);
  const [ctr, setCtr] = useState(PRESETS.resto.ctr);
  const [conv, setConv] = useState(PRESETS.resto.conv);
  const [repeat, setRepeat] = useState(PRESETS.resto.repeat);
  const [margin, setMargin] = useState(PRESETS.resto.margin);
  const touched = useRef({ cpm: false, ctr: false, conv: false, repeat: false });
  const [userBudget, setUserBudget] = useState(0);
  const [shown, setShown] = useState(false);
  const [advOpen, setAdvOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const preset = PRESETS[presetKey];

  function selectPreset(k: string) {
    const p = PRESETS[k];
    setPresetKey(k);
    if (!touched.current.cpm) setCpm(p.cpm);
    if (!touched.current.ctr) setCtr(p.ctr);
    if (!touched.current.conv) setConv(p.conv);
    if (!touched.current.repeat) setRepeat(p.repeat);
    setMargin(p.margin);
    setAov(p.defAov);
    setTarget(p.defTarget);
  }

  const m = useMemo(() => {
    const gross = target * margin;
    const transaksi = aov > 0 ? target / aov : 0;
    const pelanggan = repeat > 0 ? transaksi / repeat : transaksi;
    const clicks = conv > 0 ? pelanggan / conv : 0;
    const reach = ctr > 0 ? clicks / ctr : 0;
    const budget = (reach / 1000) * cpm;
    const cac = pelanggan > 0 ? budget / pelanggan : 0;
    const roas = budget > 0 ? target / budget : 0;
    const netAfter = gross - budget;
    const capBudget = target * 0.05;
    const budgetPct = target > 0 ? budget / target : 99;
    return { gross, transaksi, pelanggan, clicks, reach, budget, cac, roas, netAfter, capBudget, budgetPct };
  }, [target, aov, cpm, ctr, conv, repeat, margin]);

  function onBongkar() {
    setShown(true);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }

  /* ---- verdict ---- */
  const pct = Math.round(Math.min(m.budgetPct, 9.99) * 100);
  const verdict = (() => {
    if (m.budgetPct > 0.1)
      return { cls: "red", light: "🔴", head: "Belum efisien — iklan kegedean buat omzet segini",
        body: `Buat sampai ke target ini lewat iklan doang, budget yang kebutuhan (${rp(m.budget)}) itu ${pct}% dari omzet — jauh di atas batas sehat 5% (${rp(m.capBudget)})${m.netAfter < 0 ? `, malah rugi ${rp(Math.abs(m.netAfter))}` : ""}. Bukan berarti targetmu salah. Artinya: target sebesar ini gak bisa dibeli pakai iklan aja. Butuh pelanggan yang balik, jalur organik, dan strategi — bukan sekadar pasang iklan.` };
    if (m.budgetPct > 0.05)
      return { cls: "amber", light: "🟡", head: "Bisa dikejar, tapi iklan di atas batas sehat",
        body: `Kejar-able, tapi budget iklannya ${pct}% dari omzet — di atas batas sehat 5% (${rp(m.capBudget)}). Masih bisa, tapi ketat. Di sinilah kerjaan marketing: nurunin angka ini pelan-pelan lewat konversi yang lebih baik & pelanggan yang balik.` };
    return { cls: "green", light: "🟢", head: "Target ini masuk akal",
      body: `Sehat — budget iklan cuma ${pct}% dari omzet, di bawah batas sehat 5%. Target ini realistis dengan belanja iklan yang wajar. Tinggal dua PR yang gak keliatan di kalkulator: eksekusi yang bener, dan KONSISTEN berbulan-bulan. Di situ biasanya bisnis tumbang — bukan di angkanya.` };
  })();
  const vGrad: Record<string, string> = {
    green: "linear-gradient(135deg,#1f9d55,#12703b)",
    amber: "linear-gradient(135deg,#e6a100,#c07d00)",
    red: "linear-gradient(135deg,#e0524a,#b23028)",
  };

  /* ---- funnel ---- */
  const vals: Record<string, number> = { reach: Math.ceil(m.reach), clicks: Math.ceil(m.clicks), customers: Math.ceil(m.pelanggan) };
  const overCap = m.capBudget > 0 ? m.budget / m.capBudget : 0;
  const capBadge = overCap <= 1 ? "pas di bawah batas ✅" : `${overCap.toFixed(1)}× di atas batas ⚠️`;
  const omzetDay = target / 30;
  const trxDay = m.transaksi / 30;
  const trxDayTxt = trxDay >= 1 ? `${num(Math.round(trxDay))} transaksi` : `1 tiap ~${num(Math.round(1 / Math.max(trxDay, 0.0001)))} hari`;

  /* ---- budget gap ---- */
  const gap = (() => {
    const punya = userBudget;
    const butuh = m.budget;
    if (!punya || !butuh) return null;
    const selisih = punya - butuh;
    const ratio = butuh > 0 ? punya / butuh : 0;
    let cls: "ok" | "warn" | "bad", note: string;
    if (punya >= butuh) { cls = "ok"; note = `Cukup! Budgetmu udah nutup yang dibutuhkan${selisih > 0 ? `, malah lebih ${rp(selisih)}` : ""}. Mantap — tinggal jaga konsistensi & rapihin eksekusinya.`; }
    else if (ratio >= 0.6) { cls = "warn"; note = `Kurang ${rp(butuh - punya)}. Budgetmu baru nutup ~${Math.round(ratio * 100)}% dari yang dibutuhkan. Mepet — tapi bisa dikejar kalau corongmu diefisienin. Belajar caranya bareng di grup 👇`; }
    else { cls = "bad"; note = `Kurang jauh — ${rp(butuh - punya)}. Budgetmu baru nutup ~${Math.round(ratio * 100)}% dari yang dibutuhkan buat target ini. Bukan berarti mustahil: naikin pelanggan balik & organik biar beban iklan turun. Kita bahas di grup 👇`; }
    return { punya, butuh, selisih, cls, note };
  })();
  const gapText: Record<string, string> = { ok: "#166b3c", warn: "#8a5a00", bad: "#9e2b23" };
  const gapBg: Record<string, string> = { ok: "#e8f6ee", warn: "#fdf3e0", bad: "#fdeceb" };

  /* ---- metrics ---- */
  const metrics = [
    { hl: true, label: "Budget iklan / bln", val: rpShort(m.budget), desc: "Perkiraan biaya iklan buat capai target (skenario iklan-saja)." },
    { label: "Budget vs omzet", val: pct + "%", desc: "Sehatnya ≤5% dari omzet. Di atas itu = kerja rodi buat iklan." },
    { label: "Pelanggan / bln", val: num(Math.ceil(m.pelanggan)), desc: "Orang baru yang perlu kamu tarik tiap bulan." },
    { label: "CAC", val: rp(m.cac), desc: "Biaya iklan buat dapat 1 pelanggan." },
    { label: "Untung stlh iklan", val: rpShort(m.netAfter), desc: "Untung kotor dikurangi budget iklan. Belum potong gaji/sewa." },
    { label: "ROAS", val: m.roas.toFixed(1) + "×", desc: "Tiap Rp1 iklan balik jadi omzet segini." },
  ];

  const sliders = [
    { key: "repeat", label: "Pelanggan balik (rata-rata belanja berapa kali)", min: 1, max: 15, step: 0.5, val: repeat, set: setRepeat, pct: false,
      fmt: (v: number) => v.toFixed(1) + "×", desc: "Makin sering pelanggan balik, makin dikit orang baru yang perlu kamu tarik lewat iklan. 1× = gak ada yang balik (skenario terburuk)." },
    { key: "conv", label: "% yang jadi beli (Konversi)", min: 0.1, max: 15, step: 0.05, val: conv * 100, set: (v: number) => setConv(v / 100), pct: true,
      fmt: (v: number) => v.toFixed(2) + "%", desc: "Dari yang klik, berapa % benar-benar beli. Makin mahal produk, biasanya makin kecil." },
    { key: "ctr", label: "% yang ngeklik (CTR)", min: 0.3, max: 5, step: 0.1, val: ctr * 100, set: (v: number) => setCtr(v / 100), pct: true,
      fmt: (v: number) => v.toFixed(1) + "%", desc: "Dari yang lihat iklan, berapa % tertarik & klik." },
    { key: "cpm", label: "Biaya jangkau (CPM)", min: 10000, max: 60000, step: 1000, val: cpm, set: setCpm, pct: false,
      fmt: (v: number) => rp(v), desc: "Biaya buat iklan tampil 1.000 kali." },
  ] as const;

  return (
    <div className="container-mote py-14 sm:py-20">
      {/* ═══ INPUT ═══ */}
      <div className="card-soft p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#FF7E00]">Langkah 1 · Mimpimu dulu</div>
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#06243B] mt-1">Mau bawa bisnismu ke angka berapa?</h2>
        <p className="text-[15px] text-[#3D4F60] mt-2 max-w-xl">Gak perlu ngerti marketing. Pilih jenis bisnis, kami isi patokan umumnya. Kamu tinggal ubah target &amp; harga kalau perlu.</p>

        {/* jenis bisnis */}
        <div className="mt-6">
          <label className="font-bold text-[15px] text-[#06243B]">Jenis bisnismu?</label>
          <div className="text-[13px] text-[#3D4F60] mb-3">Tiap jenis bisnis punya &ldquo;kurva&rdquo; marketing yang beda.</div>
          <div className="flex flex-wrap gap-2.5">
            {PRESET_KEYS.map((k) => {
              const p = PRESETS[k]; const active = k === presetKey;
              return (
                <button key={k} type="button" onClick={() => selectPreset(k)}
                  className={`text-left rounded-2xl px-4 py-3 border-2 transition-all min-w-[130px] ${active ? "border-[#06243B] bg-[#06243B] text-white" : "border-[#E7DDC9] bg-white hover:border-[#BDF24A] hover:-translate-y-0.5"}`}>
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className={`text-[12px] ${active ? "text-[#A9BCCB]" : "text-[#6B6559]"}`}>{p.tag}</div>
                </button>
              );
            })}
          </div>
          <div className="text-[12.5px] text-[#6B6559] mt-2.5">{preset.note}</div>
        </div>

        {/* target */}
        <div className="mt-6">
          <label className="font-bold text-[15px] text-[#06243B]">🎯 Target omzet per bulan</label>
          <div className="text-[13px] text-[#3D4F60] mb-2.5">Uang masuk yang kamu pengen dari jualan tiap bulan.</div>
          <MoneyInput value={target} onChange={setTarget} />
        </div>

        {/* aov */}
        <div className="mt-6">
          <label className="font-bold text-[15px] text-[#06243B]">Rata-rata sekali pelanggan belanja, habis berapa?</label>
          <div className="text-[13px] text-[#3D4F60] mb-2.5">Nilai transaksi rata-rata (orang marketing nyebutnya <b>AOV</b>).</div>
          <MoneyInput value={aov} onChange={setAov} />
        </div>

        <button type="button" onClick={onBongkar} className="btn btn-dark group mt-7">
          Bongkar ongkosnya
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* ═══ RESULT ═══ */}
      <AnimatePresence>
        {shown && (
          <motion.div ref={resultRef}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card-soft p-6 sm:p-8 max-w-3xl mx-auto mt-6">
            <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#FF7E00]">Langkah 2 · Ini corong marketingmu</div>
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#06243B] mt-1">Biar kebayang: begini jalannya</h2>
            <p className="text-[15px] text-[#3D4F60] mt-2 max-w-xl">Baca dari atas ke bawah — banyak orang lihat, nyaring jadi yang mampir, nyaring lagi jadi yang beli. Yang netes di bawah = omzet. Bahan bakarnya = budget iklan.</p>

            {/* verdict */}
            <div className="rounded-[20px] p-6 sm:p-7 mt-6 text-white flex gap-4 items-start" style={{ background: vGrad[verdict.cls], color: verdict.cls === "amber" ? "#3a2a00" : "#fff" }}>
              <div className="text-3xl leading-none">{verdict.light}</div>
              <div>
                <div className="font-extrabold text-lg sm:text-xl">{verdict.head}</div>
                <p className="text-[15px] mt-1.5 opacity-95">{verdict.body}</p>
              </div>
            </div>

            {/* funnel */}
            <div className="mt-7">
              <div className="text-center text-[13px] text-[#6B6559] mb-3.5">
                Model corong <b className="bg-[#BDF24A] text-[#06243B] px-2 py-0.5 rounded-md">{preset.fn.model}</b> · yang umum dipakai {preset.fn.used}
              </div>
              <div className="rounded-2xl bg-[#EEF6EA] border border-[#D5E8C9] px-4 py-3 text-[13.5px] text-[#3a5a2a] leading-relaxed mb-4">
                Kenapa bentuknya <b className="text-[#2b6b1c]">corong</b>? Karena gak semua yang lihat bakal beli — itu wajar. Dari ratusan ribu yang lihat iklan, nyaring terus sampai tinggal segelintir yang beli. Makin bocor corongmu, makin banyak budget kebuang.
              </div>
              <div className="flex flex-col items-center">
                {preset.fn.stages.map((st, i) => (
                  <div key={st.src} className="w-full flex flex-col items-center">
                    {i > 0 && <div className="text-[#6B6559] text-[15px] font-bold py-1">↓</div>}
                    <div className="text-white rounded-xl px-4 py-3 text-center flex flex-col gap-0.5 transition-[width] duration-500 min-w-[180px] max-w-full"
                      style={{ width: `${SEG_W[i]}%`, background: SEG_COL[i] }}>
                      <span className="text-[11.5px] font-extrabold uppercase tracking-wide opacity-90">{st.term} <span className="normal-case font-semibold opacity-70">({st.en})</span></span>
                      <span className="text-[22px] font-extrabold tracking-tight">{num(vals[st.src])}{st.src === "reach" ? "×" : ""}</span>
                      <span className="text-[12.5px] opacity-90 font-medium">{SEG_ICO[st.src]} {st.plain}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 mx-auto text-center bg-[#EEF6EA] border border-dashed border-[#9CC47F] rounded-full px-5 py-2.5 text-[13px] text-[#3a5a2a] max-w-full">
                🔁 <b className="text-[#2b6b1c]">{preset.fn.loy.term}</b> <span className="text-[#6b8a58]">({preset.fn.loy.en})</span> — {preset.fn.loy.plain} · rata-rata balik <b className="text-[#2b6b1c]">{repeat.toFixed(1)}×</b>
              </div>

              <div className="text-center text-[#FF7E00] text-[13px] font-bold py-2.5">↓ NETES JADI ↓</div>
              <div className="rounded-[20px] p-5 text-center text-white" style={{ background: "linear-gradient(135deg,#1f9d55,#12703b)" }}>
                <div className="flex justify-center items-baseline gap-2.5 flex-wrap">
                  <span className="text-sm opacity-90">🎯 Omzet target</span><b className="text-2xl font-extrabold">{rp(target)}/bln</b>
                </div>
                <div className="flex gap-3 justify-center mt-3.5 flex-wrap">
                  <div className="bg-white/15 rounded-xl px-4 py-2.5 min-w-[140px]">
                    <span className="block text-[10.5px] uppercase tracking-wide opacity-85 font-bold">Sales / hari</span>
                    <b className="block text-[17px] font-extrabold my-0.5">{trxDayTxt}</b>
                    <small className="text-[11px] opacity-80">yang harus closing</small>
                  </div>
                  <div className="bg-white/15 rounded-xl px-4 py-2.5 min-w-[140px]">
                    <span className="block text-[10.5px] uppercase tracking-wide opacity-85 font-bold">Omzet / hari</span>
                    <b className="block text-[17px] font-extrabold my-0.5">{rpShort(omzetDay)}</b>
                    <small className="text-[11px] opacity-80">rata-rata masuk</small>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-[#06243B] text-white px-5 py-4">
                <div className="flex justify-between items-center gap-2.5 flex-wrap font-bold text-[14px]">
                  <span>💰 Bahan bakar — budget iklan / bln</span><b className="text-[#BDF24A] text-lg">{rp(m.budget)}</b>
                </div>
                <div className="flex justify-between items-center gap-2.5 flex-wrap mt-2 pt-2 border-t border-white/20 text-[13px] font-semibold text-[#C9D6DF]">
                  <span>Batas sehat (maks 5% omzet) — {capBadge}</span><b>{rp(m.capBudget)}</b>
                </div>
              </div>
            </div>

            {/* budget check */}
            <div className="mt-5 rounded-2xl bg-[#F7F4EE] border border-[#ECE6DA] p-5">
              <label className="font-bold text-[15px] text-[#06243B] block">💰 Punya budget marketing berapa sekarang? <span className="font-semibold text-[#6B6559] text-[13px]">(opsional)</span></label>
              <div className="text-[13px] text-[#6B6559] mb-3">Cek cepat: budgetmu udah cukup apa belum buat ngejar target ini.</div>
              <MoneyInput value={userBudget} onChange={setUserBudget} placeholder="ketik budgetmu (boleh dilewat)" />
              {gap && (
                <div className="mt-4">
                  <div className="flex gap-2.5 flex-wrap">
                    {[{ l: "Butuh", v: rp(gap.butuh), c: "#06243B" }, { l: "Budgetmu", v: rp(gap.punya), c: "#06243B" }, { l: "Selisih", v: `${gap.selisih >= 0 ? "+" : "−"}${rp(Math.abs(gap.selisih))}`, c: gapText[gap.cls] }].map((b) => (
                      <div key={b.l} className="flex-1 min-w-[100px] bg-white border border-[#ECE6DA] rounded-xl px-3.5 py-3 text-center">
                        <span className="block text-[11px] uppercase tracking-wide text-[#6B6559] font-bold">{b.l}</span>
                        <b className="text-lg font-extrabold" style={{ color: b.c }}>{b.v}</b>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold leading-relaxed" style={{ background: gapBg[gap.cls], color: gapText[gap.cls] }}>{gap.note}</div>
                </div>
              )}
            </div>

            {/* metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
              {metrics.map((c) => (
                <div key={c.label} className={`rounded-2xl p-4 relative border ${c.hl ? "bg-[#06243B] border-[#06243B]" : "bg-[#F7F4EE] border-[#ECE6DA]"}`}>
                  {c.hl && <span className="absolute top-3.5 right-3.5 text-base">🎯</span>}
                  <div className={`text-[12px] font-bold uppercase tracking-wide ${c.hl ? "text-[#BCD]" : "text-[#6B6559]"}`} style={c.hl ? { color: "#9db3c2" } : undefined}>{c.label}</div>
                  <div className={`text-[22px] font-extrabold tracking-tight my-0.5 ${c.hl ? "text-white" : "text-[#06243B]"}`}>{c.val}</div>
                  <div className={`text-[12.5px] leading-snug ${c.hl ? "" : "text-[#6B6559]"}`} style={c.hl ? { color: "#9db3c2" } : undefined}>{c.desc}</div>
                </div>
              ))}
            </div>

            {/* reflection */}
            <div className="mt-6 rounded-2xl bg-[#FFF8EC] border border-[#F2E2C0] border-l-4 border-l-[#FF7E00] px-5 py-5 text-[15px] leading-relaxed text-[#3D4F60]">
              Patokan umum: <b className="text-[#06243B]">belanja iklan sehat itu maksimal ~5% dari omzet</b> — buat target {rp(target)}, artinya sekitar <b className="text-[#06243B]">{rpShort(m.capBudget)}/bln</b>. Tapi mesin paling kasar (murni iklan) minta budget <b className="text-[#06243B]">{rpShort(m.budget)}/bln</b> — itu <b className="text-[#06243B]">{pct}%</b> dari omzet. Kamu perlu ndatengin ~<b className="text-[#06243B]">{num(Math.ceil(m.pelanggan))} pelanggan/bln</b>, dari iklan yang tampil ~<b className="text-[#06243B]">{num(Math.ceil(m.reach))} kali</b>.
              <span className="block mt-3.5 pt-3.5 border-t border-dashed border-[#E6D3AB]">
                <b className="text-[#06243B]">Serem? Ini emang skenario TERBURUK</b> — ngandelin iklan doang, tanpa pelanggan balik yang cukup. Coba geser <b className="text-[#06243B]">&ldquo;pelanggan balik&rdquo;</b> di bawah: makin sering pelanggan balik, makin kecil budget yang kamu butuh. Itulah kenapa bisnis sehat gak cuma beli iklan — mereka bikin orang balik, main organik, WA, referral.
              </span>
            </div>

            {/* punchline */}
            <div className="mt-5 rounded-2xl bg-[#06243B] text-white p-6 relative overflow-hidden">
              <div className="text-lg font-extrabold leading-snug text-[#BDF24A] max-w-[52ch]">Ini hasil kalau kamu gaspol sendirian sambil ngurus dagang. Bayangin kalau yang garap orang yang emang tiap hari ngulik beginian. 🗿</div>
              <div className="mt-2.5 text-[14.5px] text-[#C6D4DE] leading-relaxed max-w-[60ch]">Angka di atas skenario paling kasar. Orang yang tiap hari ngulik corong — udah kenyang gagal &amp; benerin — bikin bocornya ketutup, budget lebih irit, hasilnya beda cerita. Kabar baiknya: kamu gak harus jago sendiri. Cukup mau belajar &amp; tekun — sisanya, ada yang nemenin. 🗿</div>
            </div>

            {/* level 2 */}
            <button type="button" onClick={() => setAdvOpen((v) => !v)} className="mt-6 flex items-center gap-2 font-bold text-[15px] text-[#06243B]">
              <ChevronRight className={`h-4 w-4 transition-transform ${advOpen ? "rotate-90" : ""}`} />
              Mau ngulik? Geser angkanya &amp; lihat budget berubah
            </button>
            {advOpen && (
              <div className="mt-5 pt-5 border-t border-dashed border-[#D9D2C6]">
                <p className="text-[15px] text-[#3D4F60] mb-5 max-w-xl">Inilah <b>kerjaan marketing</b> sebenarnya: geser satu angka, lihat efeknya ke budget yang kamu butuh. Coba naikin <b>&ldquo;pelanggan balik&rdquo;</b> — lihat budget-nya anjlok.</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {sliders.map((s) => (
                    <div key={s.key}>
                      <label className="flex justify-between font-bold text-[14px] text-[#06243B] mb-2">{s.label} <span className="text-[#FF7E00]">{s.fmt(s.val)}</span></label>
                      <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                        onChange={(e) => { touched.current[s.key as keyof typeof touched.current] = true; s.set(parseFloat(e.target.value)); }}
                        className="w-full accent-[#06243B]" />
                      <div className="text-[12.5px] text-[#6B6559] mt-1.5">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════ Money input ══════════ */
function MoneyInput({ value, onChange, placeholder }: { value: number; onChange: (n: number) => void; placeholder?: string }) {
  return (
    <div className="relative max-w-[360px]">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#6B6559]">Rp</span>
      <input type="text" inputMode="numeric" placeholder={placeholder}
        value={value ? fmtMoney(value) : ""}
        onChange={(e) => onChange(parseMoney(e.target.value))}
        className="w-full pl-11 pr-4 py-3.5 text-[19px] font-extrabold text-[#06243B] bg-white border-2 border-[#E7DDC9] rounded-2xl focus:outline-none focus:border-[#BDF24A]" />
    </div>
  );
}
