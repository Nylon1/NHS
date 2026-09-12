import type { Metadata } from "next";
import "./globals.css";
import "./home-demo.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealMotion from "@/components/RevealMotion";

export const metadata: Metadata = {
  metadataBase: new URL("https://medicineintelligence.sitora.co.uk"),
  title: {
    default: "Sitora Medicines & Resource Intelligence",
    template: "%s | Sitora Medicines Intelligence",
  },
  description: "Independent medicines intelligence focused on cross-setting medication reconciliation, repeat oversupply prevention and evidence-backed NHS resource recovery.",
  applicationName: "Sitora Medicines Intelligence",
  authors: [{ name: "Sitora" }],
  creator: "Sitora",
  publisher: "Sitora",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Sitora Medicines Intelligence",
    title: "Sitora Medicines & Resource Intelligence",
    description: "See the medicines intelligence model working: close medication changes across care settings, prevent avoidable repeat supply and verify resource recovery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitora Medicines & Resource Intelligence",
    description: "Independent medicines intelligence for medication reconciliation, oversupply prevention and resource recovery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <Header />
        <RevealMotion />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
