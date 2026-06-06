import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "agency-vs-tim-marketing-inhouse"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Kapan waktu yang tepat pindah dari agency ke in-house?",
    answer:
      "Saat marketing sudah jadi fungsi inti yang berjalan rutin (bukan eksperimen lagi), volume kerja cukup untuk mengisi full-time, dan kamu siap investasi di leadership marketing. Biasanya saat budget agency bulanan sudah setara 2–3 gaji staf.",
  },
  {
    question: "Bisakah kombinasi agency dan in-house?",
    answer:
      "Bisa, dan sering jadi yang paling efektif: tim internal pegang konten harian dan komunikasi brand, agency pegang area yang butuh spesialisasi (paid ads, CPAS, SEO teknis). Atau model pendampingan seperti TDMO: agency membangun kapabilitas tim internal sampai mandiri.",
  },
  {
    question: "Apa risiko terbesar membangun tim in-house?",
    answer:
      "Hire tanpa arah. Staf marketing junior tanpa mentor senior akan eksekusi tanpa strategi — posting jalan terus, tapi tidak ada yang bisa menjawab kenapa dan dampaknya ke revenue apa. Biayanya bukan cuma gaji, tapi waktu yang hilang.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          <strong>Agency</strong> tepat saat kamu butuh hasil cepat, skill
          spesialis, dan belum siap membangun tim.{" "}
          <strong>In-house</strong> tepat saat marketing sudah jadi fungsi inti
          jangka panjang dan kamu ingin kontrol serta pemahaman produk yang
          dalam. Dan ada <strong>opsi ketiga</strong> yang jarang dibahas:
          membangun tim internal <em>dengan pendampingan agency</em> — dapat
          kecepatan agency di awal, kemandirian tim di akhir.
        </p>

        <h2>Perbandingan Langsung</h2>
        <table>
          <thead>
            <tr>
              <th>Aspek</th>
              <th>Agency</th>
              <th>In-House</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Biaya bulanan</td>
              <td>Rp 5–50 juta tergantung scope</td>
              <td>Gaji 1–4 orang (Rp 4–30 juta+) + tools + training</td>
            </tr>
            <tr>
              <td>Kecepatan mulai</td>
              <td>Cepat — tim & sistem sudah jadi</td>
              <td>Lambat — rekrut, onboarding, trial-error</td>
            </tr>
            <tr>
              <td>Skill spesialis</td>
              <td>Luas: ads, kreatif, analytics dalam satu fee</td>
              <td>Terbatas pada siapa yang kamu hire</td>
            </tr>
            <tr>
              <td>Pemahaman produk & brand</td>
              <td>Butuh waktu, tidak pernah sedalam orang dalam</td>
              <td>Sangat dalam — hidup bersama produknya</td>
            </tr>
            <tr>
              <td>Kontrol & kecepatan revisi</td>
              <td>Tergantung SLA agency</td>
              <td>Langsung — satu meja</td>
            </tr>
            <tr>
              <td>Risiko ketergantungan</td>
              <td>Tinggi — putus kontrak, kemampuan ikut pergi</td>
              <td>Rendah — knowledge tinggal di dalam</td>
            </tr>
            <tr>
              <td>Risiko kualitas</td>
              <td>Akun kamu satu dari banyak klien</td>
              <td>Tanpa mentor senior, tim bisa jalan tanpa arah</td>
            </tr>
          </tbody>
        </table>

        <h2>Kapan Pilih Agency</h2>
        <ul>
          <li>Butuh hasil dalam 1–3 bulan dan tidak ada waktu membangun tim</li>
          <li>Butuh skill yang mahal kalau di-hire penuh (media buyer senior, data analyst)</li>
          <li>Marketing masih fase eksperimen — belum yakin channel mana yang akan jadi tulang punggung</li>
          <li>Volume kerja belum cukup untuk mengisi orang full-time</li>
        </ul>

        <h2>Kapan Pilih In-House</h2>
        <ul>
          <li>Marketing sudah terbukti jadi mesin revenue dan akan jalan bertahun-tahun</li>
          <li>Brand voice dan kecepatan respons adalah keunggulan kompetitif kamu</li>
          <li>Budget agency bulanan sudah setara beberapa gaji staf</li>
          <li>Kamu siap invest di 1 orang senior sebagai anchor tim</li>
        </ul>

        <h2>Opsi Ketiga: Bangun Tim Internal dengan Pendampingan</h2>
        <p>
          Dilema klasiknya: agency cepat tapi membuat tergantung; in-house
          mandiri tapi lambat dan berisiko salah arah. Model ketiga menjawab
          keduanya — <strong>agency hadir bukan untuk mengerjakan selamanya,
          tapi untuk membangun tim kamu sampai mandiri</strong>.
        </p>
        <p>
          Di Mote Kreatif, model ini bernama{" "}
          <strong>TDMO (Team Development &amp; Marketing Optimization)</strong>:
          program 6 bulan di mana tim kami hadir on-site setiap minggu. Bulan
          1–2 kami eksekusi sambil transfer knowledge, bulan 3–4 tim kamu mulai
          memimpin dengan KPI framework dan AI CRM yang terinstal, bulan 5–6
          tim kamu handle 90% mandiri — lalu graduation dengan SOP
          terdokumentasi. Contoh nyata: tim marketing Home of BEN kini 100%
          mandiri menjalankan konten dan aktivasi tanpa kami.
        </p>
        <blockquote>
          Hasil akhirnya: kecepatan dan keahlian agency di awal, aset
          kapabilitas permanen di dalam perusahaan kamu di akhir.
        </blockquote>

        <h2>Kerangka Keputusan 3 Pertanyaan</h2>
        <ol>
          <li>
            <strong>Apakah marketing akan jadi fungsi inti 2+ tahun ke depan?</strong>{" "}
            Tidak → agency. Ya → lanjut ke pertanyaan 2.
          </li>
          <li>
            <strong>Apakah sudah ada (atau siap hire) orang yang bisa dididik?</strong>{" "}
            Tidak → agency dulu, sambil rekrut. Ya → lanjut ke pertanyaan 3.
          </li>
          <li>
            <strong>Apakah ada mentor/sistem untuk mengarahkan mereka?</strong>{" "}
            Ya → bangun in-house. Tidak → model pendampingan (TDMO) adalah
            jalur tercepat dan paling rendah risiko.
          </li>
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
          Tidak ada jawaban universal — yang ada konteks bisnis kamu hari ini.
          Fase eksperimen: agency. Fungsi inti jangka panjang dengan fondasi
          siap: in-house. Ingin keduanya: bangun tim internal dengan
          pendampingan terstruktur. Mau diskusi jalur mana yang pas untuk
          bisnis kamu? Mulai dari discovery call gratis 60 menit dengan Mote
          Kreatif.
        </p>
      </ArticleLayout>
    </>
  );
}
