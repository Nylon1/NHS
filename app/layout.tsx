import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealMotion from "@/components/RevealMotion";

export const metadata: Metadata = {
  title: "Sitora | Healthcare Resource Intelligence",
  description: "Independent research and innovation platform for medicines and healthcare resource intelligence, measurable intervention and verified recovery.",
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
