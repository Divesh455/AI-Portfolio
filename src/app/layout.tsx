import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import GlobalParticles from "@/components/GlobalParticles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divesh Matkar | AI Engineer & Machine Learning Developer",
  description: "Portfolio of Divesh Matkar, a world-class AI Engineer specializing in Machine Learning, Generative AI, Large Language Models, FastAPI, and robust data intelligence solutions.",
  keywords: [
    "AI Engineer",
    "Machine Learning Developer",
    "FastAPI Developer",
    "Generative AI",
    "Deep Learning",
    "Large Language Models",
    "RAG",
    "Python Developer",
    "Divesh Matkar"
  ],
  authors: [{ name: "Divesh Matkar" }],
  creator: "Divesh Matkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diveshmatkar.com",
    title: "Divesh Matkar | AI Engineer",
    description: "Building intelligent AI applications using modern Machine Learning and backend technologies.",
    siteName: "Divesh Matkar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divesh Matkar | AI Engineer",
    description: "Building intelligent AI applications using modern Machine Learning and backend technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased bg-bg-dark text-[#F9FAFB]`}
      >
        <ScrollProgress />
        <CursorGlow />
        <GlobalParticles />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
