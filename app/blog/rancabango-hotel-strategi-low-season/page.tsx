/* eslint-disable @next/next/no-img-element */
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "rancabango-hotel-strategi-low-season"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

export default function Page() {
  return (
    <ArticleLayout post={post}>
      <h2>Ringkasan Campaign</h2>
      <p>
        Kampanye Q3 2025 untuk Rancabango Hotel &amp; Resort disusun untuk
        menjawab tantangan low-season dengan fokus utama: menaikkan occupancy
        rate lewat positioning yang lebih tajam, visibilitas yang lebih kuat di
        mesin pencari, dan konten yang lebih relevan terhadap kebutuhan pasar.
      </p>
      <ul>
        <li>
          <strong>What we sell:</strong> Experience &ldquo;tropical
          escape&rdquo; yang dekat, tenang, dan jujur—bukan &ldquo;Bali
          palsu&rdquo;, tapi &ldquo;rasa&rdquo; yang setara dengan cara uniknya
          sendiri.
        </li>
        <li>
          <strong>Who we target:</strong> Independent traveler dan segmen group
          (residence / non-residence), dengan penekanan pada kebutuhan
          gathering &amp; quality time.
        </li>
        <li>
          <strong>How we win:</strong> Local SEO + Google Business Profile +
          Google Hotel Ads, dipadu konten video (IG/TikTok), UGC/KOL, dan
          narasi puitis yang membumi.
        </li>
      </ul>

      <h2>Insight Kunci &amp; Masalah Utama yang Harus Diselesaikan</h2>
      <p>
        Dari analisa revenue stream, komposisi terbesar pendapatan berada di
        hotel (sekitar <strong>70,5%</strong>). Sementara pendapatan tiket
        kolam renang hanya sekitar <strong>1,7%</strong>, mengindikasikan
        perannya sebagai layanan pelengkap minor. Artinya: untuk menang di Q3,
        fokus utama harus men-drive <strong>booking kamar</strong> dan paket
        yang memperkuat nilai tinggal.
      </p>
      <ul>
        <li>
          <strong>Occupancy baseline:</strong> rata-rata okupansi 2024 berada
          di kisaran <strong>43%</strong> — ada ruang besar untuk ditingkatkan.
        </li>
        <li>
          <strong>Instagram:</strong> CTR sudah cukup baik (sekitar{" "}
          <strong>2%</strong>), namun impresi masih volatil dan positioning
          belum &ldquo;clear&rdquo;.
        </li>
        <li>
          <strong>TikTok:</strong> view lebih baik, namun profil visit stagnan
          dan CTR sangat rendah (sekitar <strong>0,03%</strong>), membuat
          konversi lemah.
        </li>
        <li>
          <strong>Google Search:</strong> visibilitas belum unggul dibanding
          kompetitor yang agresif menggunakan sponsored ads—padahal search
          penting untuk market dewasa yang dominan.
        </li>
        <li>
          <strong>Revenue risk:</strong> mayoritas pendapatan Jan–Sep 2024
          banyak berasal dari &ldquo;List Account&rdquo; (sekitar{" "}
          <strong>64%</strong>), dan perubahan kebijakan efisiensi
          korporat/instansi menjadi ancaman nyata.
        </li>
      </ul>
      <blockquote>
        Implikasi praktis: kita harus memperluas akuisisi di luar &ldquo;list
        account&rdquo; dengan menguatkan pasar FIT (independent traveler) dan
        group yang tepat—tanpa mengorbankan kualitas experience.
      </blockquote>

      <h2>Strategi Funnel: Mudah Ditemukan → Dikunjungi → Dipilih</h2>
      <p>
        Untuk memenangkan Q3, kampanye diarahkan pada funnel sederhana namun
        tajam: <strong>Brand Awareness → Website Traffic → Conversion Rate</strong>.
        Setiap channel harus punya peran jelas: membuat orang menemukan, lalu
        mengunjungi, lalu memilih (booking).
      </p>
      <ul>
        <li>
          <strong>Found (Discovery):</strong> Local SEO, Google Business
          Profile, Google Hotel Ads, dan TikTok/IG Reels sebagai mesin
          &ldquo;reach&rdquo;.
        </li>
        <li>
          <strong>Visit (Consideration):</strong> Konten yang lebih direct ke
          kebutuhan pasar: paket, alasan datang, proof (UGC/review), dan angle
          seasonal.
        </li>
        <li>
          <strong>Choose (Conversion):</strong> Penawaran kompetitif, narasi
          paling relevan, CTA booking yang tegas, serta trust layer (ulasan
          &amp; testimoni).
        </li>
      </ul>

      <h2>Big Idea Campaign: &ldquo;A Place To Be Present&rdquo;</h2>
      <p>
        &ldquo;Balinese Concept in Garut&rdquo; adalah kekuatan, tapi juga
        tricky. Jika dipaksakan sebagai &ldquo;bentuk&rdquo;, ia mudah terasa
        kosmetik. Karena itu, strategi kreatif menggeser &ldquo;Bali&rdquo;
        dari <strong>estetika</strong> menjadi <strong>aspirasi rasa</strong>:
        tenang, lepas dari rutinitas, dekat dengan alam, dan quality time.
      </p>
      <blockquote>
        Tempat ini tidak menjanjikan Bali. Tapi ia menyajikan rasa yang
        sama—dengan cara uniknya sendiri.
      </blockquote>
      <p>
        Di situlah &ldquo;A Place To Be Present&rdquo; bekerja: tempat yang
        bukan hanya indah, tapi membuat kita ingin hadir sepenuhnya—dengan
        tubuh, pikiran, dan perasaan. Bukan sekadar tempat menginap, melainkan{" "}
        <strong>ruang jeda</strong>, <strong>ruang pulih</strong>,{" "}
        <strong>ruang pulang</strong>. Hashtag campaign{" "}
        <strong>#APlaceToBePresent</strong> dipakai konsisten di konten utama,
        UGC, dan kolaborasi KOL untuk membangun &ldquo;memory structure&rdquo;
        di audiens.
      </p>

      <h2>Pilar Konten &amp; Output Bulanan</h2>
      <table>
        <thead>
          <tr>
            <th>Pilar Konten</th>
            <th>Fungsi di Funnel</th>
            <th>Contoh Angle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stay &amp; Soul</td>
            <td>Awareness → Consideration</td>
            <td>Ruang jeda, suasana tenang, kabut pagi, ritual &ldquo;slow living&rdquo;.</td>
          </tr>
          <tr>
            <td>Rasa &amp; Ruang</td>
            <td>Consideration</td>
            <td>F&amp;B experience, ambience Arummanis, detail rasa &amp; momen.</td>
          </tr>
          <tr>
            <td>Sisi Garut Yang Lain</td>
            <td>Awareness</td>
            <td>Garut sebagai destinasi premium yang &ldquo;tidak terduga&rdquo;.</td>
          </tr>
          <tr>
            <td>Event &amp; Promo</td>
            <td>Conversion</td>
            <td>Paket bundling, seasonal offer, urgensi, CTA booking.</td>
          </tr>
          <tr>
            <td>Tropical Escape</td>
            <td>Awareness</td>
            <td>&ldquo;Jika kamu pernah mencari Bali, tapi tak sempat pergi…&rdquo;</td>
          </tr>
          <tr>
            <td>Kembali Bersama</td>
            <td>Consideration → Conversion</td>
            <td>Gathering keluarga/komunitas, villa luas, area kumpul.</td>
          </tr>
        </tbody>
      </table>

      <h2>Arah Kreatif: Visual, Foto, dan Copy</h2>
      <p>
        Karena positioning-nya tentang &ldquo;rasa&rdquo;, maka visual dan kata
        harus jadi penghantar suasana. Arah kreatif campaign disusun agar
        konten terasa <strong>tenang</strong>, <strong>hangat</strong>,{" "}
        <strong>puitis</strong>, dan tetap membumi.
      </p>
      <ul>
        <li>
          <strong>Visual Direction:</strong> Lembut dan menggoda: warna alami,
          kabut, tekstur kayu, cahaya organik—membuat orang ingin
          &ldquo;tinggal lebih lama&rdquo;.
        </li>
        <li>
          <strong>Copywriting Direction:</strong> Undangan lembut, bukan
          promosi keras. Kalimat kontemplatif yang mengajak audiens
          &ldquo;hadir&rdquo;.
        </li>
        <li>
          <strong>Photography Direction:</strong> Manusia sebagai bagian kecil
          lanskap. Fokus ke detail: embun, kabut, tekstur—hening, tidak penuh
          distraksi.
        </li>
      </ul>
      <blockquote>
        Kalau konten hanya &ldquo;cantik&rdquo;, ia berhenti di like. Kalau
        konten mengantar rasa, ia bergerak ke klik, DM, dan booking.
      </blockquote>

      <h2>Aktivasi Channel: Google, Instagram, TikTok</h2>
      <h3>1) Google: Local Visibility &amp; Consideration</h3>
      <ul>
        <li>Optimasi Google Business Profile (profil, foto, kategori, Q&amp;A, posting rutin).</li>
        <li>Manajemen ulasan proaktif untuk menaikkan trust dan ranking lokal.</li>
        <li>Local SEO dengan keyword yang relevan (hotel/resort Garut, villa private, staycation Garut, dsb.).</li>
        <li>Aktivasi Google Hotel Ads untuk mengunci demand pencarian yang sudah &ldquo;siap beli&rdquo;.</li>
      </ul>
      <h3>2) Instagram: Etalase Brand &amp; Proof</h3>
      <ul>
        <li>Perjelas positioning: &ldquo;tropical escape di Garut&rdquo; dengan narasi yang konsisten.</li>
        <li>Kurasi feed sebagai &ldquo;brochure modern&rdquo;: pilar konten + highlight paket + proof (review/UGC).</li>
        <li>Manfaatkan Instagram search lewat kata kunci di caption, alt text, dan highlight yang rapi.</li>
      </ul>
      <h3>3) TikTok: Relevansi, Retensi, lalu Klik</h3>
      <ul>
        <li>Prioritaskan format video sebagai format utama (hook cepat, momen hening, ambience).</li>
        <li>Konten harus lebih direct ke kebutuhan pasar (escape, family gathering, couple, promo bundling).</li>
        <li>Bangun trust lewat <strong>UGC &amp; KOL</strong> agar &ldquo;ingin menginap&rdquo; berubah jadi tindakan.</li>
      </ul>

      <h2>KPI &amp; Ukuran Keberhasilan</h2>
      <table>
        <thead>
          <tr>
            <th>Funnel</th>
            <th>KPI Utama</th>
            <th>Catatan Implementasi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Awareness</td>
            <td>Impressions, Reach, Video Views</td>
            <td>Fokus konsistensi pilar + creative direction untuk membangun memori.</td>
          </tr>
          <tr>
            <td>Traffic</td>
            <td>Profile Visit, Website Click, CTR</td>
            <td>Perkuat CTA, link flow, highlight paket, dan proof (review/UGC).</td>
          </tr>
          <tr>
            <td>Conversion</td>
            <td>Inquiry/DM, Booking, Occupancy Rate</td>
            <td>Penawaran kompetitif + narasi relevan + trust layer (Google reviews &amp; UGC).</td>
          </tr>
        </tbody>
      </table>

      <h2>FAQ</h2>
      <h3>Kenapa &ldquo;Bali&rdquo; tidak dipakai sebagai klaim utama?</h3>
      <p>
        Karena &ldquo;memaksakan Bali di Garut&rdquo; berisiko terasa kosmetik.
        Strateginya: mengubah &ldquo;Bali&rdquo; menjadi simbol rasa/aspirasi
        (tenang, tropis, quality time), sehingga positioning lebih jujur dan
        lebih tahan lama.
      </p>
      <h3>Kenapa Google (SEO &amp; GBP) jadi prioritas?</h3>
      <p>
        Search adalah medium konsiderasi yang kuat, terutama untuk market
        dewasa yang masih dominan. Saat orang mencari, mereka cenderung sudah
        dekat dengan keputusan. Karena itu, visibilitas di mesin pencari dan
        trust dari ulasan menjadi pengungkit konversi.
      </p>
      <h3>Bagaimana TikTok bisa membantu booking kalau CTR rendah?</h3>
      <p>
        TikTok menang di discovery. Namun supaya berujung booking, konten harus
        lebih relevan (direct ke kebutuhan), punya proof (UGC/KOL), dan
        mengarahkan audiens ke jalur konversi yang jelas (profil, link, paket,
        CTA).
      </p>

      <h2>Penutup: Menang Q3 Itu Soal &ldquo;Rasa&rdquo; yang Terukur</h2>
      <p>
        Campaign Q3 2025 Rancabango bukan sekadar kalender konten. Ini adalah
        upaya menyatukan positioning, sistem visibilitas digital, dan eksekusi
        kreatif agar &ldquo;tropical escape&rdquo; terasa nyata, mudah
        ditemukan, dan akhirnya dipilih.
      </p>
      <blockquote>
        Awareness tinggi + tawaran kompetitif + trust layer = kombinasi
        kemenangan.
      </blockquote>
    </ArticleLayout>
  );
}
