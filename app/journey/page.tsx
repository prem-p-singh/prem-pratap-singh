import type { Metadata } from "next";
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
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="pb-10 pt-10 sm:pt-12 lg:pb-14 lg:pt-14">
          <p className="section-kicker">Curiosity, Method, Evidence and Impact</p>
          <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            A Research Journey
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            From botany in Varanasi to grapevine virology in California.
          </p>
        </header>

        {/* Each section below opens with its own top rule, which also closes the header. */}
        <JourneyChapters />

        <section
          className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24"
          aria-labelledby="journey-impact-title"
        >
          <div className="lg:col-span-4">
            <h2 id="journey-impact-title" className="text-3xl leading-tight text-foreground sm:text-4xl">
              The work kept accumulating
            </h2>
          </div>
          <div className="lg:col-span-8">
            <JourneyImpact />
          </div>
        </section>

        {/* Gratitude */}
        <section className="grid gap-x-8 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
          <div className="paper-panel p-6 sm:p-8 lg:col-span-8 lg:col-start-5">
            <span className="absolute inset-x-0 top-0 h-1 bg-field" aria-hidden="true" />
            <p className="max-w-[60ch] font-serif text-base leading-relaxed text-foreground">
              Every chapter was made possible by mentors, collaborators, and lab communities that opened their doors.
            </p>
            <p className="mt-4 max-w-[60ch] font-serif text-base leading-relaxed text-foreground">
              I remain deeply grateful.
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              Grateful for the past. Building what comes next.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
