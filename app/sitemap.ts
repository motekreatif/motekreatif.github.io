import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { CASE_STUDIES } from "@/lib/data";
import { ALL_POSTS } from "@/lib/blog-content";

// Wajib untuk output: export — sitemap di-generate sekali saat build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/tdmo", priority: 0.9 },
    { path: "/products", priority: 0.8 },
    { path: "/products/clipper", priority: 0.9 },
    { path: "/case-studies", priority: 0.8 },
    { path: "/community", priority: 0.8 },
    { path: "/community/kreatif", priority: 0.7 },
    { path: "/community/bisnis", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    ...CASE_STUDIES.map((cs) => ({
      path: `/case-studies/${cs.slug}`,
      priority: 0.7,
    })),
    { path: "/blog", priority: 0.8 },
    ...ALL_POSTS.map((post) => ({
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
