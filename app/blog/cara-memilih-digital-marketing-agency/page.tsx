import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "cara-memilih-digital-marketing-agency"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Apakah agency besar selalu lebih baik?",
    answer:
      "Tidak. Agency besar punya sistem matang, tapi akun kecil sering dipegang tim junior. Agency menengah/boutique sering memberi perhatian lebih dan akses langsung ke orang seniornya. Yang penting bukan ukuran — tapi siapa yang benar-benar mengerjakan akun kamu.",
  },
  {
    question: "Berapa lama kontrak yang wajar dengan agency?",
    answer:
      "3–6 bulan adalah periode evaluasi yang fair — cukup untuk melewati learning phase dan melihat tren hasil. Hati-hati dengan kontrak 12 bulan tanpa exit clause di awal hubungan.",
  },
  {
    question: "Apa pertanyaan terpenting saat interview agency?",
    answer:
      "\"Tunjukkan satu klien yang mirip bisnis saya, angkanya sebelum-sesudah, dan apa yang kalian lakukan.\" Jawaban yang spesifik dan jujur (termasuk mengakui apa yang tidak berhasil) adalah sinyal terbaik.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          Pilih digital marketing agency berdasarkan 7 kriteria:{" "}
          <strong>bukti hasil terukur</strong> (angka, bukan portofolio visual),{" "}
          <strong>pemahaman bisnis</strong> (bukan cuma platform),{" "}
          <strong>transparansi reporting</strong>,{" "}
          <strong>kejelasan siapa yang mengerjakan</strong>,{" "}
          <strong>struktur biaya yang jelas</strong>,{" "}
          <strong>chemistry komunikasi</strong>, dan{" "}
          <strong>insentif yang selaras</strong> dengan pertumbuhan kamu.
        </p>

        <h2>7 Kriteria Memilih Agency</h2>

        <h3>1. Bukti hasil dengan angka — bukan portofolio visual</h3>
        <p>
          Feed Instagram yang cantik tidak membayar gaji karyawan kamu. Minta
          studi kasus dengan angka yang bisa diverifikasi: ROAS, pertumbuhan
          omset, cost per lead, occupancy rate. Contoh format yang sehat:
          &ldquo;ROAS 20.8x untuk brand apparel lewat CPAS Shopee&rdquo; atau
          &ldquo;omset hotel +77% dengan marketing cost ratio 0.44%&rdquo; —
          spesifik, terukur, dan jelas konteksnya.
        </p>

        <h3>2. Mereka bertanya tentang bisnis kamu, bukan langsung jualan paket</h3>
        <p>
          Agency yang baik memulai dengan diagnosa: margin produk kamu berapa,
          channel mana yang sudah jalan, kapasitas produksi sanggup berapa.
          Kalau pertemuan pertama langsung sodor price list tanpa bertanya
          apa-apa — itu penjual paket, bukan partner strategis.
        </p>

        <h3>3. Reporting yang transparan dan bisa kamu akses</h3>
        <p>
          Standar minimal: laporan bulanan dengan metrik yang disepakati di
          awal, akses ke dashboard (Ads Manager, analytics) atas nama bisnis
          kamu sendiri, dan insight — bukan sekadar screenshot angka. Red flag
          terbesar: akun iklan atas nama agency, bukan kamu. Kalau putus
          kontrak, seluruh data historis ikut hilang.
        </p>

        <h3>4. Jelas siapa yang mengerjakan akun kamu</h3>
        <p>
          Yang presentasi sering kali bukan yang mengerjakan. Tanyakan langsung:
          siapa PIC harian, berapa akun yang dia pegang, dan bisakah bertemu
          orangnya sebelum kontrak.
        </p>

        <h3>5. Struktur biaya yang memisahkan fee dan ad spend</h3>
        <p>
          Fee agency dan budget iklan harus terpisah jelas di proposal.
          Waspadai juga model komisi persentase ad spend murni — insentifnya
          mendorong agency membakar budget lebih besar, bukan lebih efisien.
        </p>

        <h3>6. Komunikasi yang nyaman dan jujur</h3>
        <p>
          Kamu akan bicara dengan agency ini tiap minggu selama berbulan-bulan.
          Perhatikan saat diskusi awal: apakah mereka berani bilang
          &ldquo;tidak tahu&rdquo; atau &ldquo;itu tidak realistis&rdquo;?
          Agency yang mengiyakan semua target tanpa pushback biasanya akan
          mengecewakan dengan cara yang sama.
        </p>

        <h3>7. Insentif yang selaras: apakah mereka butuh kamu tergantung?</h3>
        <p>
          Pertanyaan yang jarang ditanyakan: kalau tim internal kamu makin
          pintar, apakah agency ini diuntungkan atau dirugikan? Model bisnis
          sebagian agency justru bergantung pada ketergantungan klien. Di Mote
          Kreatif kami sengaja membangun TDMO — program yang lulusan terbaiknya
          adalah klien yang tidak lagi membutuhkan kami untuk operasional
          harian. Klien mandiri = case study terbaik = referral terkuat.
        </p>

        <h2>Red Flags — Hindari Kalau Kamu Melihat Ini</h2>
        <ul>
          <li>Janji hasil pasti (&ldquo;dijamin viral&rdquo;, &ldquo;pasti ROAS 10x&rdquo;) — tidak ada yang bisa menjamin algoritma</li>
          <li>Akun iklan & aset digital atas nama agency</li>
          <li>Tidak mau menunjukkan studi kasus dengan angka</li>
          <li>Kontrak panjang + penalti besar di awal hubungan</li>
          <li>Harga jauh di bawah pasar dengan scope yang terdengar lengkap</li>
          <li>Semua channel diklaim dikuasai — tidak ada spesialisasi</li>
        </ul>

        <h2>Checklist Sebelum Tanda Tangan</h2>
        <ol>
          <li>Sudah lihat minimal 1 studi kasus dengan angka yang relevan dengan industri kamu</li>
          <li>KPI tertulis di kontrak/proposal</li>
          <li>Fee dan ad spend terpisah jelas</li>
          <li>Akun iklan & aset atas nama bisnis kamu</li>
          <li>Tahu siapa PIC harian dan sudah bertemu/bicara dengannya</li>
          <li>Ada periode evaluasi (3 bulan) dengan exit clause yang fair</li>
          <li>Frekuensi reporting & meeting disepakati di awal</li>
        </ol>

        <h2>FAQ</h2>
        {FAQ.map((f) => (
          <div key={f.question}>
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </div>
        ))}

        <h2>Kesimpulan</h2>
        <p>
          Agency yang tepat bukan yang termurah atau yang paling besar — tapi
          yang berani diukur dengan angka, transparan soal siapa yang bekerja
          dan berapa biayanya, dan insentifnya selaras dengan pertumbuhan
          bisnis kamu. Pakai checklist di atas, dan jangan ragu interview 2–3
          agency sebelum memutuskan.
        </p>
      </ArticleLayout>
    </>
  );
}
