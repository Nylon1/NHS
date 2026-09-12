import type { MetadataRoute } from "next";

const base = "https://medicineintelligence.sitora.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/demo",
    "/demo/medicine-loop",
    "/demo/wasteguard",
    "/demo/medicines-resource-intelligence",
    "/medicines-proposal",
    "/commissioner-summary",
    "/evidence",
    "/pilot",
    "/pilot-protocol",
    "/data-specification",
    "/technical-implementation",
    "/business-case",
    "/methodology",
    "/research",
    "/findings",
    "/opportunities",
    "/loss-map",
    "/bottlenecks",
    "/benchmarking",
    "/dashboard",
    "/register",
    "/interventions",
    "/faq",
  ];

  return routes.map((route, index) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route.startsWith("/demo") ? 0.9 : 0.7,
  }));
}
