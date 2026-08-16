import { MetadataRoute } from "next";
import { gameProjects } from "@/lib/gameJourney";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://marwansummakieh.com";
  const now = new Date();
  const pieces = gameProjects
    .filter((p) => p.links?.some((l) => l.href.includes("github.com")))
    .map((p) => ({ url: `${baseUrl}/devlog/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/devlog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...pieces,
  ];
}
