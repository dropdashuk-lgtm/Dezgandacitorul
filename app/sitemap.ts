import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { areas } from "@/lib/data/areas";
import { guides } from "@/lib/data/guides";

const BASE_URL = "https://dezgandacitorul.ro";

const staticRoutes = [
  "",
  "/servicii",
  "/agricultura",
  "/firme",
  "/preturi",
  "/zone",
  "/programare",
  "/urgente",
  "/despre-noi",
  "/ghiduri",
  "/intrebari-frecvente",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...services.map((s) => ({ url: `${BASE_URL}/servicii/${s.slug}`, lastModified: now })),
    ...areas.map((a) => ({ url: `${BASE_URL}/zone/${a.slug}`, lastModified: now })),
    ...guides.map((g) => ({ url: `${BASE_URL}/ghiduri/${g.slug}`, lastModified: now })),
  ];
}
