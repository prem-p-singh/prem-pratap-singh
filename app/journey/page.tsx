import type { Metadata } from "next";
import { ShinyCard } from "@/components/ui/shiny-card";
import JourneyChapters from "@/components/JourneyChapters";
import JourneyImpact from "@/components/JourneyImpact";

export const metadata: Metadata = {
  title: "A Research Journey",
  description:
    "From a Botany gold medal at BHU to grapevine virology and multi-omics at UC Davis. Milestones, publications, and the people who opened their labs along the way.",
  alternates: { canonical: "https://www.prempsingh.com/journey" },
};


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

      <JourneyChapters />

      <section className="py-16 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Evidence along the way
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              The work kept accumulating
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Publications and citations are not the journey itself, but they
              show how often the work has travelled beyond the lab where it
              began.
            </p>
          </div>
          <JourneyImpact />
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
