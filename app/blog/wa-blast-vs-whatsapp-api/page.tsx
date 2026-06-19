import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find((p) => p.slug === "wa-blast-vs-whatsapp-api")!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Mana yang lebih murah, WA blast aplikasi atau WhatsApp Business API?",
    answer:
      "Untuk mayoritas UMKM, WA blast aplikasi jauh lebih murah. Kamu cukup bayar langganan bulanan tetap dan pakai nomor WhatsApp biasa, tanpa biaya per pesan. WhatsApp Business API menagih per percakapan lewat penyedia resmi (BSP), plus biaya verifikasi dan kadang langganan platform — tarifnya berubah-ubah, jadi cek langsung ke BSP. Kalau volume kamu masih ratusan sampai ribuan pesan per hari, aplikasi hampir selalu lebih hemat.",
  },
  {
    question: "Apakah WhatsApp Business API wajib untuk bisnis?",
    answer:
      "Tidak wajib. API resmi cocok kalau kamu butuh skala sangat besar, centang hijau resmi, integrasi sistem (CRM, e-commerce), atau banyak agen menjawab dari satu nomor. Untuk UMKM kecil-menengah yang mengirim promo, follow-up, dan broadcast ke pelanggan sendiri, WA blast aplikasi sudah lebih dari cukup dan jauh lebih cepat dipakai.",
  },
  {
    question: "Apakah WA blast lewat aplikasi aman dan legal?",
    answer:
      "Mengirim pesan ke pelanggan yang memang kontak kamu dan ke orang yang setuju dihubungi adalah hal yang wajar dan legal. Yang berisiko adalah pola pengiriman yang dianggap spam oleh WhatsApp: kirim massal terlalu cepat ke nomor asing, pesan identik tanpa jeda, atau banyak laporan blokir dari penerima. Gunakan aplikasi dengan delay otomatis, kirim ke kontak relevan, dan hormati yang minta berhenti — risiko blokir turun drastis.",
  },
  {
    question: "Bisakah pindah dari WA blast aplikasi ke API nanti?",
    answer:
      "Bisa, dan justru itu jalur yang disarankan. Mulai dengan aplikasi untuk memvalidasi bahwa WhatsApp marketing cocok untuk bisnis kamu. Saat volume dan kebutuhan integrasi membesar, baru pindah ke API resmi lewat BSP. Database kontak dan template pesan yang sudah kamu bangun tetap bisa dipakai ulang.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          Kalau kamu <strong>UMKM kecil-menengah atau baru mulai</strong>, pilih{" "}
          <strong>WA blast lewat aplikasi</strong>: setup cepat (hitungan menit),
          biaya murah, pakai nomor WhatsApp biasa, dan cukup untuk mengirim
          promo serta follow-up ke pelanggan kamu. Kalau kamu{" "}
          <strong>enterprise, butuh volume sangat besar, centang hijau resmi,
          atau integrasi sistem</strong>, baru masuk akal naik ke{" "}
          <strong>WhatsApp Business API</strong> — resmi dari Meta, skala besar,
          tapi lebih mahal, butuh approval template, dan lebih lambat disiapkan.
        </p>
        <p>
          Keduanya valid. Yang salah cuma satu: memaksakan solusi enterprise
          untuk warung yang baru jalan, atau sebaliknya, memaksakan aplikasi
          manual saat kamu sudah kirim puluhan ribu pesan transaksional per
          hari.
        </p>

        <h2>Definisi Singkat: Beda Keduanya</h2>
        <h3>WA blast lewat aplikasi</h3>
        <p>
          Software (web atau desktop) yang terhubung ke akun WhatsApp biasa kamu
          — sama seperti WhatsApp Web. Kamu impor daftar kontak, susun pesan,
          lalu aplikasi mengirim satu per satu dengan jeda otomatis. Tidak ada
          campur tangan Meta secara langsung, jadi setup-nya secepat scan QR.
        </p>
        <h3>WhatsApp Business API resmi</h3>
        <p>
          Jalur resmi dari Meta untuk bisnis berskala besar. Tidak ada
          &ldquo;aplikasi&rdquo; yang kamu buka — API ini diakses lewat penyedia
          resmi yang disebut <strong>BSP (Business Solution Provider)</strong>.
          Kamu harus verifikasi bisnis (Meta Business Manager), daftarkan nomor,
          dan setiap template pesan promosi harus lewat proses approval Meta.
          Sebagai gantinya kamu dapat status resmi, kapasitas besar, dan
          kemungkinan centang hijau.
        </p>

        <h2>Perbandingan Per Dimensi</h2>

        <h3>Biaya</h3>
        <ul>
          <li>
            <strong>Aplikasi:</strong> biaya langganan tetap per bulan, tanpa
            biaya per pesan. Predictable dan murah untuk volume kecil-menengah.
          </li>
          <li>
            <strong>API:</strong> bayar <strong>per percakapan</strong> ke Meta
            (via BSP), kadang plus biaya platform/langganan BSP dan biaya
            verifikasi. Tarif berubah-ubah dan beda tiap BSP — cek langsung ke
            penyedianya. Bisa membengkak kalau volume besar, tapi tetap masuk
            akal di skala enterprise.
          </li>
        </ul>

        <h3>Kecepatan Setup</h3>
        <ul>
          <li>
            <strong>Aplikasi:</strong> scan QR, impor kontak, kirim. Hitungan
            menit sampai jam. Bisa langsung dipakai hari ini juga.
          </li>
          <li>
            <strong>API:</strong> butuh verifikasi bisnis, pilih BSP, daftarkan
            nomor, dan tunggu approval template. Bisa makan hari sampai minggu,
            tergantung kelengkapan dokumen bisnis kamu.
          </li>
        </ul>

        <h3>Risiko Blokir</h3>
        <ul>
          <li>
            <strong>Aplikasi:</strong> karena memakai nomor WhatsApp biasa, ada
            risiko blokir kalau kamu kirim seperti spammer (massal, cepat, ke
            nomor asing). Risiko ini bisa ditekan drastis dengan disiplin: delay
            otomatis, pesan dipersonalisasi, kirim ke kontak yang relevan. Baca{" "}
            <Link href="/blog/cara-blast-wa-tanpa-diblokir">
              cara blast WA tanpa diblokir
            </Link>{" "}
            untuk teknik lengkapnya.
          </li>
          <li>
            <strong>API:</strong> lebih tahan blokir karena resmi, tapi tetap
            ada <strong>quality rating</strong> dari Meta. Kalau banyak penerima
            menandai pesan kamu sebagai spam atau memblokir, rating nomor turun
            dan limit pengiriman kamu ikut dipangkas.
          </li>
        </ul>

        <h3>Batas Pesan & Volume</h3>
        <ul>
          <li>
            <strong>Aplikasi:</strong> ada batas wajar per hari per nomor (demi
            keamanan akun). Solusinya: pakai beberapa nomor untuk menaikkan
            kapasitas total. Cocok untuk ratusan sampai ribuan pesan per hari.
          </li>
          <li>
            <strong>API:</strong> tier pengiriman berjenjang dan bisa naik
            sampai puluhan ribu hingga tak terbatas per hari seiring quality
            rating kamu membaik. Inilah keunggulan utama API untuk skala besar.
          </li>
        </ul>

        <h3>Personalisasi</h3>
        <ul>
          <li>
            <strong>Aplikasi:</strong> mudah menyisipkan variabel seperti nama
            atau kode pesanan langsung saat menyusun broadcast — fleksibel dan
            tanpa approval.
          </li>
          <li>
            <strong>API:</strong> pesan promosi harus pakai{" "}
            <strong>template yang sudah disetujui Meta</strong>. Variabel tetap
            bisa diisi, tapi struktur dan isi template terbatas pada yang sudah
            di-approve. Lebih kaku, tapi lebih konsisten dan resmi.
          </li>
        </ul>

        <h3>Centang Hijau & Branding</h3>
        <ul>
          <li>
            <strong>Aplikasi:</strong> tampil sebagai nomor biasa (atau
            WhatsApp Business profile), tanpa centang hijau resmi.
          </li>
          <li>
            <strong>API:</strong> berpeluang dapat{" "}
            <strong>centang hijau (Official Business Account)</strong> yang
            menambah kredibilitas dan kepercayaan pelanggan. Untuk brand besar,
            ini nilai jual tersendiri.
          </li>
        </ul>

        <h3>Kapan Masing-Masing Masuk Akal</h3>
        <p>
          Singkatnya: aplikasi unggul di <strong>kecepatan, biaya, dan
          fleksibilitas</strong>; API unggul di <strong>skala, status resmi, dan
          integrasi sistem</strong>. Pilih berdasarkan di mana bisnis kamu
          berada sekarang, bukan di mana kamu ingin terlihat.
        </p>

        <h2>Rekomendasi Berdasarkan Skala</h2>
        <ol>
          <li>
            <strong>Baru mulai / UMKM kecil-menengah →</strong> WA blast lewat
            aplikasi. Setup cepat, biaya ringan, cukup untuk promo dan follow-up
            ke pelanggan kamu. Validasi dulu apakah WhatsApp marketing memang
            menghasilkan, baru pikirkan upgrade.
          </li>
          <li>
            <strong>Bisnis menengah yang mulai serius →</strong> tetap aplikasi,
            tapi tambah beberapa nomor dan rapikan database kontak serta
            template pesan. Kebanyakan bisnis di tahap ini belum butuh API.
          </li>
          <li>
            <strong>Enterprise / volume sangat besar / butuh resmi →</strong>{" "}
            WhatsApp Business API lewat BSP. Saat kamu kirim puluhan ribu pesan
            transaksional per hari, butuh centang hijau, atau harus integrasi
            dengan CRM dan e-commerce, biaya dan kerumitan API jadi sepadan.
          </li>
        </ol>
        <p>
          Belum yakin WA blast itu apa dan bagaimana cara kerjanya dari awal?
          Baca dulu{" "}
          <Link href="/blog/wa-blast-panduan-lengkap">
            panduan lengkap WA blast
          </Link>{" "}
          sebelum memutuskan jalur mana yang kamu ambil.
        </p>

        <h2>Jalur Praktis untuk UMKM</h2>
        <p>
          Kalau kamu memilih jalur aplikasi,{" "}
          <a
            href="https://blaster.motekreatif.com"
            target="_blank"
            rel="noopener"
          >
            Mote Blaster
          </a>{" "}
          dirancang persis untuk kebutuhan UMKM: setup cepat tanpa ribet
          verifikasi, <strong>delay otomatis anti-blokir</strong> supaya nomor
          kamu lebih aman, dan paket <strong>gratis 50 blast per hari</strong>{" "}
          untuk mulai. Saat butuh lebih, paket <strong>Pro Rp99rb/bulan</strong>{" "}
          memberi sampai 5 nomor dan AI Agent 24/7 untuk membantu membalas
          pelanggan otomatis. Ini cara tercepat memvalidasi WhatsApp marketing
          sebelum kamu (kalau memang perlu) naik ke API.
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
          WA blast aplikasi dan WhatsApp Business API bukan soal mana yang
          &ldquo;lebih bagus&rdquo;, tapi mana yang cocok dengan skala kamu
          sekarang. Mayoritas UMKM justru paling diuntungkan dengan memulai dari
          aplikasi: murah, cepat, dan cukup untuk membuktikan bahwa WhatsApp
          marketing menghasilkan penjualan. Kalau itu kamu, coba langsung{" "}
          <a
            href="https://blaster.motekreatif.com"
            target="_blank"
            rel="noopener"
          >
            Mote Blaster
          </a>{" "}
          dengan paket gratis 50 blast per hari, dan upgrade hanya saat
          bisnismu benar-benar menuntut skala API.
        </p>
      </ArticleLayout>
    </>
  );
}
