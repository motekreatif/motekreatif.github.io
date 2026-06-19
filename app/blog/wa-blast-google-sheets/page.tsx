import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find((p) => p.slug === "wa-blast-google-sheets")!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Perlu coding atau Apps Script gak buat WA blast dari Google Sheets?",
    answer:
      "Tidak perlu. Kalau pakai tool blast yang sudah mendukung import dari Google Sheets atau CSV, kamu cukup menata kolom data di spreadsheet, lalu unggah atau hubungkan ke tool. Apps Script baru relevan kalau kamu mau membangun sistem sendiri dari nol — buat kebanyakan UMKM, cara import + template variabel sudah cukup tanpa satu baris kode pun.",
  },
  {
    question: "Format nomor di Google Sheets harus seperti apa?",
    answer:
      "Gunakan format internasional tanpa tanda plus, yaitu diawali 62, contohnya 6281234567890. Hindari menyimpan nomor sebagai angka murni karena nol di depan (08...) bisa hilang otomatis di spreadsheet. Cara aman: set kolom phone sebagai teks (Plain text), lalu konsisten pakai awalan 62. Tool blast yang baik biasanya menormalkan 08 ke 62 saat import, tapi merapikan dari awal mengurangi kontak gagal kirim.",
  },
  {
    question: "Bisa personalisasi pakai nama pelanggan dari kolom Sheets?",
    answer:
      "Bisa. Buat kolom name (dan kolom lain seperti kota atau produk) di spreadsheet, lalu di template pesan tinggal sisipkan variabel seperti {{name}}. Saat blast dikirim, variabel diganti otomatis dengan isi kolom per baris. Pesan jadi terasa personal satu per satu, dan ini juga menurunkan risiko terbaca sebagai spam massal.",
  },
  {
    question: "Balasan chat dari pelanggan bisa otomatis masuk ke Google Sheets?",
    answer:
      "Bisa, lewat fitur chat recording. Setiap chat masuk dari pelanggan dicatat otomatis kembali ke Google Sheets — siapa yang membalas, isi pesan, dan waktunya. Hasilnya database kontak dan riwayat percakapan yang hidup, jadi follow-up berikutnya tidak mulai dari nol.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Kenapa WA Blast Lewat Google Sheets Itu Pilihan Pintar</h2>
        <p>
          Kalau data pelanggan kamu sudah rapi di spreadsheet, melakukan WA blast
          langsung dari Google Sheets adalah cara paling efisien — tanpa
          copy-paste nomor satu per satu yang rawan salah dan makan waktu. Pola
          kerjanya sederhana: data terpusat di satu tempat, tim bisa kolaborasi
          mengisi dan memperbarui kontak, lalu kapan pun mau kirim pesan tinggal
          tarik dari Sheets yang sama.
        </p>
        <p>
          Ada tiga alasan utama kenapa <strong>wa blast dari spreadsheet</strong>{" "}
          jauh lebih nyaman dibanding mengetik manual di aplikasi WhatsApp:
        </p>
        <ul>
          <li>
            <strong>Data terpusat.</strong> Semua nomor, nama, dan catatan ada
            di satu sheet — bukan tersebar di chat, kontak HP, dan catatan kertas.
          </li>
          <li>
            <strong>Kolaborasi tim.</strong> Beberapa orang bisa mengisi dan
            mengoreksi data bersamaan, lengkap dengan riwayat perubahan.
          </li>
          <li>
            <strong>Gampang di-update.</strong> Tambah kontak baru, perbaiki
            nomor salah, atau pisahkan segmen pelanggan cukup dengan mengetik di
            kolom — tidak perlu impor ulang dari nol setiap kali.
          </li>
        </ul>
        <p>
          Intinya, spreadsheet berperan sebagai sumber kebenaran (single source
          of truth) untuk database kontak kamu. Tool blast tinggal membacanya.
          Buat gambaran besar soal cara kerja kampanye pesan massal, kamu bisa
          baca dulu{" "}
          <Link href="/blog/wa-blast-panduan-lengkap">
            panduan lengkap WA blast
          </Link>{" "}
          sebagai fondasi sebelum masuk ke teknis Google Sheets.
        </p>

        <h2>Langkah 1: Siapkan Struktur Sheet yang Benar</h2>
        <p>
          Sebelum data bisa dipakai blast, sheet kamu harus punya struktur kolom
          yang jelas. Aturannya: satu baris = satu pelanggan, dan setiap kolom
          mewakili satu informasi. Minimal kamu butuh kolom-kolom berikut:
        </p>
        <ul>
          <li>
            <strong>phone</strong> — nomor WhatsApp tujuan. Ini kolom wajib.
            Pakai format 62, misalnya <strong>6281234567890</strong>.
          </li>
          <li>
            <strong>name</strong> — nama pelanggan, dipakai untuk personalisasi
            sapaan di pesan.
          </li>
          <li>
            <strong>Kolom variabel lain</strong> (opsional) — misalnya{" "}
            <strong>kota</strong>, <strong>produk</strong>, atau{" "}
            <strong>kode_voucher</strong>, supaya tiap pesan bisa lebih relevan
            per pelanggan.
          </li>
        </ul>
        <p>
          Sebagai contoh, baris pertama (header) berisi:{" "}
          <strong>phone | name | kota | produk</strong>. Lalu baris di bawahnya:{" "}
          <strong>6281234567890 | Rina | Bandung | Skincare Set</strong>. Dengan
          struktur seperti ini, kamu bisa membuat pesan yang seolah ditulis satu
          per satu, padahal dikirim massal.
        </p>

        <h3>Tip merapikan nomor sejak di Sheets</h3>
        <p>
          Masalah paling sering di <strong>blast wa pakai excel</strong> atau
          Google Sheets adalah format nomor berantakan: ada yang 08, ada yang
          +62, ada yang nyangkut spasi. Rapikan dari awal supaya kontak tidak
          gagal kirim:
        </p>
        <ul>
          <li>
            Set kolom phone sebagai <strong>teks (Plain text)</strong> lewat menu
            Format → Number → Plain text, supaya angka nol di depan tidak hilang.
          </li>
          <li>
            Samakan semua nomor ke awalan <strong>62</strong> — ganti 08 jadi 62,
            buang tanda plus dan spasi.
          </li>
          <li>
            Hindari duplikat: gunakan Data → Data cleanup → Remove duplicates,
            atau sorot kolom phone untuk menyaring nomor kembar sebelum blast.
          </li>
        </ul>

        <h2>Langkah 2: Import Kontak ke Tool Blast</h2>
        <p>
          Setelah sheet rapi, langkah berikutnya memasukkan data itu ke tool
          blast. Ada dua cara umum, tergantung tool yang kamu pakai:
        </p>
        <ol>
          <li>
            <strong>Export ke CSV lalu upload.</strong> Di Google Sheets pilih
            File → Download → Comma-separated values (.csv), lalu unggah file itu
            ke tool blast. Cara ini paling universal dan didukung hampir semua
            tool.
          </li>
          <li>
            <strong>Connect langsung ke Google Sheets.</strong> Sebagian tool bisa
            membaca spreadsheet secara langsung, jadi setiap kali kamu menambah
            kontak di Sheets, data di tool ikut ter-update tanpa export ulang.
          </li>
        </ol>
        <p>
          Saat import, biasanya kamu diminta memetakan kolom: kolom mana yang
          berisi nomor (phone), kolom mana yang nama (name), dan seterusnya.
          Pastikan pemetaan ini benar supaya variabel personalisasi tertaut ke
          kolom yang tepat.
        </p>

        <h3>Pakai variabel {"{{name}}"} di template pesan</h3>
        <p>
          Di sinilah personalisasi bekerja. Pada template pesan, kamu menulis
          teks sekali dengan menyisipkan variabel yang merujuk ke nama kolom.
          Contoh template:
        </p>
        <p>
          <strong>
            &quot;Halo {"{{name}}"}, ada promo {"{{produk}}"} khusus pelanggan{" "}
            {"{{kota}}"} minggu ini. Mau aku kirim detailnya?&quot;
          </strong>
        </p>
        <p>
          Saat blast dikirim, <strong>{"{{name}}"}</strong> otomatis diganti{" "}
          &quot;Rina&quot;, <strong>{"{{produk}}"}</strong> jadi &quot;Skincare
          Set&quot;, dan seterusnya sesuai isi baris masing-masing pelanggan.
          Satu template, ratusan pesan personal. Untuk menjaga akun aman dari
          pemblokiran saat mengirim massal, baca juga{" "}
          <Link href="/blog/cara-blast-wa-tanpa-diblokir">
            cara blast tanpa diblokir
          </Link>{" "}
          — personalisasi seperti ini termasuk salah satu kuncinya.
        </p>

        <h2>Langkah 3: Catat Balasan Otomatis Kembali ke Google Sheets</h2>
        <p>
          Ini bagian yang sering terlewat, padahal paling bernilai. Blast bukan
          hanya soal mengirim — yang penting adalah <strong>menangkap respons</strong>.
          Dengan fitur <strong>chat recording</strong>, setiap balasan dan chat
          masuk dari pelanggan dicatat otomatis kembali ke Google Sheets:
        </p>
        <ul>
          <li>Nomor dan nama pengirim balasan.</li>
          <li>Isi pesan yang mereka kirim.</li>
          <li>Waktu balasan masuk.</li>
        </ul>
        <p>
          Hasilnya integrasi dua arah yang lengkap: kontak mengalir{" "}
          <strong>dari Sheets ke blast</strong>, dan respons mengalir{" "}
          <strong>dari chat balik ke Sheets</strong>. Spreadsheet kamu berubah
          dari sekadar daftar nomor menjadi database hidup berisi riwayat
          percakapan — siapa yang tertarik, siapa yang minta detail, siapa yang
          perlu di-follow up. Dari sini kamu bisa segmentasi pelanggan untuk
          blast berikutnya jadi jauh lebih tajam.
        </p>

        <h2>Tips Praktis Sebelum Klik Kirim</h2>
        <ul>
          <li>
            <strong>Cek format nomor lagi.</strong> Pastikan semua sudah 62,
            tidak ada yang masih 08 atau tertinggal spasi.
          </li>
          <li>
            <strong>Bersihkan duplikat.</strong> Nomor kembar berarti pelanggan
            menerima pesan dua kali — terlihat tidak profesional dan menaikkan
            risiko diblokir.
          </li>
          <li>
            <strong>Tes ke nomor sendiri dulu.</strong> Kirim ke satu nomor
            internal untuk memastikan variabel {"{{name}}"} terganti dengan benar
            sebelum dikirim ke seluruh daftar.
          </li>
          <li>
            <strong>Kirim bertahap.</strong> Untuk daftar besar, pecah pengiriman
            dan beri jeda alami supaya akun tetap aman.
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
          WA blast dari Google Sheets menghapus pekerjaan copy-paste manual:
          tata kolom <strong>phone</strong> dan <strong>name</strong>, rapikan
          format nomor, import ke tool, lalu personalisasi pesan dengan variabel{" "}
          {"{{name}}"}. Tutup loop-nya dengan chat recording supaya balasan
          tercatat otomatis balik ke spreadsheet dan jadi database kontak yang
          terus tumbuh. Mau langsung praktik? Coba{" "}
          <a
            href="https://blaster.motekreatif.com"
            target="_blank"
            rel="noopener"
          >
            Mote Blaster
          </a>{" "}
          — bisa import kontak dari CSV &amp; Google Sheets, catat chat masuk
          otomatis ke Google Sheets, personalisasi variabel, dan gratis 50 blast
          per hari untuk mulai.
        </p>
      </ArticleLayout>
    </>
  );
}
