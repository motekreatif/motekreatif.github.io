import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { LegalSections, type LegalSection } from "@/components/legal/LegalSections";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata = buildMeta({
  title: "Kebijakan Refund — Mote Kreatif",
  description:
    "Kebijakan pengembalian dana (refund) untuk produk digital Mote Kreatif, termasuk Clipper. Syarat, pengecualian, cara pengajuan, dan proses verifikasi.",
  path: "/refund-policy",
});

const IPAYMU_HELPDESK = "https://my.ipaymu.com/helpdesk";

const sections: LegalSection[] = [
  {
    num: "01",
    title: "Tentang Kebijakan Refund",
    body: `Kebijakan ini menjelaskan kondisi di mana pengembalian dana (refund) dapat dilakukan oleh ${SITE.legalName} / Mote Kreatif kepada pembeli produk digital yang dijual melalui ${SITE.url}, termasuk aplikasi Clipper.`,
  },
  {
    num: "02",
    title: "Kebijakan Umum",
    body: "Clipper adalah produk digital sekali bayar (bukan langganan). Kunci lisensi dikirim otomatis ke email pembeli segera setelah pembayaran terverifikasi. Karena produk dikirim secara instan dan tidak dapat dikembalikan seperti barang fisik, pembayaran bersifat non-refundable setelah kunci lisensi diterbitkan. Pembeli dianggap telah menyetujui ketentuan ini saat melakukan pembayaran.",
  },
  {
    num: "03",
    title: "Cara Melakukan Refund",
    body: (
      <>
        Transaksi yang sudah berhasil tidak dapat di-refund, kecuali untuk
        transaksi yang dilakukan menggunakan kartu kredit. Untuk informasi lebih
        lanjut mengenai proses refund kartu kredit, pembeli dapat menghubungi tim
        support iPaymu di{" "}
        <a href={IPAYMU_HELPDESK} target="_blank" rel="noopener noreferrer">
          {IPAYMU_HELPDESK}
        </a>
        .
      </>
    ),
  },
  {
    num: "04",
    title: "Refund ke Kartu Kredit",
    body: (
      <>
        Jika diperlukan pengembalian dana ke kartu kredit pembeli, silakan hubungi
        iPaymu support melalui{" "}
        <a href={IPAYMU_HELPDESK} target="_blank" rel="noopener noreferrer">
          {IPAYMU_HELPDESK}
        </a>
        . Proses refund kartu kredit mengikuti kebijakan dan prosedur yang
        ditetapkan oleh iPaymu.
      </>
    ),
  },
  {
    num: "05",
    title: "Pengecualian",
    body: "Refund dapat dipertimbangkan apabila terjadi salah satu kondisi berikut: (a) kunci lisensi tidak diterima pembeli dalam 1×24 jam sejak pembayaran terverifikasi dan tim kami gagal menerbitkan ulang kunci tersebut; atau (b) aplikasi tidak dapat dijalankan pada komputer pembeli yang telah memenuhi syarat sistem minimum, setelah pembeli menjalani pendampingan teknis dari tim kami melalui WhatsApp. Refund tidak berlaku untuk kendala di luar kendali kami, seperti keterbatasan kuota API pihak ketiga (Google Gemini / Groq) pada akun gratis pembeli.",
  },
  {
    num: "06",
    title: "Cara Pengajuan Refund",
    body: (
      <>
        Kirim email ke{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> dengan subjek
        &ldquo;Refund Request&rdquo; dalam 7 hari sejak tanggal pembayaran.
        Sertakan: nama lengkap, email terdaftar, tanggal transaksi, nomor
        transaksi, dan alasan pengajuan refund.
      </>
    ),
  },
  {
    num: "07",
    title: "Proses Verifikasi",
    body: "Setiap pengajuan refund akan diverifikasi oleh tim kami, termasuk pengecekan status kunci lisensi dan riwayat pendampingan teknis. Keputusan refund diberikan maksimal 14 hari kerja setelah pengajuan diterima. Apabila refund disetujui, kunci lisensi pembeli akan dinonaktifkan.",
  },
  {
    num: "08",
    title: "Lisensi & Perangkat",
    body: (
      <>
        Clipper tidak memiliki langganan bulanan, sehingga tidak ada yang perlu
        dibatalkan. Satu kunci lisensi terkunci pada satu perangkat
        (device-lock). Pembeli yang ingin pindah komputer dapat mengajukan
        pemindahan lisensi tanpa biaya melalui{" "}
        <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        . Kebutuhan pindah perangkat bukan merupakan alasan refund.
      </>
    ),
  },
  {
    num: "09",
    title: "Kontak",
    body: (
      <>
        Untuk pertanyaan terkait refund, hubungi kami di{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> atau WhatsApp{" "}
        <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
          {CONTACT.whatsapp}
        </a>
        . Alamat kantor kami tercantum pada halaman{" "}
        <Link href="/contact">Kontak</Link>.
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Kebijakan Refund"
        description="Kondisi pengembalian dana untuk produk digital Mote Kreatif — ditulis apa adanya, tanpa pasal tersembunyi."
      />
      <LegalSections sections={sections} updatedAt="16 Juli 2026" />
    </>
  );
}
