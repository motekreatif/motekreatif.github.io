import { notFound } from "next/navigation";
import { buildMeta } from "@/lib/metadata";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildFaqJsonLd } from "@/lib/faq";
import { MARKDOWN_POSTS, getMarkdownPost } from "@/lib/blog-content";

// Hanya slug markdown — folder TSX existing = static segment, otomatis menang.
export function generateStaticParams() {
  return MARKDOWN_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getMarkdownPost(slug);
  if (!post) return {};
  return buildMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.cover,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getMarkdownPost(slug);
  if (!post) notFound();

  return (
    <>
      {post.faq?.length ? <JsonLd data={buildFaqJsonLd(post.faq)} /> : null}
      <ArticleLayout post={post}>
        {/* ponytail: markdown trusted -> html, di-styling .article-prose */}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </ArticleLayout>
    </>
  );
}
