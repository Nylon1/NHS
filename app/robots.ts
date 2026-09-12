import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://medicineintelligence.sitora.co.uk/sitemap.xml",
    host: "https://medicineintelligence.sitora.co.uk",
  };
}
