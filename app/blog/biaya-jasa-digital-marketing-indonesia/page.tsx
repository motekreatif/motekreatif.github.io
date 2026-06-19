import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "biaya-jasa-digital-marketing-indonesia"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Berapa biaya minimal untuk mulai digital marketing?",
    answer:
      "Untuk UMKM, titik mulai yang realistis adalah Rp 3–5 juta per bulan: kombinasi pengelolaan 1–2 channel organik plus budget iklan kecil untuk testing. Di bawah itu, biasanya hasilnya sulit diukur karena data terlalu sedikit untuk optimasi.",
  },
  {
    question: "Lebih murah mana: agency atau hire staf marketing sendiri?",
    answer:
      "Tergantung fase bisnis. Satu staf marketing junior di Indonesia sekitar Rp 4–8 juta/bulan tapi butuh arahan strategi. Agency mulai dari Rp 5–15 juta/bulan untuk scope menengah, sudah termasuk strategi + eksekusi + tools. Untuk jangka panjang, opsi paling efisien sering kali hybrid: bangun tim internal dengan pendampingan (model seperti TDMO).",
  },
  {
    question: "Apakah budget iklan termasuk dalam fee agency?",
    answer:
      "Tidak. Fee agency (management fee) terpisah dari ad spend (budget yang dibayarkan ke Meta/Google/TikTok). Pastikan proposal memisahkan keduanya dengan jelas — itu salah satu tanda agency yang transparan.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          Biaya jasa digital marketing di Indonesia tahun 2026 sangat bervariasi
          tergantung scope. Sebagai gambaran pasar:{" "}
          <strong>social media management Rp 2–10 juta/bulan</strong>,{" "}
          <strong>pengelolaan iklan (Meta/Google/TikTok) Rp 3–15 juta/bulan</strong>{" "}
          di luar budget iklan, <strong>marketplace optimization Rp 3–10 juta/bulan</strong>,
          dan paket end-to-end untuk brand yang serius scale{" "}
          <strong>Rp 10–50 juta/bulan</strong>. Angka pastinya ditentukan oleh
          scope channel, kompleksitas bisnis, dan target.
        </p>
        <blockquote>
          Catatan penting: angka di atas adalah rentang umum pasar Indonesia,
          bukan price list. Agency yang baik tidak menjual paket pukul rata —
          mereka menyusun scope dari target bisnis kamu.
        </blockquote>

        <h2>Rincian Biaya per Jenis Layanan</h2>
        <table>
          <thead>
            <tr>
              <th>Layanan</th>
              <th>Rentang Pasar (per bulan)</th>
              <th>Yang Biasanya Termasuk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Social media management</td>
              <td>Rp 2–10 juta</td>
              <td>Content plan, desain/video, posting, community management</td>
            </tr>
            <tr>
              <td>Ads management (Meta/Google/TikTok)</td>
              <td>Rp 3–15 juta (di luar ad spend)</td>
              <td>Setup campaign, creative testing, optimasi, report</td>
            </tr>
            <tr>
              <td>Marketplace optimization (Shopee/TikTok Shop)</td>
              <td>Rp 3–10 juta</td>
              <td>Optimasi toko & listing, CPAS, review management</td>
            </tr>
            <tr>
              <td>SEO</td>
              <td>Rp 3–20 juta</td>
              <td>Riset keyword, konten, technical SEO, backlink</td>
            </tr>
            <tr>
              <td>Digital marketing end-to-end</td>
              <td>Rp 10–50 juta</td>
              <td>Strategi menyeluruh multi-channel + analytics</td>
            </tr>
            <tr>
              <td>Program pengembangan tim internal</td>
              <td>Custom (per program, biasanya 6 bulan)</td>
              <td>Mentoring on-site, KPI framework, sistem reporting, handover</td>
            </tr>
          </tbody>
        </table>

        <h2>Faktor yang Menentukan Harga</h2>
        <ul>
          <li>
            <strong>Jumlah channel:</strong> 1 platform vs 4 platform jelas
            beda beban kerja.
          </li>
          <li>
            <strong>Volume konten:</strong> 8 post/bulan vs 30 post + 12 video
            pendek.
          </li>
          <li>
            <strong>Kompleksitas funnel:</strong> jualan langsung di marketplace
            lebih sederhana daripada funnel B2B dengan nurturing panjang.
          </li>
          <li>
            <strong>Level strategi:</strong> eksekutor lepas (terima brief,
            kerjakan) vs partner strategis (ikut menentukan arah, bertanggung
            jawab ke angka).
          </li>
          <li>
            <strong>Lokasi agency:</strong> agency Jakarta umumnya 30–50% lebih
            mahal dari agency kota lain dengan kualitas setara — overhead-nya
            beda.
          </li>
        </ul>

        <h2>Cara Menghitung Budget yang Masuk Akal</h2>
        <p>
          Rumus praktis yang kami pakai di Mote Kreatif: total budget marketing
          (fee + ad spend) yang sehat umumnya{" "}
          <strong>5–15% dari target revenue</strong>. Contoh: target omset
          Rp 100 juta/bulan → budget marketing wajar Rp 5–15 juta/bulan.
          Kalau budget di bawah 5%, target biasanya tidak realistis. Di atas
          20%, ada masalah efisiensi yang harus dibedah dulu.
        </p>
        <p>
          Metrik yang lebih penting dari &ldquo;berapa biayanya&rdquo; adalah{" "}
          <strong>berapa yang kembali</strong>. Di studi kasus kami, Rancabango
          Hotel mencapai marketing cost ratio 0.44% terhadap omset — artinya
          setiap Rp 1 biaya marketing menghasilkan ratusan rupiah revenue.
          Itulah angka yang seharusnya kamu kejar, bukan fee termurah.
        </p>
        <p>
          Untuk UMKM yang ingin menekan biaya akuisisi, channel berbiaya rendah
          seperti pesan langsung ke pelanggan lama sering memberi ROI lebih
          tinggi daripada menambah budget iklan. Sebelum mengirim, pahami dulu{" "}
          <Link href="/blog/wa-blast-panduan-lengkap">
            cara kirim WhatsApp massal yang aman
          </Link>{" "}
          supaya nomor tidak terkena blokir.
        </p>

        <h2>Red Flag Soal Harga</h2>
        <ul>
          <li>
            <strong>Terlalu murah dengan janji besar</strong> — &ldquo;Rp 500
            ribu/bulan auto viral&rdquo; biasanya berakhir konten template dan
            bot engagement.
          </li>
          <li>
            <strong>Tidak memisahkan fee dan ad spend</strong> — kamu tidak tahu
            berapa yang benar-benar jadi iklan.
          </li>
          <li>
            <strong>Kontrak panjang tanpa exit clause</strong> — agency yang
            yakin dengan hasilnya tidak perlu mengunci kamu 12 bulan.
          </li>
          <li>
            <strong>Tidak ada KPI tertulis</strong> — tanpa angka target,
            evaluasi jadi debat opini.
          </li>
        </ul>

        <h2>FAQ</h2>
        {FAQ.map((f) => (
          <div key={f.question}>
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </div>
        ))}

        <h2>Kesimpulan</h2>
        <p>
          Biaya digital marketing di Indonesia mulai dari Rp 2–3 juta/bulan
          untuk scope kecil sampai Rp 50 juta+ untuk end-to-end. Yang
          menentukan worth-it atau tidak bukan harganya — tapi apakah setiap
          rupiah terhubung ke revenue yang terukur. Mulai dari target bisnis,
          hitung mundur budget yang masuk akal, dan pilih partner yang berani
          diukur dengan angka.
        </p>
      </ArticleLayout>
    </>
  );
}
