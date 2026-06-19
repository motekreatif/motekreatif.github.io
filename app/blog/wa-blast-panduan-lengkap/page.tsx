import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find((p) => p.slug === "wa-blast-panduan-lengkap")!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Apakah WA blast aman dan tidak melanggar aturan WhatsApp?",
    answer:
      "Aman selama kamu mengirim ke kontak yang relevan, memberi jeda antar pesan (minimal 10 detik), dan tidak menyebar spam ke nomor acak. Yang membuat nomor diblokir bukan aktivitas blast-nya, tapi pola yang dianggap robotik: ratusan pesan identik tanpa jeda ke orang yang tidak mengenal kamu. Pakai tool yang menerapkan delay otomatis dan variasi pesan, dan blast hanya ke audiens yang memang sudah berinteraksi dengan bisnismu.",
  },
  {
    question: "Apakah WA blast gratis?",
    answer:
      "Ada banyak tool WA blast gratis, termasuk free tier Mote Blaster yang memberi 50 blast per hari tanpa biaya. Yang gratis biasanya cukup untuk UMKM dengan database kontak kecil. Begitu volume naik atau kamu butuh fitur lanjutan seperti AI auto-reply dan integrasi Google Sheets, barulah paket berbayar masuk akal.",
  },
  {
    question: "Berapa jumlah pesan WA blast yang aman per hari?",
    answer:
      "Untuk nomor pribadi/bisnis biasa, mulai konservatif: 50–100 pesan per hari untuk nomor baru, lalu naikkan bertahap (warming up). Nomor yang sudah lama aktif dan punya banyak chat dua arah bisa lebih tinggi. Kuncinya bukan angka pasti, tapi jeda antar pesan dan rasio balasan — selama orang membalas dan tidak banyak yang block, kamu aman.",
  },
  {
    question: "Apa bedanya WA blast dengan broadcast biasa di WhatsApp?",
    answer:
      "Broadcast list bawaan WhatsApp hanya mengirim ke kontak yang sudah menyimpan nomormu, maksimal 256 penerima, dan tanpa personalisasi atau penjadwalan. WA blast lewat tool bisa kirim ke nomor yang belum saling simpan, mempersonalisasi pesan (nama, dll), menjadwalkan, memberi delay otomatis, dan mencatat balasan otomatis ke database. Untuk bisnis, broadcast biasa cepat mentok; WA blast jauh lebih scalable.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(FAQ)} />
      <ArticleLayout post={post}>
        <h2>Jawaban Singkat</h2>
        <p>
          <strong>WA blast</strong> adalah cara mengirim satu pesan WhatsApp ke
          banyak nomor sekaligus lewat tool otomatis — bukan satu per satu manual,
          dan bukan broadcast list bawaan WhatsApp yang terbatas. Selama kamu
          memberi <strong>jeda otomatis antar pesan</strong>, mengirim ke kontak
          yang relevan, dan tidak nyepam nomor acak, WA blast aman dan tidak bikin
          nomor diblokir. Kamu bisa mulai gratis, kirim dari Google Sheets, dan
          naik ke fitur lanjutan saat bisnis tumbuh.
        </p>
        <p>
          Artikel ini panduan induk: tiap bagian dibahas ringkas, lalu kamu
          diarahkan ke artikel mendalam per topik. Kalau kamu cuma mau langsung
          praktik, coba{" "}
          <a
            href="https://blaster.motekreatif.com"
            target="_blank"
            rel="noopener"
          >
            Mote Blaster
          </a>{" "}
          — tool WA blast plus WA CRM yang sudah menerapkan semua aturan
          anti-blokir secara default.
        </p>

        <h2>1. Apa Itu WA Blast dan Bagaimana Cara Kerjanya</h2>
        <p>
          WhatsApp blast adalah aktivitas mengirim pesan yang sama (atau yang
          dipersonalisasi) ke banyak penerima dalam satu kali eksekusi. Bedanya
          dengan ketik manual: kamu cukup siapkan daftar kontak dan satu template
          pesan, lalu tool yang menjalankan pengiriman satu per satu di belakang
          layar.
        </p>
        <p>Tiga komponen inti yang membuat WA blast bekerja:</p>
        <ul>
          <li>
            <strong>Import kontak:</strong> daftar nomor masuk lewat CSV, Google
            Sheets, atau database kontak yang sudah tersimpan. Format nomor harus
            rapi (pakai kode negara, mis. 62 untuk Indonesia).
          </li>
          <li>
            <strong>Template pesan:</strong> satu pesan dengan variabel seperti{" "}
            <strong>nama</strong> yang otomatis terisi per penerima, supaya tidak
            terasa seperti pesan massal.
          </li>
          <li>
            <strong>Jeda otomatis (delay):</strong> tool menyisipkan jeda di
            antara tiap pengiriman — misalnya 10 detik — agar polanya menyerupai
            manusia, bukan robot. Inilah faktor terbesar yang menentukan aman atau
            tidaknya.
          </li>
        </ul>
        <p>
          Yang dianggap berbahaya oleh WhatsApp bukan jumlah pesannya, tapi{" "}
          <strong>polanya</strong>: pengiriman terlalu cepat, pesan identik tanpa
          variasi, dan target yang sama sekali tidak mengenal pengirim. Tool yang
          baik mengatur ketiganya secara otomatis.
        </p>

        <h2>2. Cara Aman dari Blokir</h2>
        <p>
          Ketakutan nomor satu pelaku WA blast adalah nomor diblokir. Kabar
          baiknya, blokir hampir selalu bisa dihindari dengan disiplin pada tiga
          hal: <strong>jeda antar pesan</strong>, <strong>kualitas audiens</strong>
          (kirim ke orang yang relevan, bukan list beli-an), dan{" "}
          <strong>warming up</strong> nomor baru secara bertahap. Tambahkan variasi
          pada isi pesan dan jangan kirim link yang sama ke ratusan orang dalam
          waktu singkat.
        </p>
        <p>
          Banyak detail teknisnya — berapa pesan per jam, cara warming up, apa yang
          memicu shadow-ban — yang tidak muat di sini. Baca panduan khususnya:{" "}
          <Link href="/blog/cara-blast-wa-tanpa-diblokir">
            Cara blast WA tanpa diblokir
          </Link>
          .
        </p>

        <h2>3. Blast Langsung dari Google Sheets</h2>
        <p>
          Kalau database kontakmu sudah ada di Google Sheets — misal hasil form,
          data pembeli, atau leads dari iklan — kamu tidak perlu export-import
          manual tiap kali. Banyak tool (termasuk Mote Blaster) bisa menarik kontak
          langsung dari Sheets, jadi setiap baris baris baru otomatis siap diblast,
          lengkap dengan kolom personalisasi (nama, kota, status order).
        </p>
        <p>
          Alur ini paling cocok untuk bisnis yang datanya hidup dan terus
          bertambah. Langkah setup lengkapnya — dari struktur kolom sampai
          menghubungkan Sheets ke tool — ada di:{" "}
          <Link href="/blog/wa-blast-google-sheets">
            cara WA blast dari Google Sheets
          </Link>
          .
        </p>

        <h2>4. Gratis vs Berbayar: Memilih Aplikasi WA Blast</h2>
        <p>
          Tidak semua bisnis butuh tool mahal. Untuk UMKM dengan database kecil,{" "}
          <strong>tool gratis sudah cukup</strong> — bahkan free tier Mote Blaster
          memberi 50 blast per hari tanpa biaya. Yang perlu diperhatikan saat
          memilih: apakah ada delay otomatis (penting untuk anti-blokir), apakah
          bisa import CSV/Sheets, apakah balasan tercatat, dan apakah ada jalur
          upgrade saat volume naik.
        </p>
        <p>
          Tool berbayar biasanya dibutuhkan saat kamu mengirim ribuan pesan,
          butuh AI auto-reply, multi-nomor, atau pelaporan. Perbandingan tool
          gratis terbaik dan kapan harus upgrade dibahas di:{" "}
          <Link href="/blog/aplikasi-wa-blast-gratis">
            aplikasi WA blast gratis terbaik
          </Link>
          .
        </p>

        <h2>5. WA Blast vs WhatsApp API</h2>
        <p>
          Ini dua hal yang sering tertukar. <strong>WA blast</strong> (lewat tool
          berbasis WhatsApp biasa) cepat dipasang, murah, cocok untuk UMKM, tapi
          tunduk pada batas wajar agar tidak diblokir.{" "}
          <strong>WhatsApp Business API</strong> resmi, terverifikasi (centang
          hijau), bisa volume sangat tinggi, tapi berbiaya per pesan, butuh
          template yang disetujui Meta, dan setup-nya lebih rumit.
        </p>
        <p>
          Pilihan yang tepat tergantung skala dan budget. Perbandingan lengkap —
          biaya, kecepatan setup, batasan, dan untuk siapa masing-masing cocok —
          ada di:{" "}
          <Link href="/blog/wa-blast-vs-whatsapp-api">
            WA blast vs WhatsApp API
          </Link>
          .
        </p>

        <h2>WA Blast yang Sehat: Bukan Cuma Kirim, Tapi Juga Catat</h2>
        <p>
          Kesalahan umum: orang berhenti di &quot;kirim pesan massal&quot; dan lupa
          bagian terpenting — <strong>menindaklanjuti yang membalas</strong>. Blast
          yang menghasilkan penjualan adalah blast yang balasannya tercatat rapi dan
          ditindaklanjuti cepat. Di sinilah WA CRM masuk: setiap chat masuk dicatat
          otomatis ke Google Sheets, kontak tersimpan ke database, dan (di paket
          Pro) AI Agent bisa membalas 24/7 supaya tidak ada leads yang dingin
          karena telat dibalas. Kalau kamu mau setup lengkap blast + CRM dalam satu
          tempat,{" "}
          <a
            href="https://blaster.motekreatif.com"
            target="_blank"
            rel="noopener"
          >
            coba Mote Blaster gratis
          </a>
          .
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
          WA blast bukan trik nakal — ini cara legit menjangkau pelanggan secara
          massal, selama kamu disiplin pada jeda otomatis, kualitas audiens, dan
          tindak lanjut balasan. Mulai dari yang gratis, kirim dari Google Sheets
          biar tidak ribet, pahami batas aman per hari, dan upgrade ke WhatsApp API
          hanya kalau skalamu memang sudah menuntutnya. Empat artikel cluster di
          atas akan menemanimu di tiap langkah.
        </p>
        <p>
          Kalau kamu mau langsung jalan tanpa pusing setting anti-blokir manual,{" "}
          <a
            href="https://blaster.motekreatif.com"
            target="_blank"
            rel="noopener"
          >
            coba Mote Blaster gratis
          </a>{" "}
          — blast massal dengan delay otomatis 10 detik, chat masuk otomatis
          tercatat ke Google Sheets, database kontak otomatis, import CSV/Sheets,
          dan AI Agent balas chat 24/7 di paket Pro. Free tier 50 blast per hari,
          cukup untuk mulai hari ini.
        </p>
      </ArticleLayout>
    </>
  );
}
