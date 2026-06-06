import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTASection } from "@/components/home/CTASection";
import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog";

type ArticleLayoutProps = {
  post: BlogPost;
  children: React.ReactNode;
};

/**
 * Layout artikel blog dengan Article + BreadcrumbList JSON-LD.
 * Konten artikel di-render server-side penuh agar terbaca AI crawlers.
 */
export function ArticleLayout({ post, children }: ArticleLayoutProps) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.datePublished,
    image: post.cover ? `${SITE.url}${post.cover}` : undefined,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "id-ID",
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

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="bg-[#06243B] text-white py-16 sm:py-20">
        <div className="container-mote max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#BDF24A] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Semua Artikel
          </Link>
          <span className="eyebrow eyebrow-on-dark block w-fit mt-5">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mt-4 text-balance">
            {post.title}
          </h1>
          <p className="text-[#EFEBDD] leading-relaxed mt-4">{post.description}</p>
        </div>
      </section>

      {post.cover && (
        <div className="container-mote max-w-3xl -mt-0 pt-8 bg-transparent">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>
      )}

      <article className="bg-[#F7F4EE] py-12 sm:py-16">
        <div className="container-mote max-w-3xl article-prose">{children}</div>
        {post.relatedCaseStudy && (
          <div className="container-mote max-w-3xl mt-10">
            <Link
              href={`/case-studies/${post.relatedCaseStudy}`}
              className="card-soft p-6 flex items-center justify-between gap-4 group"
            >
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#FF7E00]">
                  Studi Kasus Terkait
                </div>
                <div className="font-extrabold text-[#06243B] mt-1">
                  Lihat hasil lengkap dengan angka
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#FF7E00] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </article>

      <CTASection />
    </>
  );
}
