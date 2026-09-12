import type { Metadata } from "next";
import "./globals.css";
import "./home-demo.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealMotion from "@/components/RevealMotion";

export const metadata: Metadata = {
  title: "Sitora | Healthcare Resource Intelligence",
  description: "Independent medicines and healthcare resource intelligence: close medication changes, prevent avoidable supply and verify resource recovery.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <RevealMotion />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
