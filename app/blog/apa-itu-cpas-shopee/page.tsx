import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find((p) => p.slug === "apa-itu-cpas-shopee")!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Apakah CPAS bisa untuk toko Shopee baru?",
    answer:
      "Bisa, tapi efektivitasnya lebih tinggi untuk toko yang sudah punya traksi: katalog rapi, rating baik, dan riwayat penjualan. Toko baru sebaiknya benahi fondasi toko dulu (listing, foto, harga, review awal) sebelum scale lewat CPAS.",
  },
  {
    question: "Berapa minimal budget untuk mulai CPAS?",
    answer:
      "Praktisnya mulai dari Rp 100–150 ribu/hari untuk fase learning yang sehat. Di bawah itu, algoritma Meta kesulitan keluar dari learning phase karena data konversi terlalu sedikit.",
  },
  {
    question: "Apa beda CPAS dengan Shopee Ads biasa?",
    answer:
      "Shopee Ads tampil di dalam Shopee (search & rekomendasi) — menangkap orang yang sudah berniat belanja. CPAS tampil di Facebook/Instagram — menjangkau orang di luar Shopee lalu mengarahkannya ke toko kamu. Keduanya saling melengkapi: CPAS memperluas demand, Shopee Ads memanen demand.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          <strong>CPAS (Collaborative Performance Advertising Solution)</strong>{" "}
          adalah format iklan kolaborasi antara Meta (Facebook/Instagram) dan
          marketplace seperti Shopee. Katalog produk Shopee kamu terhubung
          langsung ke Meta Ads, sehingga iklan di Facebook/Instagram bisa
          menampilkan produk real-time (harga, stok, foto) dan mengarahkan
          pembeli langsung ke halaman produk di Shopee —{" "}
          <strong>dengan tracking konversi penuh sampai ke transaksi</strong>.
        </p>
        <p>
          Bedanya dengan iklan biasa: kamu tahu persis berapa rupiah penjualan
          yang dihasilkan setiap rupiah iklan (ROAS), karena konversi tercatat
          di level produk.
        </p>

        <h2>Cara Kerja CPAS</h2>
        <ol>
          <li>
            <strong>Koneksi katalog:</strong> Toko Shopee kamu dihubungkan ke
            Meta Business Manager lewat partnership Shopee–Meta. Seluruh
            katalog produk tersinkron otomatis.
          </li>
          <li>
            <strong>Pixel marketplace:</strong> Aktivitas pembeli di toko Shopee
            kamu (view produk, add to cart, purchase) terekam dan dikirim
            kembali ke Meta sebagai data konversi.
          </li>
          <li>
            <strong>Dynamic ads:</strong> Meta menampilkan produk yang paling
            relevan ke tiap orang — termasuk retargeting otomatis ke orang yang
            sudah lihat produk tapi belum checkout.
          </li>
          <li>
            <strong>Optimasi berbasis transaksi:</strong> Algoritma
            mengoptimalkan ke purchase, bukan klik. Budget mengalir ke audiens
            yang benar-benar membeli.
          </li>
        </ol>

        <h2>Kenapa ROAS CPAS Bisa Jauh Lebih Tinggi</h2>
        <ul>
          <li>
            <strong>Tidak ada kebocoran funnel:</strong> klik iklan langsung
            mendarat di halaman produk Shopee — tempat orang Indonesia memang
            terbiasa checkout. Tanpa perlu website, tanpa form.
          </li>
          <li>
            <strong>Retargeting presisi:</strong> orang yang lihat produk A
            akan melihat iklan produk A (plus produk serupa) — bukan iklan
            generik.
          </li>
          <li>
            <strong>Trust marketplace:</strong> rating toko, review, dan
            gratis ongkir Shopee ikut bekerja menutup penjualan.
          </li>
          <li>
            <strong>Data konversi penuh:</strong> algoritma belajar dari
            transaksi nyata, bukan proxy seperti klik atau landing page view.
          </li>
        </ul>

        <h2>Bukti di Lapangan: ROAS 20.8x</h2>
        <p>
          Di Mote Kreatif, kami mengelola CPAS untuk Hanoon Industries (brand
          apparel workwear). Hasilnya:{" "}
          <strong>ROAS 20.8x — naik 116.89%</strong> — dengan{" "}
          <strong>purchase value tumbuh 157%</strong>. Kuncinya bukan sekadar
          menyalakan CPAS, tapi: strukturisasi campaign prospecting vs
          retargeting, testing kreatif mingguan berbasis data, dan optimasi
          harian pada alokasi budget per ad set.
        </p>

        <h2>Syarat Menjalankan CPAS</h2>
        <ul>
          <li>Toko Shopee aktif (disarankan Shopee Mall atau Star Seller untuk hasil optimal)</li>
          <li>Akses Meta Business Manager + akun iklan</li>
          <li>Katalog produk rapi: foto jelas, judul terstruktur, harga kompetitif</li>
          <li>Persetujuan partnership CPAS dari Shopee (diajukan lewat Shopee/partner resmi)</li>
        </ul>

        <h2>Kesalahan Umum yang Membunuh ROAS CPAS</h2>
        <ul>
          <li>
            <strong>Langsung scale tanpa learning:</strong> budget besar di
            hari pertama = algoritma belum tahu siapa pembelimu.
          </li>
          <li>
            <strong>Hanya retargeting:</strong> ROAS-nya cantik tapi audiensnya
            cepat habis. Prospecting tetap wajib untuk pertumbuhan.
          </li>
          <li>
            <strong>Katalog berantakan:</strong> foto buram dan judul asal-asalan
            membuat dynamic ads tampil buruk — algoritma sebagus apa pun tidak
            bisa menolong.
          </li>
          <li>
            <strong>Tidak pernah testing kreatif:</strong> kreatif yang sama
            berbulan-bulan = ad fatigue = ROAS turun perlahan.
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
          CPAS adalah jembatan antara jangkauan Meta dan kebiasaan belanja
          orang Indonesia di marketplace. Untuk brand yang jualan di Shopee,
          ini biasanya format iklan dengan ROAS terbaik — asal dikelola dengan
          struktur campaign yang benar dan optimasi yang disiplin. Mau diskusi
          apakah CPAS cocok untuk brand kamu? Hubungi Mote Kreatif untuk
          review gratis.
        </p>
      </ArticleLayout>
    </>
  );
}
