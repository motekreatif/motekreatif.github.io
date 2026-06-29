import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMeta } from "@/lib/metadata";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { ALL_POSTS } from "@/lib/blog-content";

export const metadata = buildMeta({
  title: "Blog — Insight & Studi Kasus Digital Marketing",
  description:
    "Insight digital marketing, studi kasus, dan framework yang bisa kamu tiru — dari pengalaman Mote Kreatif menumbuhkan brand hospitality, F&B, dan retail.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insight dan studi kasus yang bisa kamu tiru."
        highlight="kamu tiru"
        description="Bukan teori dari buku — tapi framework dan pembelajaran dari kerja nyata bersama brand lokal."
      />

      <section className="bg-[#F7F4EE] py-20 sm:py-24">
        <div className="container-mote grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_POSTS.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-soft overflow-hidden flex flex-col h-full group"
              >
                {post.cover && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF7E00]">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-extrabold text-[#06243B] leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#3D4F60] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF7E00] mt-auto pt-2">
                    Baca artikel
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
