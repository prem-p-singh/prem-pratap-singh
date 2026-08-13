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
      <section className="bg-gradient-to-b from-muted to-background pb-6 pt-14 sm:pb-8 sm:pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-kicker mb-4">
            Curiosity · Method · Evidence · Impact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            A Research Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From botany in Varanasi to grapevine virology in California.
          </p>
        </div>
      </section>

      <JourneyChapters />

      <section className="border-y border-border py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-kicker">
              Evidence along the way
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              The work kept accumulating
            </h2>
          </div>
          <JourneyImpact />
        </div>
      </section>

      {/* Gratitude */}
      <section className="py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShinyCard className="p-8 sm:p-10" duration={6000}>
            <blockquote className="text-center">
              <p className="text-lg text-foreground leading-relaxed mb-4">
                Every chapter was made possible by mentors, collaborators, and lab communities that opened their doors.
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
