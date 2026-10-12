"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

type Chapter = {
  id: string;
  period: string;
  title: string;
  place: string;
  prompt: string;
  story: string;
  thread: string;
  markers: string[];
};

const chapters: Chapter[] = [
  {
    id: "foundations",
    period: "2012–2017",
    title: "Learn the whole plant",
    place: "Banaras Hindu University · Varanasi, India",
    prompt: "Botany first. Specialization second.",
    story: "Botany expanded into plant pathology, microbial genetics, biotechnology, and ecology—and a gold medal.",
    thread: "Understand the whole system first.",
    markers: ["B.Sc. Botany", "M.Sc. Gold Medal", "First paper in 2016"],
  },
  {
    id: "doctorate",
    period: "2017–2023",
    title: "Build it, then explain it",
    place: "Banaras Hindu University · Varanasi, India",
    prompt: "From plant chemistry to food safety.",
    story: "A plant-based formulation was tested from antimicrobial assay to molecular simulation.",
    thread: "Bench and computation became one workflow.",
    markers: ["Ph.D. Plant Pathology", "6 first-author papers", "Mentored 5+ researchers"],
  },
  {
    id: "vineyard",
    period: "2023–Present",
    title: "Scale the question to vineyards",
    place: "University of California, Davis · Davis, California",
    prompt: "Follow disease from a berry to a block.",
    story: "Commercial vineyards became the laboratory for diagnostics, sequencing, and GRBV modeling.",
    thread: "Observe, measure, model, decide.",
    markers: ["300+ samples", "1.3B+ sequencing reads", "10+ vineyard blocks"],
  },
  {
    id: "reasoning",
    period: "2025–Present",
    title: "Make scientific judgment the subject",
    place: "Handshake AI · Remote",
    prompt: "What makes an explanation scientifically reliable?",
    story: "Biological reasoning is checked against published evidence to expose recurring AI failure patterns.",
    thread: "Separate evidence from confidence.",
    markers: ["MOVE Fellow", "Biology-domain evaluation", "Scientific reasoning"],
  },
];

// A real sequence of places and years, so the arrows stay.
const route = [
  { place: "Varanasi", year: "2012" },
  { place: "Davis", year: "2023" },
  { place: "Scientific AI", year: "2025" },
];

export default function JourneyChapters() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex] ?? chapters[0];

  // Same handling as the homepage workflow stepper: arrow keys, Home and End move
  // focus and selection together. Modified keys are left to the browser and system.
  const moveWithKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    const last = chapters.length - 1;
    const forward = current === last ? 0 : current + 1;
    const back = current <= 0 ? last : current - 1;
    const targets: Record<string, number> = {
      ArrowRight: forward,
      ArrowDown: forward,
      ArrowLeft: back,
      ArrowUp: back,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveId(chapters[next].id);
    tabs[next]?.focus();
  };

  return (
    <section
      className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24"
      aria-labelledby="journey-chapters-title"
    >
      <div className="lg:col-span-4">
        <p className="section-kicker">From Varanasi to Davis, now evaluating scientific AI</p>
        <h2 id="journey-chapters-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
          Four chapters, one research habit
        </h2>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
          Choose a chapter.
        </p>

        <ol className="mt-8 flex flex-wrap items-start gap-x-3 gap-y-2 text-sm">
          {route.map((stop, index) => (
            <li key={stop.place} className="flex items-start gap-3">
              {index > 0 && (
                <ArrowRight className="mt-1 size-4 text-muted-foreground" aria-hidden="true" />
              )}
              <span>
                <span className="block text-foreground">{stop.place}</span>
                <span className="block tabular-nums text-muted-foreground">{stop.year}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="lg:col-span-8">
        <div
          role="tablist"
          aria-label="Research journey chapters"
          onKeyDown={moveWithKeys}
          className="grid border-l border-border md:grid-cols-4 md:border-l-0 md:border-t"
        >
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              role="tab"
              id={`journey-chapter-tab-${chapter.id}`}
              aria-selected={chapter.id === active.id}
              tabIndex={chapter.id === active.id ? 0 : -1}
              aria-controls="journey-chapter-panel"
              onClick={() => setActiveId(chapter.id)}
              className="-ml-px flex flex-col items-start gap-1 border-l-2 border-transparent py-3 pl-4 text-left text-muted-foreground transition-colors hover:text-foreground aria-selected:border-accent aria-selected:text-foreground md:-mt-px md:ml-0 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-4 md:pt-4"
            >
              <span className="text-xs tabular-nums">
                {index + 1}
                <span className="ml-3">{chapter.period}</span>
              </span>
              <span className="text-sm font-semibold leading-snug">{chapter.title}</span>
              <span className="text-xs font-normal text-muted-foreground">{chapter.place}</span>
            </button>
          ))}
        </div>

        <div
          id="journey-chapter-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`journey-chapter-tab-${active.id}`}
          aria-live="polite"
          className="mt-10"
        >
          <p className="text-sm tabular-nums text-muted-foreground">
            Chapter {activeIndex + 1} · {active.period}
          </p>
          <h3 className="mt-2 text-2xl leading-tight text-foreground sm:text-3xl">{active.prompt}</h3>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-foreground">{active.story}</p>
          <p className="mt-2 max-w-[60ch] text-sm tabular-nums text-muted-foreground">
            {active.markers.join(", ")}
          </p>

          <dl className="mt-6 text-sm leading-normal">
            <div className="grid gap-x-4 gap-y-1 border-t border-border py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="text-muted-foreground">Place</dt>
              <dd className="text-foreground">{active.place}</dd>
            </div>
            <div className="grid gap-x-4 gap-y-1 border-t border-border py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="text-muted-foreground">The constant</dt>
              <dd className="text-foreground">{active.thread}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
