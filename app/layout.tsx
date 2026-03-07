import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingNavWrapper from "@/components/FloatingNavWrapper";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const siteUrl = "https://www.prempsingh.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    template: "%s | Prem Pratap Singh",
  },
  description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis. Research focus on grapevine-virus interactions, transcriptomics, and nano-encapsulated formulations.",
  keywords: ["Plant Science", "Grapevine Virology", "GRBV", "Postharvest Biology", "Food Safety", "Multi-omics", "Bioinformatics", "UC Davis", "Postdoctoral Scholar", "RNA-seq", "Plant Pathology"],
  authors: [{ name: "Prem Pratap Singh", url: siteUrl }],
  creator: "Prem Pratap Singh",
  publisher: "Prem Pratap Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Prem Pratap Singh",
    title: "Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prem Pratap Singh — Postdoctoral Scholar at UC Davis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Pratap Singh | Postdoctoral Scholar & Plant Scientist",
    description: "Postdoctoral Scholar at UC Davis specializing in plant-pathogen interactions and multi-omics analysis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prem Pratap Singh",
  givenName: "Prem Pratap",
  familyName: "Singh",
  jobTitle: "Postdoctoral Scholar",
  description:
    "Plant scientist specializing in plant-pathogen interactions, multi-omics analysis, and grapevine-virus interactions at UC Davis.",
  image: `${siteUrl}/images/profile.jpg`,
  url: siteUrl,
  email: "ppssingh@ucdavis.edu",
  worksFor: {
    "@type": "Organization",
    name: "University of California, Davis",
    url: "https://www.ucdavis.edu",
    department: {
      "@type": "Organization",
      name: "Department of Viticulture and Enology",
    },
  },
  affiliation: {
    "@type": "Organization",
    name: "University of California, Davis",
    url: "https://www.ucdavis.edu",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Banaras Hindu University",
      url: "https://www.bhu.ac.in",
    },
  ],
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
    "Metabolomics",
    "Nano-encapsulation",
    "Food Safety",
    "RNA-Seq",
    "Bioinformatics",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Davis",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prem Pratap Singh",
  description:
    "Academic portfolio and research blog of Prem Pratap Singh, Postdoctoral Scholar at UC Davis.",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Prem Pratap Singh",
    url: siteUrl,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Prem Pratap Singh",
    url: siteUrl,
  },
  dateCreated: "2024-01-01T00:00:00+00:00",
  dateModified: "2026-03-06T00:00:00+00:00",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
        <link rel="alternate" type="application/rss+xml" title="Prem Pratap Singh's Blog" href="/feed.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Subtle gradient background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--foreground)]/[0.02] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--foreground)]/[0.015] rounded-full blur-[120px]" />
        </div>
        <FloatingNavWrapper />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
