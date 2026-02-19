import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
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

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    template: "%s | Prem Pratap Singh",
  },
  description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis. Research focus on grapevine-virus interactions, transcriptomics, and nano-encapsulated formulations.",
  keywords: ["Plant Science", "Grapevine Virology", "GRBV", "Postharvest Biology", "Food Safety", "Multi-omics", "Bioinformatics", "UC Davis", "Postdoctoral Scholar", "RNA-seq", "Plant Pathology"],
  authors: [{ name: "Prem Pratap Singh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.prempsingh.com",
    siteName: "Prem Pratap Singh",
    title: "Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prem Pratap Singh",
  jobTitle: "Postdoctoral Scholar",
  affiliation: {
    "@type": "Organization",
    name: "University of California, Davis",
  },
  url: "https://www.prempsingh.com",
  email: "ppssingh@ucdavis.edu",
  sameAs: [
    "https://scholar.google.com/citations?user=UGFMZEYAAAAJ&hl=en",
    "https://orcid.org/0000-0001-7921-9379",
    "https://www.linkedin.com/in/prem-p-singh",
    "https://www.researchgate.net/profile/Prem-Singh-12",
    "https://github.com/prem-p-singh",
  ],
  knowsAbout: [
    "Grapevine Virology",
    "Plant Pathology",
    "Multi-omics",
    "Transcriptomics",
    "Nano-encapsulation",
    "Food Safety",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Banaras Hindu University",
  },
};

const themeScript = `
(function(){
  try {
    if(localStorage.getItem('theme')==='light')
      document.documentElement.classList.add('light')
  } catch(e){}
})()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased min-h-screen flex flex-col`}
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
