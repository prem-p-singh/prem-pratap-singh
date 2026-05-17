import type { Metadata } from "next";
import { ShinyCard } from "@/components/ui/shiny-card";

export const metadata: Metadata = {
  title: "A Research Journey",
  description:
    "From a Botany gold medal at BHU to grapevine virology and multi-omics at UC Davis. Milestones, publications, and the people who opened their labs along the way.",
  alternates: { canonical: "https://www.prempsingh.com/journey" },
};

const pillars = [
  {
    heading: "Gold Medalist",
    detail: "M.Sc. Botany, Banaras Hindu University (2017). Prof. R. S. Ambasht Gold Medal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <circle cx="12" cy="9" r="6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l-2 7 5-3 5 3-2-7" />
      </svg>
    ),
  },
  {
    heading: "Doctorate",
    detail: "Ph.D. Plant Pathology, BHU (2023), under Dr. Bhanu Prakash.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10L12 5 2 10l10 5 10-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    ),
  },
  {
    heading: "Postdoctoral Scholar",
    detail: "Grapevine virology and multi-omics, UC Davis (2023 to present).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />
        <path strokeLinecap="round" d="M7.5 15h9" />
      </svg>
    ),
  },
  {
    heading: "AI Trainer Fellow",
    detail: "MOVE Fellow, Handshake AI (2025 to present). Scientific reasoning evaluation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
  },
];

const milestones = [
  { marker: "2016", stat: "First", label: "peer-reviewed paper" },
  { marker: "2017", stat: "Gold", label: "M.Sc. medal, BHU" },
  { marker: "2023", stat: "Ph.D.", label: "+ UC Davis postdoc" },
  { marker: "2025", stat: "Fellow", label: "Handshake AI" },
  { marker: "2026", stat: "36 + 21", label: "articles + chapters" },
];

export default function JourneyPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-foreground mb-4 tracking-wide uppercase">
            Curiosity · Method · Evidence · Impact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            A Research Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From a Botany gold medal at Banaras Hindu University to grapevine
            virology at UC Davis. A decade of building things that work at the
            bench and in code.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <ShinyCard key={p.heading} className="p-6 text-center" duration={5000}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-muted flex items-center justify-center text-foreground">
                  {p.icon}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {p.heading}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.detail}
                </p>
              </ShinyCard>
            ))}
          </div>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="py-16 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            Key Milestones
          </h2>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-border" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
              {milestones.map((m) => (
                <div key={m.marker} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full border border-border bg-background flex items-center justify-center mb-4 relative z-10">
                    <span className="text-xs font-bold text-foreground">{m.marker}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{m.stat}</p>
                  <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact strip */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { v: "36", l: "Journal articles" },
              { v: "21", l: "Book chapters" },
              { v: "1,900+", l: "Citations" },
              { v: "h 25 · i10 38", l: "Indices" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-xl font-bold text-foreground">{s.v}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gratitude */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShinyCard className="p-8 sm:p-10" duration={6000}>
            <blockquote className="text-center">
              <p className="text-lg text-foreground leading-relaxed mb-4">
                None of this happened alone. Every step forward was possible
                because mentors trusted me enough to open their labs and let me
                learn, work, fail, and improve. Not only my postgraduate
                teachers, Ph.D. guide, and postdoctoral mentors, but every
                person who let me into their lab environment and believed I
                could contribute.
              </p>
              <p className="text-base font-semibold text-foreground">
                I remain deeply grateful.
              </p>
            </blockquote>
          </ShinyCard>

          <p className="text-center text-sm text-muted-foreground mt-10 tracking-wide uppercase">
            Grateful for the past. Building what comes next.
          </p>
        </div>
      </section>
    </div>
  );
}
