import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { BLOG_POSTS, type BlogPost } from "./blog";
import type { FAQItem } from "./faq";

export type MarkdownPost = BlogPost & { faq?: FAQItem[]; html: string };

const DIR = path.join(process.cwd(), "content/blog");

function loadMarkdownPosts(): MarkdownPost[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(DIR, f), "utf8")
      );
      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        cover: data.cover,
        datePublished: data.datePublished,
        relatedCaseStudy: data.relatedCaseStudy,
        faq: data.faq,
        // ponytail: konten self-authored/trusted, tanpa sanitizer
        html: marked.parse(content, { async: false }) as string,
      };
    });
}

export const MARKDOWN_POSTS = loadMarkdownPosts();

// Gabungan untuk index / sitemap / internal-link. Urut tanggal terbaru dulu.
export const ALL_POSTS: BlogPost[] = [...MARKDOWN_POSTS, ...BLOG_POSTS].sort(
  (a, b) => b.datePublished.localeCompare(a.datePublished)
);

export function getMarkdownPost(slug: string) {
  return MARKDOWN_POSTS.find((p) => p.slug === slug);
}
