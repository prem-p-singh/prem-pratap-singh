import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    template: "%s | Dr. Prem Pratap Singh",
  },
  description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions, multi-omics analysis, and postharvest biology. Research focus on grapevine virology and nano-encapsulated formulations.",
  keywords: ["Plant Science", "Grapevine Virology", "GRBV", "Postharvest Biology", "Food Safety", "Multi-omics", "Bioinformatics", "UC Davis", "Postdoctoral Scholar"],
  authors: [{ name: "Dr. Prem Pratap Singh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premsingh.io",
    siteName: "Dr. Prem Pratap Singh",
    title: "Dr. Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
