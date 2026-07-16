import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { LegalSections, type LegalSection } from "@/components/legal/LegalSections";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata = buildMeta({
  title: "Syarat & Ketentuan — Mote Kreatif",
  description:
    "Syarat dan ketentuan penggunaan situs motekreatif.com serta pembelian produk digital Mote Kreatif, termasuk Clipper.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    num: "01",
    title: "Tentang Layanan",
    body: (
      <>
        {SITE.url} adalah situs resmi Mote Kreatif, digital marketing agency milik{" "}
        {SITE.legalName}, yang berkedudukan di Garut, Jawa Barat, Indonesia.
        Melalui situs ini kami menawarkan jasa digital marketing serta menjual
        produk digital, di antaranya{" "}
        <Link href="/products/clipper">Clipper</Link> — aplikasi desktop pembuat
        klip pendek berbasis AI yang berjalan secara lokal di komputer pembeli.
      </>
    ),
  },
  {
    num: "02",
    title: "Penggunaan Layanan",
    body: "Pengguna wajib menggunakan situs dan produk kami sesuai hukum yang berlaku di Indonesia. Dilarang menggunakan produk kami untuk memproses konten ilegal, konten yang melanggar hak cipta pihak lain, atau tujuan apa pun yang merugikan pihak lain. Pengguna bertanggung jawab penuh atas materi video yang diproses menggunakan produk kami.",
  },
  {
    num: "03",
    title: "Produk & Lisensi",
    body: "Clipper dijual dengan skema sekali bayar (bukan langganan). Pembeli menerima kunci lisensi yang terkunci pada satu perangkat (device-lock) dan berlaku selamanya untuk versi yang dibeli beserta pembaruannya. Lisensi diberikan untuk penggunaan pembeli sendiri; dilarang menjual ulang, menyewakan, membagikan, atau mendistribusikan kunci lisensi kepada pihak lain.",
  },
  {
    num: "04",
    title: "Harga & Pembayaran",
    body: (
      <>
        Clipper dikenakan biaya Rp 90.467, dibayar sekali di muka. Seluruh
        pembayaran produk digital diproses melalui payment gateway{" "}
        <a
          href="https://ipaymu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          iPaymu
        </a>
        . Kunci lisensi dikirim otomatis ke email pembeli setelah pembayaran
        terverifikasi. Kami tidak menyimpan data kartu atau kredensial pembayaran
        pembeli — seluruhnya ditangani oleh iPaymu. Harga jasa digital marketing
        tidak dipublikasikan dan ditentukan per proyek melalui diskusi.
      </>
    ),
  },
  {
    num: "05",
    title: "Pengembalian Dana",
    body: (
      <>
        Ketentuan pengembalian dana diatur terpisah pada halaman{" "}
        <Link href="/refund-policy">Kebijakan Refund</Link>.
      </>
    ),
  },
  {
    num: "06",
    title: "Privasi Data",
    body: (
      <>
        Data yang kami kumpulkan dari pembeli terbatas pada nama, email, dan nomor
        WhatsApp — dipakai untuk mengirim kunci lisensi dan memberi dukungan
        teknis. Data tidak dijual atau dibagikan kepada pihak ketiga tanpa izin,
        kecuali diwajibkan oleh hukum. Video, kunci API, dan hasil render Clipper
        diproses sepenuhnya di komputer pembeli dan tidak pernah dikirim ke server
        kami. Pembeli dapat meminta penghapusan datanya melalui{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </>
    ),
  },
  {
    num: "07",
    title: "Dukungan Teknis",
    body: (
      <>
        Dukungan instalasi dan pemakaian diberikan melalui WhatsApp pada jam kerja,
        tanpa biaya tambahan. Panduan mandiri tersedia di halaman{" "}
        <Link href="/products/clipper/setup">Setup Clipper</Link>.
      </>
    ),
  },
  {
    num: "08",
    title: "Disclaimer",
    body: "Clipper bergantung pada layanan AI pihak ketiga (Google Gemini dan Groq) yang kunci API-nya disediakan sendiri oleh pembeli. Kami tidak bertanggung jawab atas perubahan kebijakan, kuota, harga, atau penghentian layanan pihak ketiga tersebut. Kami juga tidak menjamin hasil komersial tertentu — seperti jumlah views, engagement, atau penjualan — dari konten yang dibuat menggunakan produk kami.",
  },
  {
    num: "09",
    title: "Perubahan Ketentuan",
    body: "Mote Kreatif berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan material akan diberitahukan melalui email terdaftar pembeli. Tanggal pembaruan terakhir selalu dicantumkan di halaman ini.",
  },
  {
    num: "10",
    title: "Hukum yang Berlaku & Kontak",
    body: (
      <>
        Layanan ini tunduk pada hukum yang berlaku di Republik Indonesia. Untuk
        pertanyaan terkait syarat dan ketentuan, hubungi kami di{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> atau WhatsApp{" "}
        <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
          {CONTACT.whatsapp}
        </a>
        . Alamat kantor lengkap tercantum pada halaman{" "}
        <Link href="/contact">Kontak</Link>.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Syarat & Ketentuan"
        description="Aturan main pemakaian situs dan produk digital Mote Kreatif — dibuat singkat supaya benar-benar kebaca."
      />
      <LegalSections sections={sections} updatedAt="16 Juli 2026" />
    </>
  );
}
