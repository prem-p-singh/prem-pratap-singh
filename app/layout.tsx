import type { Metadata } from "next";
import { IBM_Plex_Sans, STIX_Two_Text } from "next/font/google";
import "./globals.css";
import FloatingNavWrapper from "@/components/FloatingNavWrapper";
import Footer from "@/components/Footer";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";

const stix = STIX_Two_Text({
  variable: "--font-stix",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://www.prempsingh.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prem Pratap Singh, Ph.D. | Plant Scientist · Data Scientist",
    template: "%s | Prem Pratap Singh",
  },
  description: "Plant scientist and data scientist combining field biology, molecular diagnostics, multi-omics, and reproducible analysis to improve crop decisions.",
  keywords: ["Plant Science", "Data Science", "Grapevine Virology", "GRBV", "Postharvest Biology", "Food Safety", "Multi-omics", "Bioinformatics", "Machine Learning", "UC Davis", "Postdoctoral Scholar", "RNA-seq", "Plant Pathology"],
  authors: [{ name: "Prem Pratap Singh", url: siteUrl }],
  creator: "Prem Pratap Singh",
  publisher: "Prem Pratap Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Prem Pratap Singh",
    title: "Prem Pratap Singh, Ph.D. | Plant Scientist · Data Scientist",
    description: "Plant scientist and data scientist combining field biology, molecular diagnostics, multi-omics, and reproducible analysis to improve crop decisions.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Prem Pratap Singh — plant scientist and data scientist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Pratap Singh, Ph.D. | Plant Scientist · Data Scientist",
    description: "Plant scientist and data scientist combining field biology, molecular diagnostics, multi-omics, and reproducible analysis to improve crop decisions.",
    images: ["/opengraph-image"],
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
  jobTitle: "Plant Scientist and Data Scientist",
  description:
    "Plant scientist and data scientist at UC Davis combining field biology, molecular diagnostics, multi-omics, and reproducible analysis on commercial crop systems.",
  image: `${siteUrl}/images/headshot-1.jpg`,
  url: siteUrl,
  email: "ppssingh@ucdavis.edu",
  worksFor: {
    "@type": "Organization",
    name: "University of California, Davis",
    url: "https://www.ucdavis.edu",
    department: {
      "@type": "Organization",
      name: "Department of Plant Pathology",
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
    "Plant Pathology",
    "Molecular Diagnostics",
    "NGS Workflow",
    "RNA-Seq",
    "RT-qPCR",
    "Digital PCR",
    "Multi-omics",
    "Transcriptomics",
    "Metabolomics",
    "Assay Development",
    "Trait Discovery",
    "Bioinformatics",
    "Data Science",
    "Machine Learning",
    "Grapevine Virology",
    "Nano-encapsulation",
    "Food Safety",
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
    "Portfolio and research blog of Prem Pratap Singh, Ph.D., a plant scientist and data scientist working across crop biology, molecular diagnostics, and multi-omics.",
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
  dateModified: "2026-08-11T00:00:00+00:00",
};

const themeScript = `
(function(){
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch(e) {}
})()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning data-scroll-behavior="smooth">
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
        className={`${stix.variable} ${plex.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <FloatingNavWrapper />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
