import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "digital-marketing-hotel-resort"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Channel digital mana yang paling penting untuk hotel?",
    answer:
      "Google — bukan Instagram. Orang yang mencari 'hotel di [kota]' sudah dekat dengan keputusan booking. Prioritas: Google Business Profile yang dioptimalkan + manajemen review + Google Hotel Ads. Sosial media berperan membangun keinginan, Google memanen keputusannya.",
  },
  {
    question: "Bagaimana mengurangi ketergantungan pada OTA (Traveloka/Agoda)?",
    answer:
      "Bangun jalur direct booking: Google Hotel Ads dengan rate yang kompetitif vs OTA, penawaran eksklusif untuk yang booking langsung (early check-in, diskon F&B), dan database tamu untuk repeat booking via WhatsApp/email. OTA tetap dipakai untuk akuisisi tamu baru — tapi tamu kembali harus lewat jalur langsung.",
  },
  {
    question: "Berapa budget marketing yang wajar untuk hotel?",
    answer:
      "Patokan industri: 3–6% dari target revenue. Yang lebih penting: ukur marketing cost ratio (biaya marketing ÷ omset). Di studi kasus kami, ratio 0.44% tercapai karena fokus budget ke channel konversi (Google, retargeting) bukan ditabur rata ke semua platform.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          Digital marketing hotel yang efektif berdiri di atas funnel tiga
          tahap: <strong>mudah ditemukan</strong> (local SEO, Google Business
          Profile, Google Hotel Ads), <strong>dipertimbangkan</strong> (konten
          yang menjual pengalaman + review &amp; UGC sebagai proof), dan{" "}
          <strong>dipilih</strong> (penawaran kompetitif + jalur booking yang
          mudah). Kami membuktikannya di Rancabango Hotel &amp; Resort Garut:
          occupancy dari baseline 43% menjadi <strong>61% di low season</strong>,
          omset <strong>+77%</strong>, dengan marketing cost ratio hanya{" "}
          <strong>0.44%</strong>.
        </p>

        <h2>Mulai dari Data, Bukan Konten</h2>
        <p>
          Sebelum bicara Instagram atau TikTok, bedah dulu struktur revenue.
          Di kasus Rancabango: 70,5% pendapatan dari kamar, dan 64% revenue
          bergantung pada list account korporat yang rentan kebijakan
          efisiensi. Kesimpulan strategisnya jelas — perluas pasar FIT
          (independent traveler) dan group, fokuskan semua channel untuk
          men-drive booking kamar. Tanpa analisa ini, konten hanya tebakan.
        </p>

        <h2>Tahap 1 — Mudah Ditemukan: Google Adalah Raja untuk Hotel</h2>
        <ul>
          <li>
            <strong>Google Business Profile:</strong> foto berkualitas, kategori
            tepat, Q&amp;A terisi, posting rutin. Mayoritas keputusan hotel
            dimulai dari panel Maps ini.
          </li>
          <li>
            <strong>Manajemen review proaktif:</strong> minta review dari tamu
            puas, balas semua review (termasuk yang buruk, dengan profesional).
            Rating naik = ranking lokal naik = trust naik.
          </li>
          <li>
            <strong>Local SEO:</strong> kuasai kata kunci niat tinggi —
            &ldquo;hotel di [kota]&rdquo;, &ldquo;resort [kota]&rdquo;,
            &ldquo;staycation [kota]&rdquo;, &ldquo;villa private [kota]&rdquo;.
          </li>
          <li>
            <strong>Google Hotel Ads:</strong> tampil di price comparison saat
            orang sudah siap booking — mengunci demand yang paling panas dan
            melawan dominasi OTA.
          </li>
        </ul>

        <h2>Tahap 2 — Dipertimbangkan: Jual Pengalaman, Bukan Fasilitas</h2>
        <p>
          Daftar fasilitas tidak menjual; <strong>rasa</strong> yang menjual.
          Di Rancabango, positioning &ldquo;Balinese concept&rdquo; digeser
          dari estetika menjadi aspirasi rasa lewat big idea{" "}
          <em>#APlaceToBePresent</em> — tempat untuk hadir sepenuhnya: ruang
          jeda, ruang pulih, ruang pulang. Eksekusinya lewat 6 pilar konten
          (dari suasana kabut pagi sampai paket gathering keluarga), arah
          visual yang tenang dan puitis, plus UGC &amp; KOL sebagai lapisan
          bukti.
        </p>
        <ul>
          <li><strong>Instagram</strong> = etalase brand: feed sebagai brochure modern, highlight paket, proof review</li>
          <li><strong>TikTok</strong> = mesin discovery: hook cepat, ambience, konten direct ke kebutuhan (escape, gathering, couple)</li>
          <li><strong>Peran jelas per channel</strong> — jangan minta TikTok mengkonversi dan Google membangun awareness; terbalik</li>
        </ul>

        <h2>Tahap 3 — Dipilih: Konversi &amp; Trust Layer</h2>
        <ul>
          <li>Penawaran kompetitif yang relevan dengan musim (bundling, seasonal offer, urgensi)</li>
          <li>CTA booking tegas di semua touchpoint — link WhatsApp/booking engine yang tidak berbelit</li>
          <li>Trust layer: rating Google, testimoni, UGC — orang membeli kamar yang sudah &ldquo;dialami&rdquo; orang lain</li>
        </ul>

        <h2>KPI per Tahap Funnel</h2>
        <table>
          <thead>
            <tr>
              <th>Funnel</th>
              <th>KPI</th>
              <th>Target perbaikan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Awareness</td>
              <td>Impressions, reach, video views</td>
              <td>Konsistensi pilar konten &amp; creative direction</td>
            </tr>
            <tr>
              <td>Traffic</td>
              <td>Profile visit, website click, CTR</td>
              <td>CTA, link flow, highlight paket, proof</td>
            </tr>
            <tr>
              <td>Conversion</td>
              <td>Inquiry/DM, booking, <strong>occupancy rate</strong></td>
              <td>Penawaran kompetitif + trust layer</td>
            </tr>
          </tbody>
        </table>
        <blockquote>
          Metrik utara hotel tetap satu: occupancy rate dan revenue. Kalau
          engagement naik tapi occupancy diam, strateginya salah sasaran.
        </blockquote>

        <h2>Hasil yang Bisa Dicapai</h2>
        <p>
          Dengan kerangka di atas, Rancabango Hotel &amp; Resort mencapai:
          omset <strong>+77%</strong>, occupancy <strong>61% di periode low
          season</strong> (dari baseline tahunan 43%), dan marketing cost
          ratio <strong>0.44%</strong> — turun 86%. Detail strateginya bisa
          dibaca di studi kasus lengkap kami.
        </p>

        <h2>FAQ</h2>
        {FAQ.map((f) => (
          <div key={f.question}>
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </div>
        ))}

        <h2>Kesimpulan</h2>
        <p>
          Digital marketing hotel bukan soal rajin posting — tapi soal sistem:
          data revenue menentukan strategi, Google memanen demand, konten
          menjual rasa, dan setiap tahap funnel punya KPI. Mote Kreatif
          membantu hotel &amp; resort membangun sistem ini end-to-end. Mulai
          dari diskusi gratis 60 menit.
        </p>
      </ArticleLayout>
    </>
  );
}
