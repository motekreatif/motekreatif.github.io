import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { BLOG_POSTS } from "@/lib/blog";

const post = BLOG_POSTS.find(
  (p) => p.slug === "photography-storytelling-konten-fnb"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

export default function Page() {
  return (
    <ArticleLayout post={post}>
      <h2>Hook yang Membuat Orang Berhenti Scroll</h2>
      <p>
        Pertanyaan paling kuat sering kali bukan yang &ldquo;menjelaskan&rdquo;,
        tapi yang <strong>mengingatkan</strong>:
      </p>
      <blockquote>Kapan terakhir kali kamu tersihir oleh sebuah foto?</blockquote>
      <p>
        Kenapa ini efektif? Karena ia mengaktifkan memori &ldquo;rasa&rdquo;
        audiens. Begitu rasa muncul, mereka mau lanjut membaca.
      </p>

      <h2>Apa Itu Photography Storytelling?</h2>
      <p>
        Photography storytelling adalah cara memotret yang tujuannya bukan
        hanya &ldquo;menunjukkan menu&rdquo;, tetapi{" "}
        <strong>menghantarkan cerita</strong> — sehingga foto terasa hidup,
        punya konteks, dan membangun pengalaman brand. Tiga lapis yang
        dibangun:
      </p>
      <ul>
        <li>
          <strong>Lapisan 1 — Visual:</strong> Komposisi, cahaya, detail,
          warna, dan framing yang memikat.
        </li>
        <li>
          <strong>Lapisan 2 — Cerita:</strong> Momen, proses, manusia, dan
          alasan kenapa menu itu &ldquo;berarti&rdquo;.
        </li>
        <li>
          <strong>Lapisan 3 — Rasa:</strong> Emosi yang tersisa setelah
          melihat: hangat, nostalgia, penasaran, ingin datang.
        </li>
      </ul>

      <h2>Restorasa: Fine Dining sebagai Etalase Wisata Kota</h2>
      <p>
        Restorasa adalah restoran fine dining yang memposisikan diri sebagai{" "}
        <strong>etalase pertumbuhan wisata kota</strong>. Artinya: pengalaman
        makan bukan hanya soal kenyang, tetapi tentang &ldquo;melihat
        Garut&rdquo; melalui pengalaman yang dirancang.
      </p>
      <table>
        <thead>
          <tr>
            <th>Pilar Pengalaman</th>
            <th>Implikasi untuk Konten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gastronomi</td>
            <td>Cerita rasa, bahan, proses, asal-usul menu.</td>
          </tr>
          <tr>
            <td>Ruang &amp; ambience</td>
            <td>Suasana sebagai &ldquo;alasan datang&rdquo;: tenang, hangat, berkelas.</td>
          </tr>
          <tr>
            <td>Budaya &amp; konteks</td>
            <td>Konten yang memperluas makna: tradisi, pertemuan rasa, perjalanan.</td>
          </tr>
        </tbody>
      </table>

      <h2>3 Pilar yang Membuat Visual &ldquo;Memikat&rdquo;</h2>
      <ul>
        <li>
          <strong>Visual yang memikat:</strong> Foto tidak hanya
          &ldquo;jelas&rdquo;, tapi punya ritme: detail, jarak, fokus, dan
          momen.
        </li>
        <li>
          <strong>Cerita yang menghantarkan rasa:</strong> Foto menjadi pintu
          masuk; cerita membuat audiens bertahan, menyimak, dan percaya.
        </li>
        <li>
          <strong>Kata-kata yang punya nyawa:</strong> Caption berfungsi
          sebagai &ldquo;pengantar&rdquo; yang menyampaikan rasa dengan halus.
        </li>
      </ul>

      <h2>Cara Merancang Rangkaian Konten (Dari Rasa → Cerita → Aksi)</h2>
      <p>
        Kuncinya: konten bukan kumpulan foto, tapi <strong>rangkaian</strong>{" "}
        yang menuntun audiens.
      </p>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Yang Dilakukan</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1. Tentukan rasa utama</td>
            <td>Pilih emosi: hangat, nostalgia, elegan, ramah, atau &ldquo;rumah&rdquo;.</td>
            <td>1 kalimat kompas (brand truth) untuk visual &amp; copy.</td>
          </tr>
          <tr>
            <td>2. Tentukan momen hero</td>
            <td>Pilih momen paling &ldquo;bercerita&rdquo;: dapur, plating, kebersamaan, ambience.</td>
            <td>1 foto hero + 2–6 foto pendukung.</td>
          </tr>
          <tr>
            <td>3. Susun urutan</td>
            <td>Mulai dari hook → detail → konteks → puncak → penutup.</td>
            <td>Carousel yang terasa mengalir, bukan random.</td>
          </tr>
          <tr>
            <td>4. Tulis caption sebagai penghantar</td>
            <td>Gunakan kata untuk &ldquo;membawa rasa&rdquo; sampai ke pembaca.</td>
            <td>Caption yang bikin orang berhenti, save, dan ingin datang.</td>
          </tr>
          <tr>
            <td>5. Tutup dengan CTA halus</td>
            <td>Ajak DM, reservasi, atau tanya pendapat (tanpa hard-selling).</td>
            <td>Interaksi &amp; konversi yang natural.</td>
          </tr>
        </tbody>
      </table>

      <h2>Contoh yang Kuat: &ldquo;Jejak Itu Bertemu di Dapur Nusantara&rdquo;</h2>
      <p>
        Salah satu cara paling efektif membuat menu terasa &ldquo;hidup&rdquo;
        adalah memberi konteks: asal-usul, bahan, dan pertemuan tradisi. Ini
        bukan copy yang mengada-ada, tapi <strong>mengangkat makna</strong>.
        Saat visual + narasi menyatu, audiens tidak hanya &ldquo;lihat
        menu&rdquo;, tapi ikut merasakan kisahnya.
      </p>

      <h2>Kekuatan Kata: Caption yang Menghantarkan Rasa</h2>
      <p>
        Bila sebuah narasi muncul dari rasa, ia akan sampai dengan khidmat di
        para pembacanya. Di sinilah caption berubah fungsi — dari sekadar
        &ldquo;penjelasan&rdquo;, menjadi <strong>pengantar rasa</strong>. Dua
        bentuk caption yang sering berhasil:
      </p>
      <ul>
        <li>
          <strong>Caption &ldquo;momen&rdquo;:</strong> Menangkap suasana:
          kebersamaan, tawa, percakapan, dan ritme meja makan.
        </li>
        <li>
          <strong>Caption &ldquo;makna menu&rdquo;:</strong> Mengangkat
          asal-usul: bahan, tradisi, proses, dan alasan kenapa menu itu
          istimewa.
        </li>
      </ul>

      <h2>Human Touch: Rasa Terbaik Lahir dari Hati yang Tulus</h2>
      <p>
        Konten F&amp;B sering naik level ketika kita menampilkan manusia dan
        prosesnya — bukan untuk &ldquo;dramatisasi&rdquo;, tapi untuk
        menunjukkan bahwa rasa itu dibuat dengan perhatian. Detail kecil
        (tangan, tekstur, finishing) sering jadi pembeda konten yang
        &ldquo;berasa&rdquo;. Proses dapur = bukti. Bukti membangun trust lebih
        cepat daripada klaim.
      </p>
      <blockquote>
        Praktik cepat: untuk 1 sesi foto, targetkan minimal 1 frame
        &ldquo;menu&rdquo;, 1 frame &ldquo;proses&rdquo;, dan 1 frame
        &ldquo;momen manusia&rdquo;. Itu saja sudah cukup untuk membuat
        carousel terasa utuh.
      </blockquote>

      <h2>Prinsip yang Menutup Semua: Angka Penting, Tapi Rasa yang Menggerakkan</h2>
      <p>
        Brand bisa tumbuh dari kekuatannya mencipta rasa di benak penikmatnya.
        Ini bukan menolak data — ini menegaskan bahwa data bekerja lebih baik
        saat konten punya jiwa. Ukuran keberhasilan konten storytelling:
      </p>
      <ul>
        <li>Audiens berhenti (attention) dan membaca (hold).</li>
        <li>Konten disimpan/dibagikan (save/share) karena terasa &ldquo;bermakna&rdquo;.</li>
        <li>Orang bertanya/DM/reservasi karena ingin mengalami langsung.</li>
      </ul>

      <h2>FAQ</h2>
      <h3>Apa beda food photography biasa vs photography storytelling?</h3>
      <p>
        Food photography biasa fokus pada &ldquo;menu terlihat enak&rdquo;.
        Storytelling menambah konteks (proses, manusia, ambience, narasi),
        sehingga audiens merasa ikut mengalami, bukan hanya melihat.
      </p>
      <h3>Apakah caption harus panjang?</h3>
      <p>
        Tidak harus. Yang penting: ada rasa dan ritme. Bisa pendek tapi tajam,
        atau panjang tapi rapi (ada jeda, ada alur).
      </p>
      <h3>Berapa jumlah foto ideal untuk 1 carousel storytelling?</h3>
      <p>
        Praktisnya: 1 foto hero + 3–7 pendukung. Yang paling penting adalah
        urutan cerita, bukan jumlahnya.
      </p>
      <h3>Bagaimana cara mengukur keberhasilannya?</h3>
      <p>
        Lihat: hold (orang bertahan), save/share, komentar yang relevan, dan
        DM/reservasi yang &ldquo;nyambung&rdquo; dengan cerita.
      </p>
    </ArticleLayout>
  );
}
