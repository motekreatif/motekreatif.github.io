import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find((p) => p.slug === "strategi-tiktok-shop-umkm")!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Berapa modal minimal untuk mulai jualan di TikTok Shop?",
    answer:
      "Pendaftaran toko gratis. Modal nyata ada di konten (bisa mulai dari HP) dan stok. Untuk ads, mulai realistis dari Rp 50–100 ribu/hari saat organik sudah menunjukkan produk mana yang direspons pasar.",
  },
  {
    question: "Lebih baik fokus TikTok Shop atau Shopee?",
    answer:
      "Keduanya berbeda peran: Shopee menangkap orang yang sudah niat belanja (search-driven), TikTok Shop menciptakan permintaan lewat konten (discovery-driven). Produk impulse-buy dengan visual kuat biasanya menang di TikTok Shop; produk kebutuhan rutin menang di Shopee. Idealnya keduanya, dengan konten sebagai mesin TikTok.",
  },
  {
    question: "Apakah harus live setiap hari?",
    answer:
      "Tidak harus setiap hari, tapi konsistensi mengalahkan durasi. Mulai dari 3–4 sesi/minggu di jam yang sama (misal 19.00–21.00) agar algoritma dan audiens mengenali pola. Satu sesi live yang dipersiapkan baik > tujuh sesi asal-asalan.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          Strategi TikTok Shop untuk UMKM 2026 berdiri di atas 4 pilar:{" "}
          <strong>(1) toko & listing yang rapi</strong>,{" "}
          <strong>(2) konten short video yang menjual tanpa terasa jualan</strong>,{" "}
          <strong>(3) leverage affiliate & live commerce</strong>, dan{" "}
          <strong>(4) TikTok Shop Ads untuk scale produk yang sudah terbukti</strong>.
          Urutannya penting: konten dulu sampai ada produk yang terbukti
          direspons, baru bakar budget iklan.
        </p>

        <h2>Kenapa TikTok Shop Penting untuk UMKM</h2>
        <p>
          TikTok Shop berbeda fundamental dari marketplace lain: orang datang
          bukan untuk belanja, tapi untuk hiburan — lalu membeli karena
          tertarik. Artinya UMKM dengan produk bagus dan cerita menarik bisa
          menang melawan brand besar tanpa perang harga, karena yang dijual
          duluan adalah <strong>konten</strong>, bukan listing.
        </p>

        <h2>Pilar 1: Setup Toko yang Benar</h2>
        <ul>
          <li>
            <strong>Listing lengkap:</strong> foto utama jelas, judul
            mengandung kata kunci yang dicari orang, deskripsi menjawab
            keraguan pembeli (ukuran, bahan, garansi).
          </li>
          <li>
            <strong>Harga &amp; voucher:</strong> aktifkan voucher toko —
            algoritma TikTok mendorong produk yang punya insentif checkout.
          </li>
          <li>
            <strong>Respons chat cepat:</strong> rating toko mempengaruhi
            distribusi konten kamu.
          </li>
          <li>
            <strong>Hubungkan akun konten dengan toko</strong> agar setiap
            video bisa di-tag keranjang kuning.
          </li>
        </ul>

        <h2>Pilar 2: Konten yang Menjual (Tanpa Terasa Jualan)</h2>
        <p>
          Formula yang konsisten bekerja untuk UMKM:
        </p>
        <ol>
          <li>
            <strong>Hook 1–3 detik pertama</strong> — masalah, pertanyaan, atau
            visual yang bikin berhenti scroll.
          </li>
          <li>
            <strong>Demonstrasi jujur</strong> — produk dipakai, bukan
            difoto-foto saja. Tunjukkan tekstur, ukuran, cara pakai.
          </li>
          <li>
            <strong>Social proof</strong> — review pembeli, reaksi orang,
            angka penjualan.
          </li>
          <li>
            <strong>CTA halus</strong> — &ldquo;cek keranjang kuning&rdquo;
            cukup; hard-selling justru menurunkan distribusi.
          </li>
        </ol>
        <blockquote>
          Volume penting di fase awal: 1–2 video/hari selama 2–4 minggu untuk
          menemukan format yang bekerja. Setelah ada pola menang, fokus
          replikasi format itu.
        </blockquote>

        <h2>Pilar 3: Affiliate &amp; Live Commerce</h2>
        <ul>
          <li>
            <strong>Buka program affiliate</strong> dengan komisi menarik
            (10–20% untuk fase awal). Ribuan kreator kecil mempromosikan
            produkmu = pasukan konten gratis, bayar hanya saat terjual.
          </li>
          <li>
            <strong>Live commerce:</strong> mulai 3–4 sesi/minggu di jam
            konsisten. Struktur sesi: demo produk → jawab pertanyaan → flash
            promo per 15–20 menit untuk menahan penonton.
          </li>
          <li>
            <strong>Sampel ke kreator mikro</strong> (1–10k follower, niche
            relevan) — konversi mereka sering lebih tinggi dari KOL besar,
            biaya jauh lebih kecil.
          </li>
        </ul>

        <h2>Pilar 4: TikTok Shop Ads — Scale yang Sudah Terbukti</h2>
        <p>
          Kesalahan UMKM paling umum: pasang iklan untuk produk yang belum
          terbukti. Urutan yang benar:
        </p>
        <ol>
          <li>Organik dulu — temukan produk &amp; konten yang direspons (2–4 minggu)</li>
          <li>
            <strong>Spark Ads / boost konten organik yang sudah menang</strong> —
            bukan bikin iklan baru dari nol
          </li>
          <li>Product Shopping Ads untuk produk dengan konversi terbaik</li>
          <li>Scale budget bertahap 20–30% per beberapa hari, jangan loncat 5x</li>
        </ol>
        <p>
          Ukur dengan ROAS di TikTok Seller Center. Sehat untuk UMKM umumnya
          mulai dari 3–5x; di bawah 2x, benahi dulu konten atau harga sebelum
          menambah budget.
        </p>

        <h2>Kesalahan yang Paling Sering Membunuh Toko Baru</h2>
        <ul>
          <li>Upload konten promosi melulu — akun dianggap iklan berjalan, distribusi mati</li>
          <li>Ganti-ganti niche/produk tiap minggu — algoritma tidak sempat mengenali toko kamu</li>
          <li>Ikut perang harga sampai margin habis — di TikTok, cerita menang melawan diskon</li>
          <li>Tidak balas komentar &amp; chat — sinyal engagement turun, distribusi ikut turun</li>
        </ul>
        <p>
          Satu hal yang sering terlewat: pembeli pertama jauh lebih murah
          dipertahankan daripada dicari ulang. Setelah transaksi, kabari mereka
          soal restock, promo, atau produk baru lewat{" "}
          <Link href="/blog/wa-blast-panduan-lengkap">
            panduan WA blast untuk follow-up pelanggan
          </Link>{" "}
          agar repeat order tetap jalan tanpa bergantung pada algoritma.
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
          TikTok Shop adalah peluang paling terbuka untuk UMKM saat ini —
          tapi menang di sana butuh disiplin konten, bukan sekadar buka toko.
          Mulai dari listing rapi, konsisten produksi konten 2–4 minggu,
          aktifkan affiliate, lalu scale dengan ads hanya untuk yang sudah
          terbukti. Butuh partner untuk setup dan eksekusi? Mote Kreatif
          mengelola TikTok Shop dan marketplace optimization untuk brand
          lokal — mulai dari diskusi gratis.
        </p>
      </ArticleLayout>
    </>
  );
}
