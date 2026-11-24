import type { MetadataRoute } from "next";
import { projects, services, site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${site.url}${p}`;
  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/services/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: url(`/services/${s.slug}/`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: url("/work/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({ url: url(`/work/${p.slug}/`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: url("/company/"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/contact/"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/privacy-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
