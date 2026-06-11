import Link from "next/link";
import { ArrowLeft, Sparkles, MousePointerClick, BadgeCheck } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { BookGallery } from "@/components/blog/BookGallery";
import { BOOKS } from "@/lib/books";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/constants";

const post = BLOG_POSTS.find(
  (p) => p.slug === "100-buku-self-development-bisnis"
)!;

export const metadata = buildMeta({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
});

const FAQ = [
  {
    question: "Buku-buku ini dijual di mana?",
    answer:
      "Semua buku tersedia di Shopee. Tinggal klik buku yang kamu mau, kamu akan langsung diarahkan ke halaman produknya di Shopee untuk checkout — tempat kamu sudah biasa belanja, lengkap dengan gratis ongkir dan rating toko.",
  },
  {
    question: "Apakah ini buku bahasa Indonesia?",
    answer:
      "Mayoritas tersedia dalam edisi terjemahan Bahasa Indonesia (Gramedia, BIP, Noura, dan penerbit lokal lain), plus sejumlah karya penulis Indonesia seperti Filosofi Teras dan Mimpi Sejuta Dolar. Sebagian judul juga punya edisi bahasa Inggris kalau kamu lebih suka versi aslinya.",
  },
  {
    question: "Bagaimana cara memilih buku pertama kalau masih bingung?",
    answer:
      "Mulai dari baris 'Paling Dicari' di atas — itu enam buku yang paling sering jadi titik awal. Atau pakai filter kategori sesuai kebutuhanmu sekarang: mau benahi keuangan, bangun kebiasaan, atau menata mindset. Pilih satu, jangan tunggu sampai 'siap'.",
  },
  {
    question: "Apakah daftar ini berbayar atau ada biaya tersembunyi?",
    answer:
      "Daftar ini gratis. Harga buku mengikuti harga di toko Shopee masing-masing, tanpa biaya tambahan dari kami. Beberapa tautan adalah link afiliasi — kalau kamu membeli lewat tautan ini, kami mungkin mendapat komisi kecil dari Shopee tanpa menambah harga yang kamu bayar.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "100 Buku Self Development & Bisnis Pilihan Mote Kreatif",
  description: post.description,
  numberOfItems: BOOKS.length,
  itemListElement: BOOKS.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${b.title} — ${b.author}`,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: post.title,
      item: `${SITE.url}/blog/${post.slug}`,
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={buildFaqJsonLd(FAQ)} />

      <PageHero
        eyebrow="Literasi · Akselerasi"
        title="100 buku yang mengubah cara kami berpikir soal uang, bisnis, dan diri sendiri."
        highlight="uang, bisnis, dan diri sendiri"
        description="Bukan asal banyak. Ini kurasi tim Mote Kreatif — bacaan wajib untuk menata mindset, finansial, dan produktivitas. Tinggal pilih satu, klik, dan mulai hari ini."
      />

      {/* Intro / value strip */}
      <section className="bg-[#06243B] py-10 text-white">
        <div className="container-mote">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#BDF24A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Semua Artikel
          </Link>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <ValueItem
              icon={<Sparkles className="h-5 w-5" />}
              title="Dikurasi, bukan ditumpuk"
              body="Dipilih dari ratusan judul oleh tim yang setiap hari kerja dengan brand nyata — bukan sekadar daftar terlaris."
            />
            <ValueItem
              icon={<MousePointerClick className="h-5 w-5" />}
              title="Sekali klik, langsung checkout"
              body="Setiap buku terhubung ke Shopee — tempat kamu sudah biasa belanja. Tanpa ribet, tanpa pindah-pindah."
            />
            <ValueItem
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Mayoritas Bahasa Indonesia"
              body="Edisi terjemahan resmi plus karya penulis lokal. Mulai baca tanpa hambatan bahasa."
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#F7F4EE] py-14 sm:py-20">
        <div className="container-mote">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-extrabold leading-tight text-[#06243B] sm:text-3xl">
              Sering bingung mau mulai baca apa?
            </h2>
            <p className="mt-3 leading-relaxed text-[#3D4F60]">
              Kunci dari <em>level up</em> adalah asupan informasi berkualitas.
              Kami sudah menyaringnya untukmu jadi 100 judul terbaik. Pakai
              filter kategori di bawah untuk langsung ke yang kamu butuhkan
              sekarang — jangan cuma diliat, pilih satu dan mulai baca hari ini ↓
            </p>
          </div>

          <BookGallery />

          {/* Affiliate disclosure */}
          <p className="mt-14 border-t border-[#06243B]/10 pt-6 text-xs leading-relaxed text-[#3D4F60]/80">
            <strong>Keterbukaan afiliasi:</strong> Sebagian tautan di halaman ini
            adalah link afiliasi Shopee. Jika kamu membeli buku melalui tautan
            tersebut, Mote Kreatif mungkin menerima komisi kecil dari Shopee —
            tanpa biaya tambahan untukmu. Komisi ini membantu kami terus
            mengurasi konten gratis seperti ini. Terima kasih sudah mendukung.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-mote max-w-3xl">
          <h2 className="mb-8 text-2xl font-extrabold text-[#06243B] sm:text-3xl">
            Pertanyaan yang Sering Muncul
          </h2>
          <div className="flex flex-col divide-y divide-[#06243B]/10">
            {FAQ.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#06243B]">
                  {f.question}
                  <span className="text-[#FF7E00] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#3D4F60]">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ValueItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BDF24A] text-[#06243B]">
        {icon}
      </div>
      <h3 className="font-extrabold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-[#EFEBDD]/80">{body}</p>
    </div>
  );
}
