import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { CASE_STUDIES } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/tdmo", priority: 0.9 },
    { path: "/products", priority: 0.8 },
    { path: "/case-studies", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    ...CASE_STUDIES.map((cs) => ({
      path: `/case-studies/${cs.slug}`,
      priority: 0.7,
    })),
    { path: "/blog", priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
    })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
