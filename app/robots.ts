import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/cont", "/api"],
    },
    sitemap: "https://dezgandacitorul.ro/sitemap.xml",
  };
}
