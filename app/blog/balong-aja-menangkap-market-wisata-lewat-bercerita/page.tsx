import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "balong-aja-menangkap-market-wisata-lewat-bercerita"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

export default function Page() {
  return (
    <ArticleLayout post={post}>
      <h2>Ringkasan Cepat Studi Kasus</h2>
      <p>
        Balong Aja (destinasi cafe dengan view danau &amp; gunung di Cilopang,
        Garut) ditumbuhkan lewat pendekatan yang sederhana namun presisi:
      </p>
      <ul>
        <li>
          Mulai dari <strong>offering (value creation)</strong> untuk sesi pagi —
          bukan sekadar &ldquo;posting lebih banyak&rdquo;.
        </li>
        <li>
          Bungkus dengan narasi yang membuat value-nya terasa dan mudah diingat:{" "}
          <strong>#JedaDiBalongAja</strong>.
        </li>
        <li>Distribusi strategis lewat channel media &amp; kolaborasi yang selaras.</li>
        <li>
          Validasi dengan data: porsi transaksi sarapan meningkat di Q2 2025,
          dan revenue Q2 tercatat <strong>34,5% di atas target</strong>.
        </li>
      </ul>

      <h2>Konteks: Kenapa Balong Aja Relevan untuk Market Wisata</h2>
      <p>
        Balong Aja dikenal sebagai tempat dengan lanskap yang kuat: danau yang
        tenang, suasana asri, dan view gunung. Secara positioning, ini bukan
        sekadar &ldquo;tempat makan&rdquo;, tapi{" "}
        <strong>tempat orang mencari jeda</strong>—yang kalau ditangkap dengan
        benar, punya potensi jadi destinasi wisata lintas kota.
      </p>

      <h2>Tantangan Q2 2025: Menaikkan Traffic Pagi Tanpa Mengorbankan Sesi Lain</h2>
      <p>
        Masalah klasik banyak destinasi: <strong>ramai di jam tertentu</strong>,
        tapi &ldquo;kosong&rdquo; di jam lain. Pada studi kasus ini, fokusnya
        adalah <strong>mengembangkan kunjungan pagi</strong> (karena saat itu
        kunjungan lebih dominan malam). Targetnya jelas: bukan cuma &ldquo;naik
        engagement&rdquo;, tapi <strong>naik traffic real</strong> di sesi
        pagi—yang ujungnya harus terasa di transaksi.
      </p>

      <h2>Strategi Inti: Mulai dari Value Creation (Bukan Mulai dari Konten)</h2>
      <p>
        Banyak brand terjebak: saat ingin tumbuh, yang dibahas pertama adalah
        &ldquo;kontennya apa?&rdquo;. Di studi kasus Balong Aja, urutannya
        dibalik: <strong>value dulu, baru konten</strong>.
      </p>
      <h3>1) Susun offering pagi yang masuk akal</h3>
      <p>
        Offering pagi dirancang supaya orang punya alasan kuat untuk datang
        lebih awal—misalnya: <strong>menu sarapan</strong> dan{" "}
        <strong>aktivitas outdoor</strong> (olahraga pagi, jogging, yoga), yang
        cocok dengan karakter lokasi Balong Aja: tenang, asri, dan
        &ldquo;view-nya bekerja&rdquo;.
      </p>
      <h3>2) Jadikan rutinitas, bukan event sekali lewat</h3>
      <p>
        Fokusnya bukan membuat &ldquo;promo meledak 1 minggu&rdquo;, tapi
        menumbuhkan kebiasaan: datang pagi sebagai gaya hidup (jeda, olahraga
        ringan, sarapan, lalu pulang/lanjut aktivitas).
      </p>
      <blockquote>
        Konten terbaik pun akan sulit menumbuhkan sesi baru jika offering-nya
        tidak jelas. Value creation membuat konten punya &ldquo;bahan
        bakar&rdquo; dan arah yang spesifik.
      </blockquote>

      <h2>Mencipta Narasi yang &ldquo;Menunjukkan Value&rdquo;</h2>
      <p>
        Setelah offering beres, barulah narasi dibangun untuk mempermudah
        audiens menangkap value tersebut — dengan campaign seperti{" "}
        <strong>#JedaDiBalongAja</strong>. Narasi yang baik bukan cuma
        estetika. Ia harus menjawab, tanpa terasa menjual:{" "}
        <strong>&ldquo;Kenapa harus datang pagi?&rdquo;</strong> dan{" "}
        <strong>&ldquo;Apa yang akan saya rasakan di sana?&rdquo;</strong>
      </p>
      <h3>Template narasi yang bisa kamu tiru</h3>
      <ul>
        <li>
          <strong>Problem manusia:</strong> &ldquo;Dunia makin cepat, manusia
          butuh jeda.&rdquo;
        </li>
        <li>
          <strong>Setting kuat:</strong> danau + alam + suasana tenang.
        </li>
        <li>
          <strong>Aksi sederhana:</strong> pagi, olahraga ringan, sarapan.
        </li>
        <li>
          <strong>Rasa (benefit):</strong> pulang dengan kepala lebih ringan.
        </li>
      </ul>

      <h2>Distribusi Channel &amp; Kolaborasi yang Strategis</h2>
      <p>
        Narasi dan konten tidak akan maksimal jika berhenti di produksi.
        Distribusi diarahkan agar konten &ldquo;nyampe&rdquo; ke audiens yang
        tepat:
      </p>
      <ul>
        <li>
          <strong>Channel media:</strong> Konten difokuskan dan konsisten
          membahas &ldquo;outdoor pagi di Balong&rdquo;. Tujuannya: membentuk
          asosiasi (pagi = Balong) di benak audiens.
        </li>
        <li>
          <strong>Kolaborasi:</strong> Jalur distribusi tambahan untuk
          menjangkau komunitas yang relevan (komunitas olahraga, lifestyle,
          hingga audiens wisata).
        </li>
      </ul>

      <h2>Bukti Data: Traffic Pagi Tumbuh (Q1 vs Q2 2025)</h2>
      <p>
        Bagian paling penting dari creative performance marketing adalah:{" "}
        <strong>kreatif harus terbukti</strong>. Ringkasan transaksi
        berdasarkan <em>sales time</em> menunjukkan peningkatan porsi sarapan
        di Q2:
      </p>
      <table>
        <thead>
          <tr>
            <th>Periode</th>
            <th>Breakfast (07:00–11:00)</th>
            <th>Lunch (11:00–17:00)</th>
            <th>Dinner (17:00–Closed)</th>
            <th>Total Transaksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1 2025</td>
            <td>188 (17,39%)</td>
            <td>689 (63,50%)</td>
            <td>207 (19,10%)</td>
            <td>1.085</td>
          </tr>
          <tr>
            <td>Q2 2025</td>
            <td>433 (20,51%)</td>
            <td>1.380 (65,38%)</td>
            <td>298 (14,14%)</td>
            <td>2.112</td>
          </tr>
        </tbody>
      </table>
      <p>
        Insight utamanya: porsi breakfast naik (17,39% → 20,51%) bersamaan
        dengan total transaksi yang ikut naik. Ini memperkuat hipotesis bahwa
        market merespons offering pagi + narasi yang konsisten.
      </p>

      <h2>Dampak Bisnis: Revenue Tembus 34,5% di Atas Target</h2>
      <p>
        Pertumbuhan sesi pagi bukan cuma &ldquo;bagus di story&rdquo;, tapi
        berdampak ke bisnis: <strong>Revenue Q2 tembus 34,5% di atas target</strong>.
      </p>
      <h3>Kenapa ini penting untuk owner?</h3>
      <ul>
        <li>
          Menciptakan jalur revenue baru (pagi) tanpa mengorbankan sesi lain
          (siang/sore/malam).
        </li>
        <li>
          Keputusan berbasis data: bukan asumsi, tapi validasi dari transaksi
          dan performa.
        </li>
        <li>
          Brand tumbuh dari dua sisi: persepsi (rasa di benak audiens) dan
          performance (angka).
        </li>
      </ul>

      <h2>Key Learning untuk Bisnis Wisata/F&amp;B</h2>
      <h3>1) Mulai dari analisa data → baru strategi</h3>
      <p>
        Tentukan sesi yang lemah (pagi/siang/sore) dan tetapkan metrik
        keberhasilan yang jelas (traffic real, transaksi, porsi sales time).
      </p>
      <h3>2) Value creation: buat offering yang membuat orang bergerak</h3>
      <p>
        Offering harus &ldquo;klik&rdquo; dengan karakter lokasi. Di Balong
        Aja, alam + danau mendukung aktivitas pagi dan sarapan.
      </p>
      <h3>3) Narasi kreatif yang konsisten + distribusi</h3>
      <p>
        Narasi seperti #JedaDiBalongAja membantu value terasa manusiawi. Lalu
        perkuat dengan jalur distribusi dan kolaborasi.
      </p>
      <h3>4) Ukur, evaluasi, ulang</h3>
      <p>
        Creative performance marketing itu siklus. Kreatif dibuat → disebar →
        diukur → diperbaiki → distabilkan jadi kebiasaan.
      </p>

      <h2>FAQ</h2>
      <h3>Apa yang membuat strategi ini berbeda dari &ldquo;sekadar bikin konten&rdquo;?</h3>
      <p>
        Bedanya ada di urutan kerja: <strong>offering dulu</strong> (value
        creation) → <strong>narasi</strong> → <strong>distribusi</strong> →{" "}
        <strong>validasi data</strong>. Konten jadi alat untuk mendorong
        perilaku (datang pagi), bukan tujuan akhir.
      </p>
      <h3>Kalau saya tidak punya danau/gunung, apakah tetap bisa?</h3>
      <p>
        Bisa. Prinsipnya bukan &ldquo;danau&rdquo;, tapi{" "}
        <strong>karakter tempat</strong>. Temukan kekuatan paling autentik
        (suasana, menu khas, komunitas, aktivitas) lalu ciptakan offering yang
        relevan.
      </p>
      <h3>Berapa lama biasanya dampaknya terlihat?</h3>
      <p>
        Umumnya butuh konsistensi beberapa minggu sampai 1 kuartal karena yang
        dibangun adalah kebiasaan. Di studi kasus ini, evaluasi dilakukan pada
        periode Q2 (April–Juni).
      </p>
    </ArticleLayout>
  );
}
