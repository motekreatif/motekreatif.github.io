import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { LegalSections, type LegalSection } from "@/components/legal/LegalSections";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata = buildMeta({
  title: "Kebijakan Privasi — Mote Kreatif",
  description:
    "Cara Mote Kreatif (PT Masyarakat Modal Tekun) mengumpulkan, memakai, menyimpan, dan menghapus data pribadi pengunjung situs, pembeli produk digital, dan pengguna layanan WhatsApp Business.",
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    num: "01",
    title: "Pengendali Data",
    body: (
      <>
        {SITE.url} dioperasikan {SITE.legalName} (PT Masyarakat Modal Tekun),
        berkedudukan di Jl. Ahmad Yani Timur No.74, Lebakjaya, Karangpawitan,
        Kabupaten Garut, Jawa Barat 44182. Kontak: email {CONTACT.email},
        telepon {CONTACT.phone}. Kebijakan ini tunduk pada UU No. 27 Tahun 2022
        tentang Pelindungan Data Pribadi.
      </>
    ),
  },
  {
    num: "02",
    title: "Data yang Kami Kumpulkan",
    body: "Ada tiga kelompok. Data yang kamu berikan sendiri: nama, email, nomor WhatsApp, saat menghubungi kami atau membeli produk digital. Data teknis otomatis: alamat IP, jenis perangkat, browser, halaman yang dibuka, sumber rujukan. Data komunikasi: isi percakapan WhatsApp dan email dengan tim kami.",
  },
  {
    num: "03",
    title: "Cara Kami Memakai Data",
    body: "Data dipakai untuk mengirim kunci lisensi produk, memberi dukungan teknis, menjawab pertanyaan calon klien, mengukur performa halaman, dan menampilkan iklan yang relevan. Data ini tidak dipakai untuk keputusan otomatis yang berdampak hukum.",
  },
  {
    num: "04",
    title: "Cookie dan Teknologi Pelacakan",
    body: "Situs memakai Meta Pixel dan Google Analytics 4. Keduanya menaruh cookie untuk mengukur kunjungan dan efektivitas iklan. Kamu bisa menolak lewat pengaturan cookie browser, mode penyamaran, atau pengaturan iklan di akun Meta dan Google masing-masing. Menolak cookie tidak menghalangi pemakaian situs.",
  },
  {
    num: "05",
    title: "Layanan Pihak Ketiga",
    body: "Cloudflare Pages menangani hosting dan CDN, mencatat log akses. Google Analytics 4 mengukur kunjungan. Meta Pixel mengukur performa iklan Facebook dan Instagram. iPaymu jadi payment gateway produk digital. Data kartu dan kredensial pembayaran ditangani penuh oleh iPaymu, tidak pernah menyentuh server kami. WhatsApp Business Platform (Meta) jadi saluran komunikasi. Tiap layanan punya kebijakan privasinya sendiri.",
  },
  {
    num: "06",
    title: "Data Produk Clipper",
    body: (
      <>
        Clipper berjalan lokal di komputer pembeli. Video, kunci API pihak
        ketiga, dan hasil render diproses sepenuhnya di perangkat pembeli,
        tidak pernah dikirim ke server Mote Kreatif. Yang kami simpan hanya
        nama, email, nomor WhatsApp, dan status lisensi. Detail produk ada di{" "}
        <Link href="/products/clipper">Clipper</Link>.
      </>
    ),
  },
  {
    num: "07",
    title: "Layanan WhatsApp Business dan Mote Blaster",
    body: "Untuk layanan broadcasting dan CRM WhatsApp, Mote Kreatif bertindak sebagai pemroses data (data processor) atas nama klien bisnis yang menjadi pengendali data (data controller). Kami hanya memproses nomor dan pesan penerima yang sudah memberikan persetujuan (opt-in) kepada klien tersebut. Klien bertanggung jawab atas keabsahan opt-in itu. Isi pesan disimpan hanya selama diperlukan untuk menjalankan layanan dan riwayat percakapan, lalu dihapus atas permintaan klien atau saat kerja sama berakhir. Data pesan tidak pernah dijual, disewakan, atau dipakai untuk melatih model AI pihak ketiga. Pemakaian WhatsApp Business Platform tunduk pada Kebijakan Privasi Meta dan WhatsApp Business Messaging Policy. Penerima pesan bisa berhenti berlangganan kapan saja lewat balasan berhenti, dan permintaan itu kami hormati.",
  },
  {
    num: "08",
    title: "Penyimpanan dan Keamanan",
    body: "Data disimpan di server dengan akses terbatas pada tim yang membutuhkan. Akses akun dilindungi autentikasi dua faktor. Data pembeli produk digital disimpan selama lisensi masih berlaku. Data prospek yang tidak berlanjut dihapus paling lama 24 bulan setelah kontak terakhir. Tidak ada sistem yang sepenuhnya kebal, jadi kami tidak bisa menjamin keamanan mutlak.",
  },
  {
    num: "09",
    title: "Pembagian Data",
    body: "Kami tidak menjual atau menyewakan data pribadi kepada siapa pun. Data hanya dibagikan kepada penyedia layanan di bagian 05, sebatas yang diperlukan, atau bila diwajibkan oleh hukum dan permintaan resmi aparat berwenang.",
  },
  {
    num: "10",
    title: "Hak Kamu",
    body: (
      <>
        Sesuai UU PDP, kamu punya hak mengakses, memperbaiki, menghapus,
        menarik persetujuan, membatasi pemrosesan, dan meminta salinan data.
        Caranya: kirim email ke{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> dengan subjek
        &ldquo;Permintaan Data Pribadi&rdquo;. Kami menjawab paling lambat 14
        hari kerja.
      </>
    ),
  },
  {
    num: "11",
    title: "Data Anak",
    body: "Layanan ini ditujukan untuk pelaku usaha dewasa. Kami tidak dengan sengaja mengumpulkan data anak di bawah 18 tahun. Kalau ini terlanjur terjadi, data akan dihapus setelah kami diberi tahu.",
  },
  {
    num: "12",
    title: "Perubahan dan Kontak",
    body: (
      <>
        Kebijakan ini bisa berubah. Tanggal pembaruan terakhir selalu
        tercantum di halaman ini, dan perubahan material akan diberitahukan
        lewat email terdaftar. Hubungi kami di{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> atau WhatsApp{" "}
        <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
          {CONTACT.whatsapp}
        </a>
        . Alamat kantor lengkap tercantum pada halaman{" "}
        <Link href="/contact">Kontak</Link>. Ketentuan lain ada di{" "}
        <Link href="/terms">Syarat & Ketentuan</Link>.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Kebijakan Privasi"
        description="Cara kami mengumpulkan, memakai, menyimpan, dan menghapus data pribadi kamu. Dibuat singkat supaya benar-benar kebaca."
      />
      <LegalSections sections={sections} updatedAt="29 Agustus 2026" />
    </>
  );
}
